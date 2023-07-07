'use strict';

const {join, normalize, dirname, basename, isAbsolute} = require('path');
const {readFile} = require('fs');
const {promisify} = require('es6-promisify');
const listDir = require('recursive-readdir');
const compose = require('compose-function');
const Joi = require('joi');
const {assign} = Object;

exports.sanitisePath = v =>
  v.replace(/\\/g, '/');

exports.rebaseTo = (fn) => (listOrStringOrJoinFn) => (context) => {
  const transform = compose(exports.sanitisePath, normalize);
  return (
    Array.isArray(listOrStringOrJoinFn) && listOrStringOrJoinFn.map((v) => transform(fn(context), v)) ||
    typeof listOrStringOrJoinFn === 'string' && join(fn(context), listOrStringOrJoinFn) ||
    typeof listOrStringOrJoinFn === 'function' && compose(transform, listOrStringOrJoinFn, fn)(context) ||
    (() => {
      throw new Error('expected string|Array<string>|function');
    })
  );
};

exports.rebaseToCwd = exports.rebaseTo(({root, cwd}) => isAbsolute(cwd) ? cwd : join(root, cwd));

exports.rebaseToRoot = exports.rebaseTo(({root}) => root);

exports.rebaseToCache = exports.rebaseTo(({meta: {cacheDir}}) => cacheDir);

/**
 * A factory for a higher-order-function that enhances an assert() function with a list of files
 * of the given extension.
 *
 * @param {string} [ext] Optional extention of the file to locate
 * @param {string} [subdir] A subdirectory of the root
 * @return {function(function)} A higher-order-function of the assert function
 */
exports.withFiles = ({ext, subdir}) => (next) => {
  Joi.assert(ext, Joi.string().optional(), 'optional extension to filter files');
  Joi.assert(subdir, Joi.alternatives().try(
    Joi.string().required(),
    Joi.func().required()
  ).optional(), 'optional subdirectory or subdirectory function');
  Joi.assert(next, Joi.func().arity(3).required(), 'assert function of test,exec,files');

  return (test, exec) => {
    Joi.assert(test, Joi.object().required(), 'Tape test object');
    Joi.assert(exec, Joi.object().required(), 'Result of an exec() call');

    const {root} = exec;
    const directory = subdir ?
      compose(normalize, join)(root, (typeof subdir === 'function') ? subdir(exec) : subdir) :
      root;

    return listDir(directory)
      .then((list) => ext ? list.filter((v) => v.endsWith(`.${ext}`)) : list)
      .then((list) => next(test, exec, list));
  };
};

/**
 * A higher-order-function that enhances an assert() function with the content of the files given.
 *
 * @type {function(function)} A higher-order-function of the assert function
 */
exports.withFileContent = (next) => {
  Joi.assert(next, Joi.func().arity(3).required(), 'assert function of test,exec,files');

  return (test, exec, list) => {
    Joi.assert(test, Joi.object().required(), 'Tape test object');
    Joi.assert(exec, Joi.object().required(), 'Result of an exec() call');
    Joi.assert(list, Joi.array().items(Joi.string()).required(), 'List of files');

    return Promise.all(
      list.map((path) => promisify(readFile)(path, 'utf8')
        .then((content) => ({
          path,
          base: dirname(path),
          name: basename(path),
          content
        }))
      )
    )
      .then(list => next(test, exec, list));
  };
};

/**
 * A higher-order-function that enhances an assert() function by splitting out withSourceMappingURL
 * comment from the file content.
 *
 * Operates on a list of vinyl-like files `{path, base, name, content}` where at least `content`
 * should be present. A `withSourceMappingURL` field is added where comment is present.
 *
 * Both the `content` and the `withSourceMappingURL` are trimmed.
 *
 * @param {function} next An assert function
 * @return {function} A new assert function
 */
exports.withSourceMappingURL = (next) => {
  Joi.assert(next, Joi.func().arity(3).required(), 'assert function of test,exec,files');

  return (test, exec, list) => {
    Joi.assert(test, Joi.object().required(), 'Tape test object');
    Joi.assert(exec, Joi.object().required(), 'Result of an exec() call');
    Joi.assert(list, Joi.array().items(
      Joi.object({content: Joi.string().required()}).unknown(true)
    ).required(), 'Any number of elements with "content" property');

    return Promise.resolve(next(
      test,
      exec,
      list.map((file) => {
        const {content: raw} = file;
        const [content, sourceMappingURL] = raw
          .split(/^\/\*#\s*sourceMappingURL=([^*]+)\*\/$/m)
          .map((v) => v.trim());

        return assign({}, file, {content, sourceMappingURL});
      })
    ));
  };
};

/**
 * A higher-order-function that enhances an assert() function by splitting out url() asserts from
 * css contents.
 *
 * Operates on a list of vinyl-like files `{path, base, name, content}` where at least `content`
 * should be present. An `asserts` field is added to each element in the list. This Array may be
 * empty where no url() statements are present.
 *
 * Both the `content` and the `sourceMappingUrl` are trimmed.
 *
 * @param {function} next An assert function
 * @return {function} A new assert function
 */
exports.withSplitCssAssets = (next) => {
  Joi.assert(next, Joi.func().arity(3).required(), 'assert function of test,exec,files');

  return (test, exec, list) => {
    Joi.assert(test, Joi.object().required(), 'Tape test object');
    Joi.assert(exec, Joi.object().required(), 'Result of an exec() call');
    Joi.assert(list, Joi.array().items(
      Joi.object({content: Joi.string().required()}).unknown(true)
    ).required(), 'Any number of elements with "content" property');

    return Promise.resolve(next(
      test,
      exec,
      list.map((file) => {
        const {content: raw} = file;
        const [content, assets] = raw
          .split(/url\(((["'])(?:(?!\2).)+\2|[^)]+)\)/)
          .filter((_, i) => (i % 3 < 2))
          .reduce(
            ([c, a], v, i) => (i % 2 === 0) ? [`${c}${v}`, a] : [`${c}url($${a.length})`, [...a, v]],
            ['', []]
          );

        return assign({}, file, {content, assets});
      })
    ));
  };
};
