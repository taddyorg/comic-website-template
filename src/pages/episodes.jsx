import React, { useState } from 'react';

import { Seo, Episode } from '../components';
import { getImageUrl } from '../utils';

export default function Episodes({ comicseries }) {
  const [orderBy, setOrderBy] = useState('desc');

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <Seo
        path={`/episodes`}
        title={comicseries.name + ' Episodes'}
        description={'List of all episodes for ' + comicseries.name}
        image={getImageUrl({ image: comicseries.bannerImage, type:'banner', variant: 'md' })}
      />
      <SortBy orderBy={orderBy} setOrderBy={setOrderBy} />
      <EpisodeList comicseries={comicseries} orderBy={orderBy} />
    </div>
  );
}

const SortBy = ({ orderBy, setOrderBy }) => {
  return (
    <div className='pb-2'>
      <SortByButton orderBy={orderBy} setOrderBy={setOrderBy} value="desc" label="Oldest" />
      <span> | </span>
      <SortByButton orderBy={orderBy} setOrderBy={setOrderBy} value="asc" label="Latest" />
    </div>
  );
}

const SortByButton = ({ orderBy, setOrderBy, value, label }) => {
  return (
    <button 
      onClick={() => setOrderBy(value)} 
      style={{fontWeight: orderBy === value ? 'bold' : 'normal'}}>
        {label}
    </button>
  );
}

const EpisodeList = ({ comicseries, orderBy }) => {
  if (!comicseries.issues || comicseries.issues.length === 0) {
    return (<></>);
  }

  const issues = [...comicseries.issues];

  if (orderBy === 'asc') {
    issues.reverse();
  }

  return (
    <div>
      {issues.map((episode, index) => (
        <Episode key={index} episode={episode} />
      ))}
    </div>
  );
}