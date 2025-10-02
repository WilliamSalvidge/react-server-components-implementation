import React from 'react';
import Moon from './moon.js';
import { Planet } from './planet.js'
import { Solar } from './solar.js'

const AppEarth = () => {
  return (
    React.createElement('html', {},
      React.createElement('head', {}, null),
      React.createElement('body', {},
        React.createElement('div', { style: { border: "2px solid black" } },
          React.createElement('div', { style: { border: "2px solid red" } }, 
            React.createElement(Planet, {}, null)  
          ),
          React.createElement('a', { href: "http://localhost:7676/sun" }, "Sun Page"),
          React.createElement('h1', {}, 'Hello World'),
          React.createElement(Moon, {}, null),
          React.createElement(Planet, {}, null),
          React.createElement(Solar, {}, null),
          React.createElement('p', {}, "Hi")
        )
      )
    )
  )
}

export default AppEarth;
