import * as React from "react";
import { Helmet } from 'react-helmet-async';
import config from "../../data";

const Seo = ({ path, title, description, image }) => {
  const seoUrl = config.customUrl
    ?  config.customUrl + path
    : window.location.href;

  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={seoUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={seoUrl} />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:image"
        content={image}
      />

      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
};

export default Seo;
