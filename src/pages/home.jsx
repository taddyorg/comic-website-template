import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { getImageUrl } from '../utils';
import { Seo, Episode, AppLinks, ArrowLeft, ArrowRight } from '../components';


export default function Home({ comicseries }) {
  return (
    <>
      <Seo
        path={`/`}
        title={comicseries.name}
        description={comicseries.description}
        image={getImageUrl({ image: comicseries.bannerImage, type:'banner', variant: 'md' })}
      />
      <CoverAndDescription comicseries={comicseries} />
      <LatestEpisodes comicseries={comicseries} numberOfEpisodes={5}/>
    </>
  );
}

const CoverAndDescription = ({ comicseries }) => {
  return (
    <div className="flex flex-col sm:flex-row py-4 px-14 sm:px-4">
      <div className="sm:w-1/2 flex flex-col justify-center items-center">
        <img
          src={getImageUrl({ image: comicseries.coverImage, type:'cover', variant: 'md' })}
          alt={'comic banner art'}
          className="aspect-4/6 sm:h-80 object-cover rounded-lg"
        />
      </div>
      <div className="sm:w-1/2 mr-2">
        <h1 className="text-4xl font-bold pt-4 sm:pt-0 text-primary">{comicseries.name}</h1>
        <p className="text-lg mt-2 text-primary">{comicseries.description}</p>
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
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-4xl text-secondary font-bold py-4">Latest Episodes</h2>
      <div>
        {lastXEpisodes.map((episode, index) => (
          <Episode key={index} episode={episode} />
        ))}
      </div>
      {comicseries.issues.length > numberOfEpisodes && (
        <Link href="/episodes" className="flex flex-row text-2xl text-secondary font-bold py-2">
          <p>See all episodes</p>
          <ArrowRight color="secondary" />
        </Link>
      )}
    </div>
  );
}