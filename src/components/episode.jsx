import * as React from "react";
import { Link } from 'wouter';

import { getImageUrl, parseDate } from '../utils';

const Episode = ({ episode }) => {  
  const scopesForExclusiveContentSet = new Set(episode.scopesForExclusiveContent || []);
  const isPatreon = scopesForExclusiveContentSet.has('patreon');
  return (
    <Link className="flex flex-row pb-1" href={`/episodes/${episode.identifier}`}>
      <img
        src={getImageUrl({ image: episode.thumbnailImage, type:'thumbnail' })}
        alt={'comic cover art'}
        className="h-24 aspect-1 rounded-sm object-contain object-center"
      />
      <div className="flex flex-col px-2">
        <h3 className="text-2xl font-bold text-primary">{episode.name}</h3>
        <p className="text-lg text-primary">{episode.datePublished ? parseDate({ date: episode.datePublished }) : ''}</p>
        {isPatreon && 
          <p className="text-lg text-secondary">🔒 Patreon Exclusive</p>
        }
      </div>
    </Link>
  );
};

export default Episode;