import React from 'react';

const fetchSolarSystem = () => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => resolve('Milky Way'), 10000);
  })
}

const Loading = () => React.createElement('h4', {}, 'Loading');

const Galaxy = async () => {
  const solarSystem = await fetchSolarSystem();
  return React.createElement('p', {}, `Solar System is in the ${solarSystem}`)
}

export const Solar = () => {
  return (
    React.createElement(React.Suspense, { fallback: React.createElement(Loading, {}, null) }, React.createElement(Galaxy))
  )
}
