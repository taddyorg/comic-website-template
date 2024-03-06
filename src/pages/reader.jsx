import React, { useState, useEffect } from 'react';
import { Link, Route, useParams } from "wouter";

import { ImageWithLoader } from '../components';

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
            <img 
              src="https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/arrow-carrot-left.svg?v=1709344935890" 
              alt="Previous Issue" 
              className="mr-2"
            />
          </Link>
        )}
        <p className='py-6 text-lg font-bold text-center'>{comicissue.name}</p>
        {nextComicissue && (
          <Link href={`/episodes/${nextComicissue.identifier}`}>
            <img 
              src="https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/arrow-carrot-right.svg?v=1709344933691" 
              alt="Next Issue" 
              className="ml-2"
            />
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
              className="flex flex-col items-center px-4 py-2 border border-transparent text-sm leading-5 font-bold rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition ease-in-out duration-150"
            >
              Next Episode
            </Link>
        }
      </div>
    </div>
  );
}