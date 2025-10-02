'use client'
import React from 'react';

export const Planet = () => {
  const [count, setCount] = React.useState(0);
  return (
    React.createElement('div', {}, 
      React.createElement('h2', {}, "Hello world"),
      React.createElement('p', {}, count),
      React.createElement('button', { onClick: () => setCount((p) => p + 1) }, "Increment Planet")
    )
  )
}

// export default Planet;
