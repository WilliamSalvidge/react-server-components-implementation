import fs from 'node:fs/promises'
import { argv } from 'node:process';
import {compile} from '@mdx-js/mdx'

let file;
argv.forEach((val, index) => {
  if (val === '-f' && argv[index + 1]) {
   file = argv[index + 1] 
  }
});

file = file.split('.')[0];

const compiled = await compile(await fs.readFile(`./posts/mdx/${file}.mdx`))
await fs.writeFile(new URL(`./components/${file}.js`, import.meta.url).pathname, String(compiled), 'utf8');

console.log(String(compiled))
