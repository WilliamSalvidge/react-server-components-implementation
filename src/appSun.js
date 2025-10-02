import React from 'react';
import Pluto from './pluto.js';
import { Mars } from './mars.js'
import { Planet } from './planet.js'

const AppSun = () => {
  return (
    React.createElement('html', {},
      React.createElement('head', {}, null),
      React.createElement('body', {},
        React.createElement('div', { style: { border: "2px solid black" } },
          React.createElement('div', { style: { border: "2px solid red" } }, 
            React.createElement(Planet, {}, null)  
          ),
          React.createElement('a', { href: "http://localhost:7676/earth" }, "Earth Page"),
          React.createElement('h2', {}, 'Goodbye Mars'),
          React.createElement(Pluto, {}, null),
          React.createElement(Mars, {}, null)
        )
      )
    )
  )
}

export default AppSun;
