import { register } from 'node:module';

register('./buffer-to-string-loader.js', import.meta.url);
register('./jsx-loader.js', import.meta.url);
register('./rsc-loader.js', import.meta.url);
