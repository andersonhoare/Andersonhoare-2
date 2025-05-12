import React from 'react';
import Helmet from 'react-helmet';

export default ({ title, description, ogTitle, ogType, ogUrl, ogImage }) => (
  <Helmet>
    <title>{`${title} - Anderson Hoare`}</title>
    <meta name="description" content={description} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@anderson_hoare" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta
      name="twitter:image"
      content="https://images.ctfassets.net/3yxhsx9gms6e/7KLlnAcMuse806wEUcOeGS/582f0dea77a01cee24acb367824974cb/RF4A4093b.jpg?fm=jpg&fl=progressive&q=50"
    />
    {ogTitle ? <meta property="og:title" content={ogTitle} /> : null}
    {ogType ? <meta property="og:type" content={ogType} /> : null}
    {ogUrl ? <meta property="og:url" content={ogUrl} /> : null}
    {ogImage ? <meta property="og:image" content={ogImage} /> : null}
    <link
      rel="canonical"
      href={`https://andersonhoare.co.uk${window.location.pathname}`}
    />
  </Helmet>
);
