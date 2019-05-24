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
    name: collection.title.primary.join(', '),
    url: `${productionUrl}${pathname}`,
    ...(collection.description && {
      description: collection.description.join(' ')
    }),
    ...(collection.thumbnail_iiif_url && {
      thumbnail: collection.thumbnail_iiif_url
    })
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
    image: item.representative_file_url,
    contentUrl: item.iiif_manifest,
    name: item.title.primary.join(', '),
    thumbnail: item.thumbnail_url,
    url: `${productionUrl}${pathname}`,
    ...(item.subject && {
      about: item.subject
        // If there is a comma in the value, wrap value in double quotes
        .map(x => accountForCommas(x.label))
        .join(', ')
    }),
    ...(item.creator.length > 0 && { author: item.creator[0].label }),
    ...(item.subject && {
      contentLocation: item.subject
        .filter(x => x.role === 'geographical')
        .map(x => accountForCommas(x.label))
        .join(', ')
    }),

    ...(item.contributor.length > 0 && {
      contributor: item.contributor
        .map(x => accountForCommas(x.label))
        .join(', ')
    }),
    ...(item.create_date && { dateCreated: item.create_date }),
    ...(item.modified_date && { dateModified: item.modified_date }),
    ...(item.description && { description: item.description.join(' ') }),
    ...(item.genre && {
      genre: item.genre.map(x => accountForCommas(x.label)).join(', ')
    }),

    ...(item.keyword && {
      keywords: item.keyword.map(x => accountForCommas(x)).join(', ')
    }),
    ...(item.rights_statement && { license: item.rights_statement.label }),
    ...(item.physical_description && {
      material: item.physical_description.material
        .map(x => accountForCommas(x.label))
        .join(', ')
    })
  };

  return obj;
}

/**
 * Helper function to wrap any values which include a comman, with double quotes to retain context
 * @param {string} label label value which could be something like "a label value", or "Smith, John"
 */
function accountForCommas(label) {
  if (!label) {
    return '';
  }
  return label.indexOf(',') > -1 ? `"${label}"` : label;
}
