'use client'
import React from 'react';

export const Mars = () => {
  const [count, setCount] = React.useState(0);
  return (
    React.createElement('div', {}, 
      React.createElement('button', { onClick: () => setCount((p) => p + 1) }, "Increment Mars"),
      React.createElement('p', {}, count),
      React.createElement('h2', {}, "What")
    )
  )
}

// export default Planet;
