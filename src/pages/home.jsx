import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../data';
import { getImageUrl } from '../../utils';
import { Loading, Seo, Episode } from '../components';
import { Link } from "wouter";

export default function Home() {
  const [comicseries, setComicSeries] = useState(null);

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
    <div>
      <CoverBanner comicseries={comicseries} />
      {/* <Name comicseries={comicseries} /> */}
      <WhereToReadLinks />
      <LatestEpisodes comicseries={comicseries} numberOfEpisodes={5}/>
    </div>
  );
}

const Name = ({ comicseries, pageType }) => {
  return (<h1 className="text-9xl font-bold text-primary">{comicseries.name}</h1>);
}

const CoverBanner = ({ comicseries }) => {
  return (
    <div className="w-full">
      <img
        src={getImageUrl({ image: comicseries.bannerImage, type:'banner', variant: 'md' })}
        alt={'comic banner art'}
        className="w-full sm:h-80 object-cover"
      />
    </div>
  );
}

const LatestEpisodes = ({ comicseries, numberOfEpisodes }) => {
  if (!comicseries.issues || comicseries.issues.length === 0) {
    return (<></>);
  }

  const issues = [...comicseries.issues];

  const lastXEpisodes = issues.slice(-Math.abs(numberOfEpisodes)).reverse();

  return (
    <div>
      <h2 className="text-4xl text-secondary font-bold">Latest Episodes</h2>
      <div>
        {lastXEpisodes.map((episode, index) => (
          <Episode key={index} episode={episode} />
        ))}
      </div>
      {comicseries.issues.length > numberOfEpisodes && (
        <a href="/episodes" className="text-2xl text-secondary font-bold">See all episodes</a>
      )}
    </div>
  );
}

const WEBTOON = 'WEBTOON';
const TAPAS = 'TAPAS';
const INKVERSE = 'INKVERSE';
const NAMICOMI = 'NAMICOMI';
const GLOBALCOMIX = 'GLOBALCOMIX';
const MANGAPLUS = 'MANGAPLUS';

const WhereToReadLinks = () => {
  const webtoonLinksObj = config.webtoonLinks;
  const webtoonLinkValues = new Set(Object.values(webtoonLinksObj));
  
  if (webtoonLinkValues.size === 1 && webtoonLinkValues.has('')) {
    return (<></>);
  }

  const webtoonUrl = webtoonLinksObj[WEBTOON];
  const tapasUrl = webtoonLinksObj[TAPAS];
  const inkverseUrl = webtoonLinksObj[INKVERSE];
  const namicomiUrl = webtoonLinksObj[NAMICOMI];
  const globalcomixUrl = webtoonLinksObj[GLOBALCOMIX];
  const mangaplusUrl = webtoonLinksObj[MANGAPLUS];
  
  return (
    <div className='bg-secondary-background pb-4 rounded-lg'>
      <h2 className="text-4xl text-secondary font-bold text-center pt-4 rounded-4xl">Where to Read</h2>
      <div className="grid grid-cols-3 gap-8 items-center justify-items-center">
        {webtoonUrl && (
          <ComicPlatform type={WEBTOON} url={webtoonUrl} />
        )}
        {tapasUrl && (
          <ComicPlatform type={TAPAS} url={tapasUrl} />
        )}
        {inkverseUrl && (
          <ComicPlatform type={INKVERSE} url={inkverseUrl} isBanner/>
        )}
        {namicomiUrl && (
          <ComicPlatform type={NAMICOMI} url={namicomiUrl} />
        )}
        {globalcomixUrl && (
          <ComicPlatform type={GLOBALCOMIX} url={globalcomixUrl} />
        )}
        {mangaplusUrl && (
          <ComicPlatform type={MANGAPLUS} url={mangaplusUrl} />
        )}
      </div>
    </div>
  );
}

const ComicPlatform = ({ type, url, isBanner }) => {
  return (
    <a href={url} target='_blank' rel='noreferrer noopener' className={`flex justify-center items-center ${isBanner ? "h-40" : "h-24"}`}>
      <img
        src={getComicPlatformImageUrl(type)}
        alt={`link to ${type}`}
        className="object-contain object-center h-full"
      />
    </a>
  );
}

function getComicPlatformImageUrl(type) {
  switch (type) {
    case WEBTOON:
      return 'https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/webtoon-logo.png?v=1709247000817'
    case TAPAS:
      return 'https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/tapas-logo.png?v=1709247199105'
    case INKVERSE:
      return 'https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/read-on-inkverse.gif?v=1709248895474';
    case NAMICOMI:
      return 'https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/namicomi-dark-logo.png?v=1709248894768';
    case GLOBALCOMIX:
      return 'https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/global-comix-logo.png?v=1709250085650';
    case MANGAPLUS:
      return 'https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/manga-plus-logo.png?v=1709250206178';
    default:
      return null;
  }
}
