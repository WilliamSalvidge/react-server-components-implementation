import ReactServerWebpackPlugin from 'react-server-dom-webpack/plugin';

export default {
  mode: 'development',
  entry: './src/client.js',
  output: {
    path: `${import.meta.dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new ReactServerWebpackPlugin({ isServer: false })
  ]
};
