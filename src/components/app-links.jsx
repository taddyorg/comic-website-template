import * as React from "react";
import config from '../../data';

const WEBTOON = 'WEBTOON';
const TAPAS = 'TAPAS';
const INKVERSE = 'INKVERSE';
const NAMICOMI = 'NAMICOMI';
const GLOBALCOMIX = 'GLOBALCOMIX';
const MANGAPLUS = 'MANGAPLUS';

export default function AppLinks({ page }) {
  const webtoonLinksObj = config.webtoonLinks;
  const webtoonLinkValues = new Set(Object.values(webtoonLinksObj));
  
  if (webtoonLinkValues.size === 1 && webtoonLinkValues.has('')) {
    return (<></>);
  }

  switch(page) {
    case 'home':
      return (
        <div className="flex flex-wrap justify-center gap-6 py-2">
          <AppList webtoonLinksObj={webtoonLinksObj} />
        </div>
      );
    case 'footer':
      return (
        <AppList webtoonLinksObj={webtoonLinksObj} />
      )
    default:
      return null;
  }
}

const AppList = ({ webtoonLinksObj }) => {
  const webtoonUrl = webtoonLinksObj[WEBTOON];
  const tapasUrl = webtoonLinksObj[TAPAS];
  const inkverseUrl = webtoonLinksObj[INKVERSE];
  const namicomiUrl = webtoonLinksObj[NAMICOMI];
  const globalcomixUrl = webtoonLinksObj[GLOBALCOMIX];
  const mangaplusUrl = webtoonLinksObj[MANGAPLUS];
  return (
    <>
      {webtoonUrl && (
        <ComicPlatform type={WEBTOON} url={webtoonUrl} />
      )}
      {tapasUrl && (
        <ComicPlatform type={TAPAS} url={tapasUrl} />
      )}
      {inkverseUrl && (
        <ComicPlatform type={INKVERSE} url={inkverseUrl}/>
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
    </>
  );
}

const ComicPlatform = ({ type, url }) => {
  return (
    <a href={url} target='_blank' rel='noreferrer noopener' className={`flex justify-center items-center h-14`}>
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
      return 'https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/namicomi-icon-2.png?v=1709347508443';
    case GLOBALCOMIX:
      return 'https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/globalcomix-icon-2.png?v=1709347230886';
    case MANGAPLUS:
      return 'https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/manga-plus-logo.png?v=1709250206178';
    default:
      return null;
  }
}