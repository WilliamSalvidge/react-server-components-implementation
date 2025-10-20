// buffer-to-string-loader.js

export async function load(url, context, nextLoad) {
  console.log('buf-to-string loader')
  const response = await nextLoad(url, context); 
  
  if (response.format === 'module' && response.source instanceof Buffer) {
    return {
      format: 'module',
      source: response.source.toString(),
      shortCircuit: true
    }
  }
  
  return nextLoad(url, context);
}
