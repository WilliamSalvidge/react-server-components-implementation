import React, { Suspense } from 'react';

const fetchSolarSystem = () => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => resolve('Milky Way'), 10000);
  })
}

const Loading = () => <h4>Loading</h4>;

const Galaxy = async () => {
  const solarSystem = await fetchSolarSystem();
  return <p>{`Solar System is in the ${solarSystem}`}</p>
}

export const Solar = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Galaxy />
    </Suspense>
  )
}
