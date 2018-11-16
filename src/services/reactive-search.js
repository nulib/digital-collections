// DataSearch (search bar) component id
export const COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID = 'collection-search';
export const GLOBAL_SEARCH_BAR_COMPONENT_ID = 'search';

// These are common facets used for an Image in ReactivSearch components
export const imageFacets = [
  { name: 'Collection', field: 'collection.title.keyword' },
  { name: 'Contributor', field: 'contributor.label.keyword' },
  { name: 'Creator', field: 'creator.label.keyword' },
  { name: 'Genre', field: 'genre.label.keyword' },
  { name: 'Language', field: 'language.label.keyword' },
  { name: 'Library Unit', field: 'admin_set.title.keyword' },
  { name: 'Rights Statement', field: 'rights_statement.label.keyword' },
  { name: 'Style Period', field: 'style_period.label.keyword' },
  { name: 'Subject', field: 'subject.label.keyword' },
  { name: 'Technique', field: 'technique.label.keyword' },
  { name: 'Visibility', field: 'visibility.keyword' }
];

// These are common filters used for an Image in ReactivSearch components
export const imageFilters = [
  'Collection',
  'Contributor',
  'Creator',
  'Date',
  'Genre',
  'Language',
  'LibraryUnit',
  'RightsStatement',
  'StylePeriod',
  'Subject',
  'Technique',
  'Visibility'
];
