import { productionUrl } from './global-vars';

/**
 * Load default values for Google Structured Data
 */
export function loadDefaultStructuredData() {
  return {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'Northwestern University Libraries | Digital Collections',
    description:
      "Digital Collections contains thousands of items from Northwestern University Libraries. While only a fraction of materials from the Libraries' collections are represented, the site is representative of the distinction and diversity of collections from the Northwestern Government and Geographic Information collection, Herskovits Library of African Studies, Music Library, McCormick Library of Special Collections, Transportation Library, and University Archives.",
    url: 'https://digitalcollections.library.northwestern.edu',
    potentialAction: {
      '@type': 'SearchAction',
      target:
        'https://digitalcollections.library.northwestern.edu/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Load Structured Data for a Collection
 * @param {obj} collection Collection object returned from ElasticSearch
 * @param {string} pathname React router pathname
 */
export function loadCollectionStructuredData(collection, pathname) {
  let obj = {
    '@context': 'https://schema.org/',
    '@type': 'Collection',
    ...(collection.description && {
      description: collection.description.join(' ')
    }),
    name: collection.title.primary.join(', '),
    ...(collection.thumbnail_iiif_url && {
      thumbnail: collection.thumbnail_iiif_url
    }),
    url: `${productionUrl}${pathname}`
  };

  return obj;
}

/**
 * Load Structured Data for a Work
 * @param {obj} item Item object returned from ElasticSearch
 * @param {string} pathname React router pathname
 */
export function loadItemStructuredData(item, pathname) {
  let obj = {
    '@context': 'http://schema.org',
    '@type': 'ImageObject',
    ...(item.creator.length > 0 && { author: item.creator[0].label }),
    ...(item.subject && {
      contentLocation: item.subject
        .filter(x => x.role === 'geographical')
        .map(x => x.label)
        .join(', ')
    }),
    contentUrl: item.iiif_manifest,
    ...(item.contributor.length > 0 && {
      contributor: item.contributor.map(x => x.label).join(', ')
    }),
    ...(item.create_date && { dateCreated: item.create_date }),
    ...(item.modified_date && { dateModified: item.modified_date }),
    ...(item.description && { description: item.description.join(' ') }),
    ...(item.genre && { genre: item.genre.map(x => x.label).join(', ') }),

    image: item.representative_file_url,
    ...(item.subject && {
      keywords: item.subject.map(x => x.label).join(', ')
    }),
    ...(item.rights_statement && { license: item.rights_statement.label }),
    ...(item.physical_description && {
      material: item.physical_description.material.map(x => x.label).join(', ')
    }),
    name: item.title.primary.join(', '),
    thumbnail: item.thumbnail_url,
    url: `${productionUrl}${pathname}`
  };

  return obj;
}
