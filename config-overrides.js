const { override, addWebpackPlugin, addWebpackResolve } = require('customize-cra');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = override(
  addWebpackPlugin(new NodePolyfillPlugin()),
  addWebpackResolve({
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib")
    }
  })
);
