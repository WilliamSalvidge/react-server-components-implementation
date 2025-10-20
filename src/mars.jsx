'use client'
import React, { useState } from 'react';

export const Mars = () => {
  const [count, setCount] = useState(0);
  return (
    <div> 
      <button onClick={() => setCount((p) => p + 1) }>Increment Mars</button>
      <p>{count}</p>
      <h2>What</h2>
    </div>
  )
}
