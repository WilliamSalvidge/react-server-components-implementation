# Hello World Post

This is an intial demo post of using markdown files as blog posts

## More Detail

We want to write posts in md and then render them into our application (or blog).

However we also want the option to add interactive snippets of code within the flow of a blog post.

mdx allows us to add react components into a md document.

We can then compile the mdx document to react components.

Simple markdown like hash symbols get converted to react elements representing h1, h2 etc.

We can reference components from other files which are client components.

Here is an example of a client component of a counter.

[This is a comment that will be hidden. Add Planet Component]: #

And we continue with more markdown content below.

## Compile MDX

We can compile each markdown file as we create it and store it in the posts component folder.

We just need to make sure that the import of the external component (client or server) resolves correctly.
