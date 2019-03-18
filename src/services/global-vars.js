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
  '/square/265,265/0/default.jpg';

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

// Production ids (needed for hardcoding hero images on homepage and collections on the About page)
export const productionIds = {
  berkeley: '18ec4c6b-192a-4ab8-9903-ea0f393c35f7',
  bursarsOffice: 'c2a8a3e0-af0f-4e04-8721-91698fc14574',
  fava: 'c373ecd2-2c45-45f2-9f9e-52dc244870bd',
  hamidNaficy: '4ed2338d-c715-4a86-8ac6-6b4030a42be5',
  kateAndLou: 'c20483d1-d2d5-459c-aa1b-a605375ac906',
  jimmyJohnson: 'db98ed75-1810-46d3-a838-176c0685cd01',
  ramonCasas: 'ba35820a-525a-4cfa-8f23-4891c9f798c4',
  vernonMcKay: '1d849df1-eb32-43f4-b7b9-e435cff18f7c',
  wpa: 'c708f479-db91-4585-8267-874c5e7da73f',
  wwII: 'faf4f60e-78e0-4fbf-96ce-4ca8b4df597a'
};

// <title> tag ending
export const titleTagEnd =
  'Digital Collections - Libraries - Northwestern University';

// Google Tag Manager
export const GOOGLE_TAG_MANAGER_ID = 'GTM-MJ7RNV3';

// React-router route config values
export const ROUTES = {
  ABOUT: {
    title: 'About',
    path: '/about'
  },
  COLLECTION: {
    title: '',
    path: '/collections/:id'
  },
  COLLECTIONS_ALL: {
    title: 'All Collections',
    path: '/collections'
  },
  CONTACT: {
    title: 'Contact Us',
    path: '/contact-us'
  },
  HOME: {
    title: 'Home',
    path: '/'
  },
  ITEM_DETAIL: {
    title: '',
    path: '/items/:id'
  },
  SEARCH: {
    title: 'Search',
    path: '/search/'
  }
};
