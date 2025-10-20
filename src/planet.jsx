'use client'
import React, { useState } from 'react';

export const Planet = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Hello world</h2>
      <p>{count}</p>
      <button onClick={() => setCount((p) => p + 1)}>Increment Planet</button>
    </div>
  )
}
