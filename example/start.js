const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

const compiler = webpack(webpackConfig)

const devServer = new WebpackDevServer(compiler, {})

devServer.listen(8080, '0.0.0.0', (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})
