export const DONUT_URL =
  process.env.REACT_APP_DONUT_URL || 'http://devbox.library.northwestern.edu/';

export const ELASTICSEARCH_PROXY_BASE =
  process.env.REACT_APP_ELASTICSEARCH_PROXY_BASE || 'http://localhost:3334';

export const SOLR_BASE =
  process.env.REACT_APP_SOLR_BASE || '/solr/development-core/select?';

export const IIIF_LOGIN_URL = process.env.REACT_APP_IIIF_LOGIN_URL;

export const IIIF_SMALL_ITEM_REGION =
  process.env.REACT_APP_IIIF_SMALL_ITEM_REGION ||
  '/pct:10,10,60,60/175,175/0/default.jpg';

export const IIIF_MEDIUM_ITEM_REGION =
  process.env.REACT_APP_IIIF_MEDIUM_ITEM_REGION ||
  '/pct:10,10,60,60/265,265/0/default.jpg';

export const IIIF_PHOTO_FEATURE_REGION =
  process.env.REACT_APP_IIIF_PHOTO_FEATURE_REGION ||
  '/pct:10,10,60,60/480,350/0/default.jpg';

export const IIIF_FEATURE_BOX_REGION =
  process.env.REACT_APP_IIIF_FEATURE_BOX_REGION ||
  '/pct:10,10,60,38.4/345,/0/default.jpg';

export const IIIF_LARGE_FEATURE_REGION =
  process.env.REACT_APP_IIIF_LARGE_FEATURE_REGION || '/full/300,/0/default.jpg';

export const IIIF_LARGE_IMAGE_REGION =
  process.env.IIIF_LARGE_IMAGE_REGION || '/full/800,/0/default.jpg';

export const IMAGE_MODEL = 'Image';
export const COLLECTION_MODEL = 'Collection';

export const HONEYBADGER_API_KEY = process.env.REACT_APP_HONEYBADGER_API_KEY;
export const HONEYBADGER_ENV = process.env.REACT_APP_HONEYBADGER_ENV;

// This array holds Keyword Metadata values set in Donut, which are used to group Collections
// on the Homepage
export const HOMEPAGE_COLLECTION_GROUP_KEYWORDS = [
  'Posters',
  'Photography',
  'Evanston'
];

// Mobile breakpoint
export const MOBILE_BREAKPOINT = 768;
