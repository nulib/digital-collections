import { productionUrl } from "./global-vars";

/**
 * Load default values for Google Structured Data
 */
export function loadDefaultStructuredData() {
  return {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "Northwestern University Libraries | Digital Collections",
    description:
      "Digital Collections contains thousands of items from Northwestern University Libraries. While only a fraction of materials from the Libraries' collections are represented, the site is representative of the distinction and diversity of collections from the Northwestern Government and Geographic Information collection, Herskovits Library of African Studies, Music Library, McCormick Library of Special Collections, Transportation Library, and University Archives.",
    url: "https://digitalcollections.library.northwestern.edu",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://digitalcollections.library.northwestern.edu/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Load Structured Data for a Collection
 * @param {obj} collection Collection object returned from ElasticSearch
 * @param {string} pathname React router pathname
 */
export function loadCollectionStructuredData(collection, pathname) {
  let obj = {
    "@context": "https://schema.org/",
    "@type": "Collection",
    name: collection.title,
    url: `${productionUrl}${pathname}`,
    ...(collection.description && { description: collection.description }),
    thumbnail: collection.representativeImage?.url,
  };

  return obj;
}

/**
 * Load Structured Data for a Work
 * @param {obj} item Item object returned from ElasticSearch
 * @param {string} pathname React router pathname
 */

export function loadItemStructuredData(item, pathname) {
  const {
    descriptiveMetadata: {
      contributor,
      creator,
      dateCreated,
      description,
      genre,
      keywords,
      physicalDescriptionMaterial,
      rightsStatement,
      subject,
      title,
    },
    iiifManifest,
  } = item;
  const itemImage = item.representativeFileSet?.url;

  let obj = {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    image: item.representativeFileSet?.url,
    contentUrl: iiifManifest,
    ...(title && { name: title }),
    thumbnail: itemImage,
    url: `${productionUrl}${pathname}`,
    ...(subject.length > 0 && { about: subject?.map((x) => x.term?.label) }),
    ...(creator.length > 0 && {
      author: item.descriptiveMetadata.creator.map((x) => x.term?.label),
    }),
    ...(subject.length > 0 && {
      contentLocation: item.descriptiveMetadata.subject
        ?.filter((x) => x.role?.id === "GEOGRAPHICAL")
        .map((x) => accountForCommas(x.role?.label))
        .join(", "),
    }),
    ...(contributor.length > 0 && {
      contributor: contributor
        .map((x) => accountForCommas(x.term?.label))
        .join(", "),
    }),
    ...(dateCreated.length > 0 && {
      dateCreated: dateCreated.map((x) => x.humanized),
    }),
    dateModified: item.modifiedDate,
    ...(description.length > 0 && {
      description: description?.join(" "),
    }),
    ...(genre.length > 0 && {
      genre: genre.map((x) => x.term?.label),
    }),
    ...(keywords.length > 0 && {
      keywords: keywords?.map((x) => accountForCommas(x)).join(", "),
    }),
    ...(rightsStatement && {
      license: rightsStatement?.id,
    }),
    ...(physicalDescriptionMaterial.length > 0 && {
      material: physicalDescriptionMaterial
        .map((x) => accountForCommas(x))
        .join(", "),
    }),
  };

  return obj;
}

/**
 * Helper function to wrap any values which include a comman, with double quotes to retain context
 * @param {string} label label value which could be something like "a label value", or "Smith, John"
 */
function accountForCommas(label) {
  if (!label) {
    return "";
  }
  return label.indexOf(",") > -1 ? `"${label}"` : label;
}
