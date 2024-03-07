import * as React from "react";
import { getImageUrl, parseDate } from '../../utils';
import { Link } from 'wouter';

const Episode = ({ episode }) => {  
  return (
    <Link className="flex flex-row pb-1" href={`/episodes/${episode.identifier}`}>
      <img
        src={getImageUrl({ image: episode.thumbnailImage, type:'thumbnail' })}
        alt={'comic cover art'}
        className="h-24 aspect-1 rounded-sm object-contain object-center"
      />
      <div className="flex flex-col px-2">
        <h3 className="text-2xl font-bold">{episode.name}</h3>
        <p className="text-lg">{episode.datePublished ? parseDate({ date: episode.datePublished }) : ''}</p>
      </div>
    </Link>
  );
};

export default Episode;