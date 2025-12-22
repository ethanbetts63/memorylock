import React from 'react';

interface ArticleStructuredDataProps {
  title: string;
  authorName: string;
  publisherName: string;
  publisherLogoUrl: string;
  datePublished: string;
  dateModified: string;
  imageUrl: string;
  description: string;
  url: string;
}

export const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({
  title,
  authorName,
  publisherName,
  publisherLogoUrl,
  datePublished,
  dateModified,
  imageUrl,
  description,
  url,
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    description: description,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogoUrl,
      },
    },
    datePublished: datePublished,
    dateModified: dateModified,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
