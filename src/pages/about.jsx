import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, useParams } from "wouter";

import { Loading } from '../components';

import config from '../../data';
import { getImageUrl } from '../../utils';

export default function About() {
  const [creators, setCreators] = useState(null);
  
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get(config.sssUrl);
        const comicseries = response.data;
        const creators = comicseries.creators;
        const creatorsSSSUrl = creators.map(creator => creator.url);
        const creatorsData = await Promise.all(creatorsSSSUrl.map(url => axios.get(url).then(res => res.data)));
        setCreators(creatorsData);
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    };
    fetchCreators();
  }, []);

  if (!creators) {
    return <Loading />;
  }

  return (
    <div className="my-16">
      <p>{`About the creator${creators.length > 1 ? 's' : ''}`}</p>
      {creators.map(creator => (
        <div key={creator.id}>
          <p>{creator.name}</p>
          <p>{creator.role}</p>
        </div>
      ))}
    </div>
  );
}