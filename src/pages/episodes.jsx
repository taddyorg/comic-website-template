import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../data';
import { Loading, Episode } from '../components';

export default function Episodes() {
  const [comicseries, setComicSeries] = useState(null);
  const [orderBy, setOrderBy] = useState('desc');

  useEffect(() => {
    axios.get(config.sssUrl)
      .then(response => {
        setComicSeries(response.data);
      })
      .catch(error => console.error("There was an error fetching the data:", error));
  }, []);

  if (!comicseries) {
    return <Loading />;
  }

  return (
    <div className="my-16">
      <SortBy orderBy={orderBy} setOrderBy={setOrderBy} />
      <EpisodeList comicseries={comicseries} orderBy={orderBy} />
    </div>
  );
}

const SortBy = ({ orderBy, setOrderBy }) => {
  return (
    <div>
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