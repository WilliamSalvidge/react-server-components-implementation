import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";
import {Planet} from '../../src/planet.js';
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    h2: "h2",
    p: "p",
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsx(_components.h1, {
      children: "Hello World Post"
    }), "\n", _jsx(_components.p, {
      children: "This is an intial demo post of using markdown files as blog posts"
    }), "\n", _jsx(_components.h2, {
      children: "More Detail"
    }), "\n", _jsx(_components.p, {
      children: "We want to write posts in md and then render them into our application (or blog)."
    }), "\n", _jsx(_components.p, {
      children: "However we also want the option to add interactive snippets of code within the flow of a blog post."
    }), "\n", _jsx(_components.p, {
      children: "mdx allows us to add react components into a md document."
    }), "\n", _jsx(_components.p, {
      children: "We can then compile the mdx document to react components."
    }), "\n", _jsx(_components.p, {
      children: "Simple markdown like hash symbols get converted to react elements representing h1, h2 etc."
    }), "\n", _jsx(_components.p, {
      children: "We can reference components from other files which are client components."
    }), "\n", _jsx(_components.p, {
      children: "Here is an example of a client component of a counter."
    }), "\n", _jsx(Planet, {}), "\n", _jsx(_components.p, {
      children: "And we continue with more markdown content below."
    }), "\n", _jsx(_components.h2, {
      children: "Compile MDX"
    }), "\n", _jsx(_components.p, {
      children: "We can compile each markdown file as we create it and store it in the posts component folder."
    }), "\n", _jsx(_components.p, {
      children: "We just need to make sure that the import of the external component (client or server) resolves correctly."
    })]
  });
}
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
