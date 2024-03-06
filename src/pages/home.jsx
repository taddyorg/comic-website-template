import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../../utils';
import { Seo, Episode, AppLinks } from '../components';

export default function Home({ comicseries }) {
  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <CoverAndDescription comicseries={comicseries} />
      {/* <div className="flex flex-col items-center justify-center"> */}
        <LatestEpisodes comicseries={comicseries} numberOfEpisodes={5}/>
      {/* </div> */}
    </div>
  );
}

const CoverAndDescription = ({ comicseries }) => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="sm:w-1/2">
        <img
          src={getImageUrl({ image: comicseries.coverImage, type:'cover', variant: 'md' })}
          alt={'comic banner art'}
          className="aspect-4/6 sm:h-80 object-cover rounded-lg"
        />
      </div>
      <div className="sm:w-1/2 flex flex-col justify-center items-center sm:items-start">
        <p className="text-lg pt-2 sm:pt-0">{comicseries.description}</p>
        <AppLinks page='home'/>
      </div>
    </div>
  );
}

const LatestEpisodes = ({ comicseries, numberOfEpisodes }) => {
  if (!comicseries.issues || comicseries.issues.length === 0) {
    return (<></>);
  }

  const issues = [...comicseries.issues];

  const lastXEpisodes = issues.slice(-Math.abs(numberOfEpisodes)).reverse();

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl text-secondary font-bold py-4">Latest Episodes</h2>
      <div>
        {lastXEpisodes.map((episode, index) => (
          <Episode key={index} episode={episode} />
        ))}
      </div>
      {comicseries.issues.length > numberOfEpisodes && (
        <a href="/episodes" className="flex flex-row text-2xl text-secondary font-bold py-2">
          <p>See all episodes</p>
          <img 
          src="https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/arrow-carrot-right.svg?v=1709344933691" 
          alt="Next Issue" 
          className="" />
      </a>
      )}
    </div>
  );
}