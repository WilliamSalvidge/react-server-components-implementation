import babel from '@babel/core'
import fs from 'node:fs/promises'

export async function load(url, context, nextLoad) {
  console.log('jsx loader')
  if (url.endsWith('.jsx')) {
    const result = await fs.readFile(new URL(url).pathname);
    const transformedCode = babel.transformSync(result, { presets: ["@babel/preset-react"] });
    return {
      format: 'module',
      source: transformedCode.code,
      shortCircuit: true
    };
  }
  return nextLoad(url, context);
}
