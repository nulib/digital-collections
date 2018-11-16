// DataSearch (search bar) component id
export const COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID = 'collection-search';
export const GLOBAL_SEARCH_BAR_COMPONENT_ID = 'search';

export const facetValues = {
  COLLECTION: 'Collection',
  CONTRIBUTOR: 'Contributor',
  CREATOR: 'Creator',
  GENRE: 'Genre',
  LANGUAGE: 'Language',
  LIBRARY_UNIT: 'Library Unit',
  RIGHTS_STATEMENT: 'Rights Statement',
  STYLE_PERIOD: 'Style Period',
  SUBJECT: 'Subject',
  TECHNIQUE: 'Technique',
  VISIBILITY: 'Visibility'
};

// These are common facets used for an Image in ReactivSearch components
export const imageFacets = [
  { name: facetValues.COLLECTION, field: 'collection.title.keyword' },
  { name: facetValues.CONTRIBUTOR, field: 'contributor.label.keyword' },
  { name: facetValues.CREATOR, field: 'creator.label.keyword' },
  { name: facetValues.GENRE, field: 'genre.label.keyword' },
  { name: facetValues.LANGUAGE, field: 'language.label.keyword' },
  { name: facetValues.LIBRARY_UNIT, field: 'admin_set.title.keyword' },
  {
    name: facetValues.RIGHTS_STATEMENT,
    field: 'rights_statement.label.keyword'
  },
  { name: facetValues.STYLE_PERIOD, field: 'style_period.label.keyword' },
  { name: facetValues.SUBJECT, field: 'subject.label.keyword' },
  { name: facetValues.TECHNIQUE, field: 'technique.label.keyword' },
  { name: facetValues.VISIBILITY, field: 'visibility.keyword' }
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
