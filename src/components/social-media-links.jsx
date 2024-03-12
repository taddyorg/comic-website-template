import * as React from "react";
import { getSafeFullLink, allSocialMediaLinkTypesSet, getSocialMediaLinkImageUrl } from "../utils";

export default function SocialMediaLinks({ links }) {  
  const supportedLinks = links.filter(link => allSocialMediaLinkTypesSet.has(link.type))
  if (!supportedLinks || supportedLinks.length === 0) {
    return (<></>);
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 pt-2">
      {supportedLinks.map((link) => (
        <Platform
          key={link.base_url + link.value}
          type={link.type} 
          value={link.value} 
        />
      ))}
    </div>
  );
}

const Platform = ({ type, value }) => {
  return (
    <a href={getSafeFullLink(type, value)} target='_blank' rel='noreferrer noopener' className={`flex justify-center items-center h-8`}>
      <img
        src={getSocialMediaLinkImageUrl(type)}
        alt={`link to ${type}`}
        className="object-contain object-center h-full"
      />
    </a>
  );
}