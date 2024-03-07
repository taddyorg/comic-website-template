import React, { useState, useEffect } from 'react';
import { Link, Route, useParams } from "wouter";

import { ArrowLeft, ArrowRight, ImageWithLoader } from '../components';

import { getImageUrl } from '../../utils';

export default function Reader({ comicseries }) {
  const { identifier } = useParams();
  
  const startIndex = comicseries.issues.findIndex(issue => issue.identifier === identifier);

  if (startIndex === -1) {
    return <p>Episode not found</p>;
  }

  const comicissue = comicseries.issues[startIndex];
  const previousComicissue = comicseries.issues[startIndex - 1];
  const nextComicissue = comicseries.issues[startIndex + 1];

  return (
    <div className="md:flex md:flex-col md:items-center md:justify-center">
      <EpisodesBox 
        comicissue={comicissue} 
        previousComicissue={previousComicissue}
        nextComicissue={nextComicissue}
      />
    </div>
  );
}

function EpisodesBox({ comicissue, previousComicissue, nextComicissue }) {
  return (
    <Stories
      key={comicissue.identifier} 
      comicissue={comicissue}
      previousComicissue={previousComicissue}
      nextComicissue={nextComicissue}
    />
  );
}

function Stories({ comicissue, previousComicissue, nextComicissue }){
  return (
    <>
      <div className="flex justify-center items-center">
        {previousComicissue && (
          <Link href={`/episodes/${previousComicissue.identifier}`}>
            <ArrowLeft />
          </Link>
        )}
        <p className='py-6 text-lg font-bold text-center'>{comicissue.name}</p>
        {nextComicissue && (
          <Link href={`/episodes/${nextComicissue.identifier}`}>
            <ArrowRight />
          </Link>
        )}
      </div>
      {comicissue.stories && comicissue.stories.map((story, index) => {
        return (
          <ImageWithLoader
            key={story.identifier}
            imgClassName="w-full select-none pointer-events-none"
            imageUrl={getImageUrl({ image:story.storyImage, type:'story' })} />
        )
      })}
      <LoadNextEpisode 
        comicissue={nextComicissue}
      />
    </>
  );
}

const LoadNextEpisode = ({ comicissue }) => {
  return (
    <div className="flex justify-center mt-6 mb-4">
      <div className='flex flex-col'>
        {!comicissue
          ? <div className="flex justify-center mt-6 mb-4">
              <p className="items-center px-4 py-2 border border-transparent text-sm leading-5 font-bold rounded-md">
                You are up to date with this series!
              </p>
            </div>
          :  <Link
              href={`/episodes/${comicissue.identifier}`}
              type="button"
              className="flex flex-col items-center px-4 py-2 border border-transparent text-sm leading-5 font-bold rounded-md text-white bg-primary"
            >
              Next Episode
            </Link>
        }
      </div>
    </div>
  );
}