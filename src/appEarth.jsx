import React from 'react';
import Layout from './layout.jsx';
import Moon from './moon.jsx';
import { Planet } from './planet.jsx'
import { Solar } from './solar.jsx'

const AppEarth = () => {
  return (
    <Layout>
      <div style={{border: "2px solid black"}}>
        <div style={{border: "2px solid red"}}>
          <Planet />
        </div>
        <a href={"http://localhost:7676/sun"}>Sun Page</a>
        <h1>Hello World</h1>
        <Moon />
        <Planet />
        <Solar />
        <p>Hi</p>
      </div>
    </Layout>
  )
}

export default AppEarth;
