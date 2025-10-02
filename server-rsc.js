import http from 'node:http';
import React from 'react';
import pkg from 'react-server-dom-webpack/server';
const { renderToPipeableStream } = pkg;
import fs from 'node:fs/promises';
import AppEarth from './src/appEarth.js';
import AppSun from './src/appSun.js';

const MANIFEST = await fs.readFile('./dist/react-client-manifest.json' , 'utf8')
const MODULE_MAP = JSON.parse(MANIFEST);

console.log(MODULE_MAP)

const RSCServer = new http.Server();

RSCServer.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // or specific origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (/home|earth/.test(req.url)) {
   const { pipe } = renderToPipeableStream(React.createElement(AppEarth, {}, null), MODULE_MAP);
    return pipe(res);
  }
  if (/sun/.test(req.url)) {
    // Deserialize RSC payload into React elements (runs on SSR server)
    const { pipe } = renderToPipeableStream(React.createElement(AppSun, {}, null), MODULE_MAP);
    return pipe(res);
  }
})

RSCServer.listen(7676, () => console.log('listening on 7676'));
