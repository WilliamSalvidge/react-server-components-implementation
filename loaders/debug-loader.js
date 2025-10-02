// debug-loader.js
export async function load(url, context, nextLoad) {
  const result = await nextLoad(url, context);
  console.log('Loading:', url);
  console.log('Format:', result.format);
  console.log('Source type:', typeof result.source);
  console.log(result.source)
  console.log('Source is Buffer:', result.source instanceof Buffer);
  return result;
}
