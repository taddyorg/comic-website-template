import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Loading } from '../components';

import { getImageUrl } from '../../utils';

export default function About({ comicseries }) {
  const [creators, setCreators] = useState(null);
  
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const creatorsRaw = comicseries.creators;
        const creatorsSSSUrl = creatorsRaw.map(creator => creator.url);
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
    <div>
      <p>{`About the creator${creators.length > 1 ? 's' : ''}`}</p>
      {creators.map(creator => (
        <Creator 
          key={creator.identifier} 
          creator={creator} />
      ))}
    </div>
  );
}

const Creator = ({ creator }) => {
  return (
    <div>
      <img 
        src={getImageUrl({ image: creator.avatarImage, type: 'avatar', variant: 'md' })}
        alt={creator.name}
        className="h-24 w-24 rounded-full object-cover"
      />
      <p>{creator.name}</p>
      <p>{creator.bio}</p>
    </div>
  );
};

