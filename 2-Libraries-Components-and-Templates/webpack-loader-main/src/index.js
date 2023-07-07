import {getOptions, stringifyRequest} from 'loader-utils'
import {compile} from '@riotjs/compiler'

/**
 * Generate the hmr code depending on the tag generated by the compiler
 * @param   {string} path - stringified, quote-enclosed path to the component file
 * @returns {string} the code needed to handle the riot hot reload
 */
function hotReload(path) {
  return `;(() => {
  if (module.hot) {
    const hotReload = require('@riotjs/hot-reload').default
    module.hot.accept()
    if (module.hot.data) {
      const component = require(${path}).default;
      hotReload(component)
    }
  }
})()`
}

export default function(source, map, meta) {
  // parse the user query
  const query = getOptions(this) || {}

  // normalise the query object in case of question marks
  const opts = Object.keys(query).reduce(function(acc, key) {
    acc[key.replace('?', '')] = query[key]
    return acc
  }, {})

  try {
    // compile and generate sourcemaps
    const {code, map} = compile(
      source,
      {
        ...opts,
        file: this.resourcePath
      }
    )
    // generate the output code
    // convert webpack's absolute path to a script-friendly string for hotReload
    const escapedPath = stringifyRequest(this, this.resourcePath)
    const output = `${code}${opts.hot ? hotReload(escapedPath) : ''}`

    // cache this module
    if (this.cacheable) this.cacheable()

    // return code and sourcemap
    this.callback(null, output, map, meta)
  } catch(error) {
    this.callback(error, '', map, meta)
  }
}
