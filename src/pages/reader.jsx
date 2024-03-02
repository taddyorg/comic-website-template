import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, useParams } from "wouter";

import { Loading, ImageWithLoader } from '../components';

import config from '../../data';
import { getImageUrl } from '../../utils';

export default function Reader() {
  const { identifier } = useParams();
  const [comicseries, setComicSeries] = useState(null);
  
  useEffect(() => {
    axios.get(config.sssUrl)
      .then(response => {
        setComicSeries(response.data);
      })
      .catch(error => console.error("There was an error fetching the data:", error));
  }, [identifier]);

  if (!comicseries) {
    return <Loading />;
  }

  const startIndex = comicseries.issues.findIndex(issue => issue.identifier === identifier);

  if (startIndex === -1) {
    return <p>Episode not found</p>;
  }

  const comicissue = comicseries.issues[startIndex];
  const nextComicissue = comicseries.issues[startIndex + 1];
  // const endIndex = Math.min(startIndex + 1, comicseries.issues.length);
  // const comicissues = comicseries.issues.slice(startIndex, endIndex);

  return (
    <div className="my-16">
      <EpisodesBox 
        comicissue={comicissue} 
        nextComicissue={nextComicissue}
      />
    </div>
  );
}

function EpisodesBox({ comicissue, nextComicissue }) {
  return (
    <Stories
      key={comicissue.identifier} 
      comicissue={comicissue}
      nextComicissue={nextComicissue}
    />
  );
}

function Stories({ comicissue, nextComicissue }){
  return (
    <>
      <p className='py-6 text-lg font-bold text-center'>{comicissue.name}</p>
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
              <p className="items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md">
                You are up to date with this series!
              </p>
            </div>
          :  <Link
              href={`/episodes/${comicissue.identifier}`}
              type="button"
              className="flex flex-col items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition ease-in-out duration-150"
            >
              Next Episode
            </Link>
        }
      </div>
    </div>
  );
}