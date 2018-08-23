export const DONUT_URL =
  process.env.REACT_APP_DONUT_URL || 'http://devbox.library.northwestern.edu/';
export const ELASTICSEARCH_PROXY_BASE =
  process.env.REACT_APP_ELASTICSEARCH_PROXY_BASE || 'http://localhost:3334';
export const SOLR_BASE =
  process.env.REACT_APP_SOLR_BASE || '/solr/development-core/select?';
export const IIIF_SMALL_ITEM_REGION =
  process.env.REACT_APP_IIIF_SMALL_ITEM_REGION ||
  '/pct:10,10,60,60/175,175/0/default.jpg';
export const IIIF_MEDIUM_ITEM_REGION =
  process.env.REACT_APP_IIIF_MEDIUM_ITEM_REGION ||
  '/pct:10,10,60,60/256,256/0/default.jpg';
export const IMAGE_MODEL = 'Image';
export const COLLECTION_MODEL = 'Collection';
