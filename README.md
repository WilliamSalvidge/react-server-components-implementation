# RSC Implementation using react-server-dom-webpack bindings

Here are some resources I used to help create the implementation

- https://github.com/reactwg/server-components/discussions/5 - Dan Abramov - RSC From Scratch. Part 1: Server Components
- https://www.youtube.com/watch?v=MaebEqhZR84 - Ben Holmes - React server components from scratch!
- https://github.com/epicweb-dev/react-server-components/tree/main/exercises - Kent C Dodds - RSC Exercises

## Run

- `npm i`
- `npm build` - this will create the dist folder

Open 2 terminal windows

- `npm run rsc-server`
- `npm run ssr-server`

- Open browser visit `http://localhost:5454/sun`

## Layout

This implementation consists of 2 Servers.

- Main SSR server
    - renders React Server Component payload to HTML on initial page request
    - sends back static assets (javascript bundles)

- React Server Components Server
    - renders React components to the RSC payload format

## Flow

The general flow of the app is:

- Client makes initial request from browser (http://localhost:5454/sun)
- SSR server recieves request and makes its own request to RSC server for RSC payload (http://localhost:7676/sun)
- RSC server recieves request and renders RSC payload
- SSR server recieves RSC payload
- SSR server turns RSC payload back into a standard tree of react components
- SSR server renders the react tree to HTML
- SSR server inlines RSC payload into the HTML
- SSR server adds script tag for client bundle into HTML
- Client fetches client bundle
- Client processes file which includes accessing the inlined RSC payload
- Client hydrates the document

Any future requests

- Client clicks link and normal navigation is interupted
- Request is made straight to RSC server (bypassing SSR server)
- Client recieves RSC payload and uses it to update the page

## Notes

There are many things to note about the setup!

### Building / Bundling

The application is built using the command `./node_modules/.bin/webpack -c webpack.config.js`

The config mentions the app entry point as the `./src/client.js`

The way webpack normally works (as I understand) is to traverse imports and build a graph.

Here client.js imports none of the modules in the src folder and yet it is still able to create manifest files (see `./dist` folder) which includes references for client components and bundles for these components.

Currently just accepting this as an abstraction that the `ReactServerWebpackPlugin` is responsible for.

### Loaders and Client References

When the RSC server starts generating the RSC payload in the call to renderToPipeableStream it may come across a client component.

This component should not be called. The RSC server should create a reference for the client (that could be the SSR server or the browser).

How does this happen?

When we run the RSC server we use the following command

node --import ./loaders/register-loader.js --conditions react-server server-rsc.js

the import statement ensures we load the node-loader from react-server-dom-webpack. This will affect how modules are loaded if they start with the 'use client' directive.

It will turn the imported module from being what actually is to something like this

```
import {registerClientReference} from "react-server-dom-webpack/server";

const Planet = registerClientReference(
  function() {
    throw new Error("Attempted to call Planet() from the server but Hello is on the client. "
    + "It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
    );
  },
  "file:///home/user/path/to/src/planet.js",
  "Planet"
);
```
The invocation of `registerClientReference` which happens as the module is loaded returns a function with some properties attached.

```
Planet.$$typeof = Symbol(react.client.reference)
Planet.$$id = "file:///home/user/path/to/src/planet.js#Planet"
```

This id can be used to match against the entry in the client manifest and tells renderPipeableStream which client bundles need to refrenced. So you would end up with something like

```
2:I["./src/planet.js",["client1","client1.bundle.js"],"Planet"]
```
### Streams

To be done

### Extra

Parts of `react-server-dom-webpack` to be aware of

- `load` from `react-server-dom-webpack/node-loader` - used in `rsc-loader.js`
- `renderToPipeableStream` from `react-server-dom-webpack/server` - used in `server-rsc.js`
- `createFromNodeStream` from from react-server-dom-webpack/client` - used in `server-ssr.js`
- `createFromFetch` from react-server-dom-webpack/client` - used in `client.js`
- `createFromReadableStream` from react-server-dom-webpack/client` - used in `client.js`
- `ReactServerWebpackPlugin` from `react-server-dom-webpack/plugin' - used in `webpack.config.js`
