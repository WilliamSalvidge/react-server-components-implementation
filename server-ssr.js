import http from 'node:http';
import { Readable, PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import pkg from 'react-server-dom-webpack/client';
const { createFromNodeStream } = pkg;
import fs from 'node:fs/promises';

const MANIFEST = await fs.readFile('./dist/react-ssr-manifest.json' , 'utf8')
const MODULE_MAP = JSON.parse(MANIFEST);

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
    const rscResText = await rscResponse.text() 
    // get response but don't turn it into html just pass it on to the FE
    console.log(rscResText);
    return res.end(rscResText);
  }

  // Request does not end in .ico, .js or ?rsc
  const rscResponse = await fetch(`http://localhost:7676${req.url}`); // request to RSC server
  const nodeStream = Readable.fromWeb(rscResponse.body);

  let rscPayload = '';
  const modStream = nodeStream.pipe(new PassThrough({
    transform(chunk, _encoding, callback) {
      console.log(chunk.toString())
      rscPayload += chunk.toString();
      callback(null, chunk); // Pass through unchanged
    }
  }));

  // Deserialize RSC payload into React elements (runs on SSR server)
  const root = createFromNodeStream(modStream, MODULE_MAP);

  // Now render that React tree to HTML
  const { pipe } = renderToPipeableStream(root, {
    onShellReady() {
      console.log('yarp')
      pipe(res);
    },
    onAllReady() {
      console.log('yep')
      // Inject the RSC payload script after React finishes
      res.write(`<script>window.__RSC_PAYLOAD__=${JSON.stringify(rscPayload)}</script>`);
      res.write('<script src="/bundle.js"></script>');
      res.end();
    }
  })
  return;
})

SSRServer.listen(5454, () => console.log('listening on 5454'));
