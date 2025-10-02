import ReactServerWebpackPlugin from 'react-server-dom-webpack/plugin';

export default {
  mode: 'development',
  entry: './src/client.js',
  output: {
    path: `${import.meta.dirname}/dist`,
    filename: 'bundle.js',
  },
  plugins: [
    new ReactServerWebpackPlugin({ isServer: false })
  ]
};
