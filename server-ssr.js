import http from 'node:http';
import { Readable } from 'node:stream';
import { renderToReadableStream } from 'react-dom/server';
import pkg from 'react-server-dom-webpack/client';
const { createFromReadableStream } = pkg;
import fs from 'node:fs/promises';
import { injectRSCPayload } from 'rsc-html-stream/server'

const SERVER_MANIFEST = await fs.readFile('./dist/react-ssr-manifest.json' , 'utf8')
const SERVER_MODULE_MAP = JSON.parse(SERVER_MANIFEST);

const OPTS = { serverConsumerManifest: SERVER_MODULE_MAP }

const SSRServer = new http.Server();

SSRServer.on('request', async (req, res) => {
  if (/ico$/.test(req.url)) return;

  if (/js$/.test(req.url)) {
    res.setHeader('content-type', 'text/javascript');
    const file = await fs.readFile(`./dist${req.url}`, 'utf8');
    return res.end(file);
  }

  if (/rsc$/.test(req.url)) {
    const url = new URL(req.url, 'http://localhost');
    const rscResponse = await fetch(`http://localhost:7676${url.pathname}`); //RSC server
    return rscResponse.body.pipeTo(res);
  }

  // Request does not end in .ico, .js or ?rsc
  const rscResponse = await fetch(`http://localhost:7676${req.url}`); // request to RSC server
  
  const [rsc1, rsc2] = rscResponse.body.tee();

  // Deserialize RSC payload into React elements (runs on SSR server)
  const root = createFromReadableStream(rsc1, OPTS);

  // Now render that React tree to HTML
  const htmlStream = await renderToReadableStream(root, { bootstrapModules: ["bundle.js"] });
  let responseStream = htmlStream;
  responseStream = responseStream.pipeThrough(injectRSCPayload(rsc2));
  const nodeStream = Readable.fromWeb(responseStream);
  nodeStream.pipe(res);
  return;
})

SSRServer.listen(5454, () => console.log('listening on 5454'));
