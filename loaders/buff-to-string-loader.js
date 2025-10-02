// buffer-to-string-loader.js
export async function load(url, context, nextLoad) {
  const result = await nextLoad(url, context);
  
  // Only convert to string for files in the web directory
  if (result.format === 'module') { 
      // && 
      //result.source instanceof Buffer && 
      // url.includes('/web/')) {
    return {
      ...result,
      source: result.source.toString('utf-8')
    };
  }
  
  return result;
}
