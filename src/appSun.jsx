import React from 'react';
import Layout from './layout.jsx';
import Pluto from './pluto.jsx';
import { Mars } from './mars.jsx'
import { Planet } from './planet.jsx'

const AppSun = () => {
  return (
    <Layout>
      <div style={{border: "2px solid black"}}>
        <div style={{border: "2px solid red"}}>
          <Planet />
        </div>
          <a href={"http://localhost:7676/earth"}>Earth Page</a>
          <h2>Goodbye Mars</h2>
          <Pluto />
          <Mars />
      </div>
    </Layout>
  )
}

export default AppSun;
