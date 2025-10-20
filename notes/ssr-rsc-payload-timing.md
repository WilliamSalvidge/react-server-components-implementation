Some notes on the issue with RSC payload timing.

On the client we use the rscStream import from `rsc-html-stream/client`.

It does something very cool!

First it creates a ReadableStream.

In the creation of that ReadableStream we use the start method to set up ingestion of the RSC payload.

We do this by accessing the array __FLIGHT_DATA

Something to note is that __FLIGHT_DATA are in clasic scripts which are run as they are parsed.

I currently have my bootstrap module set up as a type="module" which means it will run after parsing but before the DOMContentLoaded event.

So it likely means that the initial RSC payload FLIGHT_DATA is present by the time the module runs.

I believe this is simialr to how next does it you will see `self.__next_f.push` in next apps.
