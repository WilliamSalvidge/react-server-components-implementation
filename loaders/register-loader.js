import { register } from 'node:module';

console.log('Registering loaders');

// register('./debug-loader.js', import.meta.url);
register('./buff-to-string-loader.js', import.meta.url);
// register('./debug-loader.js', import.meta.url);
register('./rsc-loader.js', import.meta.url);
