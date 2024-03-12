import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Seo, Loading, SocialMediaLinks } from '../components';

import { getImageUrl } from '../utils';

export default function About({ comicseries, creators }) {
  if (!creators) {
    return <Loading />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <Seo
        path={`/about`}
        title={`${creators[0] && creators[0].name} - About the creator`}
        description={'Details about the creator of ' + comicseries.name}
        image={getImageUrl({ image: comicseries.bannerImage, type:'banner', variant: 'md' })}
      />
      <p className='text-2xl font-bold text-center mb-4 text-primary'>{`About the creator${creators.length > 1 ? 's' : ''}`}</p>
      {creators.map(creator => (
        <Creator 
          key={creator.identifier} 
          creator={creator} />
      ))}
      <CustomHtml />
    </div>
  );
}

const Creator = ({ creator }) => {
  return (
    <div>
      <div className='flex flex-col items-center'>
        <img 
          src={getImageUrl({ image: creator.avatarImage, type: 'avatar', variant: 'md' })}
          alt={creator.name}
          className="h-24 w-24 rounded-full object-cover"
        />
        <p className='text-lg font-bold mt-2 text-primary'>{creator.name}</p>
        <SocialMediaLinks links={creator.links} />
      </div>
      <div className="text-center">
        <p className='text-md pt-4 text-primary'>{creator.bio}</p>
      </div>
    </div>
  );
};

// You can add some custom html here if you'd like
const CustomHtml = ({ }) => {
  return (
    <></>
  );
};

