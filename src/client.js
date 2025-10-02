import { createFromReadableStream, createFromFetch } from 'react-server-dom-webpack/client.browser';
import { hydrateRoot } from 'react-dom/client';

// Get the inlined payload
const rscPayload = window.__RSC_PAYLOAD__;

// Convert to a ReadableStream for the React client
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue(new TextEncoder().encode(rscPayload));
    controller.close();
  }
});

// Create the React tree from the stream
const roots = await createFromReadableStream(stream);

// Hydrate
const root = hydrateRoot(document, roots);

let currentPathname = window.location.pathname;

async function navigate(pathname) {
  if (/\?rsc$/.test(pathname)) {
    console.log('made it')
    currentPathname = pathname;
    const clientJSX = await createFromFetch(fetch(currentPathname));
    console.log(clientJSX)
    root.render(clientJSX);
    return;
  }
  currentPathname = pathname + '?rsc';
  const clientJSX = await createFromFetch(fetch(currentPathname));
  console.log(clientJSX)
  root.render(clientJSX);
  return;
}

window.addEventListener("click", (e) => {
  // Only listen to link clicks.
  if (e.target.tagName !== "A") {
    return;
  }
  // Ignore "open in a new tab".
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return;
  }
  // Ignore external URLs.
  const href = e.target.getAttribute("href");
  // if (!href.startsWith("/")) {
  //  return;
  // }
  // Prevent the browser from reloading the page but update the URL.
  e.preventDefault();
  if (!href.startsWith("/")) {
    const url = new URL(href);
    window.history.pushState(null, null, url.pathname);
    navigate(href);
    return;
  }
  window.history.pushState(null, null, href);
  // Call our custom logic.
  navigate(href);
}, true);

window.addEventListener("popstate", () => {
  // When the user presses Back/Forward, call our custom logic too.
  navigate(window.location.pathname);
})
