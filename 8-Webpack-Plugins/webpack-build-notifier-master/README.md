# webpack-build-notifier

A [Webpack](https://webpack.github.io/) plugin that uses the [node-notifier](https://github.com/mikaelbr/node-notifier) package to display OS-level notifications for Webpack build events.

**webpack-build-notifier** can generate notifications for compilation warnings and errors, as well as notify you when the compilation process is triggered and completes successfully. Take a look at the [Config Options](#config-options) to learn more about what **webpack-build-notifier** can do.

[![NPM version](https://img.shields.io/npm/v/webpack-build-notifier.svg)](https://www.npmjs.org/package/webpack-build-notifier)
[![Build Status](https://travis-ci.com/RoccoC/webpack-build-notifier.svg?branch=master)](https://travis-ci.com/RoccoC/webpack-build-notifier)
[![Coverage Status](https://coveralls.io/repos/github/RoccoC/webpack-build-notifier/badge.svg?branch=master)](https://coveralls.io/github/RoccoC/webpack-build-notifier?branch=master)

<img width="334" alt="webpack-build-notifier-error" src="https://user-images.githubusercontent.com/1934237/28636873-799c8c54-71f4-11e7-8d0c-be15ca823f6e.png"><img width="334" alt="webpack-build-notifier-success" src="https://user-images.githubusercontent.com/1934237/28636881-7f394dd2-71f4-11e7-9148-4dba316a41a8.png">

Are you tired of having to constantly switch between your IDE and terminal window to see whether your latest edits resulted in a failed build? Why didn't your latest changes get [hot-loaded](https://github.com/gaearon/react-hot-loader)? Was there a syntax error or failed unit test? With this plugin, you will always be apprised of build problems without having to keep an eye on your terminal window.

To use, install the webpack-build-notifier package `npm install webpack-build-notifier --save-dev` and add the plugin to your [Webpack configuration file](https://webpack.github.io/docs/configuration.html):

```javascript
// webpack.config.js
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
  // ... snip ...
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "My Webpack Project",
      logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true, // don't spam success notifications
    })
  ],
  // ... snip ...
}
```

Config Options
--------------

#### title
The notification title. Defaults to **_Webpack Build_**.

#### logo
The absolute path to the project logo to be displayed as a content image in the notification. Optional.

#### sound
The sound to play for notifications. Set to false to play no sound. Valid sounds are listedin the node-notifier project, [here](https://github.com/mikaelbr/node-notifier). Defaults to **_Submarine_**.

#### successSound
The sound to play for success notifications. Defaults to the value of the *sound* configuration option. Set to false to play no sound for success notifications. Takes precedence over the *sound* configuration option.

#### warningSound
The sound to play for warning notifications. Defaults to the value of the *sound* configuration option. Set to false to play no sound for warning notifications. Takes precedence over the *sound* configuration option.

#### failureSound
The sound to play for failure notifications. Defaults to the value of the *sound* configuration option. Set to false to play no sound for failure notifications. Takes precedence over the *sound* configuration option.

#### compilationSound
The sound to play for compilation notifications. Defaults to the value of the *sound* configuration option. Set to false to play no sound for compilation notifications. Takes precedence over the *sound* configuration option.

#### onCompileStart
A function which is invoked when compilation starts. Optional. The function is passed one parameter:
* {webpack.compilation.Compilation} compilation - The webpack Compilation instance.
Note that `suppressCompileStart` must be `false`.

#### onComplete
A function which is invoked when compilation completes. Optional. The function is passed two parameters:
* {webpack.compilation.Compilation} compilation - The webpack Compilation instance.
* {CompilationStatus} status - one of 'success', 'warning', or 'error'

#### suppressSuccess
Defines when success notifications are shown. Can be one of the following values:
*  false     - Show success notification for each successful compilation (default).
*  true      - Only show success notification for initial successful compilation and after failed compilations.
*  "always"  - Never show the success notifications.
*  "initial" - Same as true, but suppresses the initial success notification.

#### showDuration
True to show the duration of a successful compilation, otherwise false (default).

#### suppressWarning
True to suppress the warning notifications, otherwise false (default).

#### suppressCompileStart
True to suppress the compilation started notifications (default), otherwise false.

#### activateTerminalOnError
True to activate (focus) the terminal window when a compilation error occurs. Note that this only works on Mac OSX (for now). Defaults to **_false_**. Regardless of the value of this config option, the terminal window can always be brought to the front by clicking on the notification.

#### successIcon
The absolute path to the icon to be displayed for success notifications. Defaults to the included **_./src/icons/success.png_**.

![Success](https://github.com/RoccoC/webpack-build-notifier/blob/master/src/icons/success.png?raw=true "Success")

#### warningIcon
The absolute path to the icon to be displayed for warning notifications. Defaults to the included **_./src/icons/warning.png_**.

![Warning](https://github.com/RoccoC/webpack-build-notifier/blob/master/src/icons/warning.png?raw=true "Warning")

#### failureIcon
The absolute path to the icon to be displayed for failure notifications. Defaults to the included **_./src/icons/failure.png_**.

![Failure](https://github.com/RoccoC/webpack-build-notifier/blob/master/src/icons/failure.png?raw=true "Failure")

#### compileIcon
The absolute path to the icon to be displayed for compilation started notifications. Defaults to the included **_./src/icons/compile.png_**.

![Compile](https://github.com/RoccoC/webpack-build-notifier/blob/master/src/icons/compile.png?raw=true "Compile")

#### formatSuccess
A function which returns a formatted notification message on successful compilation.
This function must return a String.
The default formatter will display "Build successful!".
Note that the message will always be limited to 256 characters.

#### messageFormatter
A function which returns a formatted notification message on error or warning.
The function is passed 4 parameters:
* {Object} error/warning - The raw error or warning object.
* {String} filepath - The path to the file containing the error/warning (if available).
* {CompilationStatus} status - Error or warning
* {number} count - How many errors or warnings were raised

This function must return a String.
The default messageFormatter will display the filename which contains the error/warning followed by the
error/warning message.
Note that the message will always be limited to 256 characters.

#### notifyOptions
Any additional node-notifier options as documented in the [node-notifier documentation](https://github.com/mikaelbr/node-notifier).
Note that options provided here will only be applied to the success/warning/error notifications (not the "compilation started" notification). The title, message, sound, contentImage (logo), and icon options will be ignored, as they will be set via the corresponding WebpackBuildNotifier config options (either user-specified or default).

#### onClick
A function called when the notification is clicked. By default it activates the Terminal application.

#### onTimeout
A function called when the notification times out and is closed. Undefined by default.

TypeScript
----------
This project is written in TypeScript, and type declarations are included. You can take advantage of this if your project's webpack configuration is also using TypeScript (e.g. `webpack.config.ts`).

```javascript
// webpack.config.ts
import * as webpack from 'webpack'
import * as WebpackBuildNotifierPlugin from 'webpack-build-notifier';

const config: webpack.Configuration = {
  // ... snip ...
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "My Webpack Project",
      logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true, // don't spam success notifications
    })
  ],
  // ... snip ...
};

export default config;
```

Notes
-----
After publishing this package I discovered a couple other similar plugins that are worth looking into:
* [webpack-notifier](https://github.com/Turbo87/webpack-notifier)
* [webpack-error-notification](https://github.com/vsolovyov/webpack-error-notification)

Given the purpose and similarities, this project probably could have been a fork of one of these.

Changelog
---------

View the changelog [here](CHANGELOG.md).
