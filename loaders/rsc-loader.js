import { load as reactLoad } from 'react-server-dom-webpack/node-loader';

export async function load(url, context, nextLoad) {
  console.log('rsc loader')
  if (url.includes('node_modules')) {
    return nextLoad(url, context);
  };
  return reactLoad(url, context, nextLoad);  
}
