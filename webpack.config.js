/*
 * The webpack config exports an object that has a valid webpack configuration
 * For each environment name. By default, there are two Ionic environments:
 * "dev" and "prod". As such, the webpack.config.js exports a dictionary object
 * with "keys" for "dev" and "prod", where the value is a valid webpack configuration
 * For details on configuring webpack, see their documentation here
 * https://webpack.js.org/configuration/
 */
const { join } = require('path')
const dotenvConfig = require('dotenv').config()
const _ = require('lodash')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { dev, prod } = require('@ionic/app-scripts/config/webpack.config')

/* LINHAS CUSTOMIZADAS INSERIDAS
***********************************************************************************************************
*
*  - Expõe constiável de ambiente do ionic ao código, usando plugin de enviroment nativo do webpack.
*    ref: http://roblouie.com/article/296/ionic-2-environment-constiables-the-best-way/
*
*  - Expõe constiáveis de ambiente definidas no arquivo .env ao código.
*/

/*
* Monta objeto com props montadas a partir do arquivo .env
*/
const envVariables = {
  'process.env': _(process.env)
                  .pick(_.keys(dotenvConfig.parsed))
                  .mapValues((v) => (JSON.stringify(v)))
                  .value()
}

const setEnvironmentVariables = (env, constants) => {
  const plugins = [
    new webpack.DefinePlugin(constants),
    new webpack.EnvironmentPlugin(['IONIC_ENV'])
  ]
  env.plugins = [...env.plugins, ...plugins]
}

setEnvironmentVariables(dev, envVariables)
setEnvironmentVariables(prod, envVariables)

const customResolveConfig = {
  resolve: {
    alias: {
      '@espm/core': join(__dirname, './src/libs/core'),
      '@espm/shared': join(__dirname, './src/libs/shared')
    }
  }
}
// ref: https://github.com/ionic-team/ionic-app-scripts/issues/1126
// devido ao fato de que o build não reconhece ts compiler options "paths"
module.exports = {
  dev: merge(dev, customResolveConfig),
  prod: merge(prod, customResolveConfig)
}

/***********************************************************************************************************/