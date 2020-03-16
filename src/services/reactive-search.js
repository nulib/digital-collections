// ReactiveSearch component Ids
export const COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID = "collection-search";
export const GLOBAL_SEARCH_BAR_COMPONENT_ID = "q";
export const DATASEARCH_PLACEHOLDER =
  "Search by title, description, or wildcard (ie. Picass*)";

export const reactiveSearchFacets = [
  {
    elasticSearchField: "box.number.keyword",
    label: "Box",
    value: "Box"
  },
  {
    elasticSearchField: "collection.title.keyword",
    label: "Collection",
    value: "Collection"
  },
  {
    elasticSearchField: "contributor.label.keyword",
    label: "Contributor",
    value: "Contributor"
  },
  {
    elasticSearchField: "creator.label.keyword",
    label: "Creator",
    value: "Creator"
  },
  {
    elasticSearchField: "folder.number.keyword",
    label: "Folder",
    value: "Folder"
  },
  {
    elasticSearchField: "genre.label.keyword",
    label: "Genre",
    value: "Genre"
  },
  {
    elasticSearchField: "language.label.keyword",
    label: "Language",
    value: "Language"
  },
  {
    elasticSearchField: "admin_set.title.keyword",
    label: "Library Department",
    value: "LibraryDepartment"
  },
  {
    elasticSearchField: "based_near.label.keyword",
    label: "Location",
    value: "Location"
  },
  {
    elasticSearchField: "rights_statement.label.keyword",
    label: "Rights Statement",
    value: "RightsStatement"
  },
  {
    elasticSearchField: "style_period.label.keyword",
    label: "Style Period",
    value: "StylePeriod"
  },
  {
    elasticSearchField: "subject.label.keyword",
    label: "Subject",
    value: "Subject"
  },
  {
    elasticSearchField: "technique.label.keyword",
    label: "Technique",
    value: "Technique"
  },
  {
    elasticSearchField: "visibility.keyword",
    label: "Visibility",
    value: "Visibility"
  }
];

// TODO: Delete this before commit
export const facetLabels = {
  BOX: "Box",
  COLLECTION: "Collection",
  CONTRIBUTOR: "Contributor",
  CREATOR: "Creator",
  FOLDER: "Folder",
  GENRE: "Genre",
  LANGUAGE: "Language",
  LIBRARY_DEPARTMENT: "Library Department",
  LOCATION: "Location",
  RIGHTS_STATEMENT: "Rights Statement",
  STYLE_PERIOD: "Style Period",
  SUBJECT: "Subject",
  TECHNIQUE: "Technique",
  VISIBILITY: "Visibility"
};

// TODO: Delete this before commit
// These are common facets used for an Image in ReactivSearch components
export const imageFacets = [
  { name: facetLabels.BOX, field: "box.number.keyword" },
  { name: facetLabels.COLLECTION, field: "collection.title.keyword" },
  { name: facetLabels.CONTRIBUTOR, field: "contributor.label.keyword" },
  { name: facetLabels.CREATOR, field: "creator.label.keyword" },
  { name: facetLabels.FOLDER, field: "folder.number.keyword" },
  { name: facetLabels.GENRE, field: "genre.label.keyword" },
  { name: facetLabels.LANGUAGE, field: "language.label.keyword" },
  { name: facetLabels.LIBRARY_DEPARTMENT, field: "admin_set.title.keyword" },
  { name: facetLabels.LOCATION, field: "based_near.label.keyword" },
  {
    name: facetLabels.RIGHTS_STATEMENT,
    field: "rights_statement.label.keyword"
  },
  { name: facetLabels.STYLE_PERIOD, field: "style_period.label.keyword" },
  { name: facetLabels.SUBJECT, field: "subject.label.keyword" },
  { name: facetLabels.TECHNIQUE, field: "technique.label.keyword" },
  { name: facetLabels.VISIBILITY, field: "visibility.keyword" }
];

// TODO: Delete this before commit
// These are common filters used for an Image in ReactivSearch components
export const imageFilters = [
  facetLabels.BOX,
  facetLabels.COLLECTION,
  facetLabels.CONTRIBUTOR,
  facetLabels.CREATOR,
  facetLabels.FOLDER,
  facetLabels.GENRE,
  facetLabels.LANGUAGE,
  facetLabels.LOCATION,
  "LibraryDepartment",
  "RightsStatement",
  "StylePeriod",
  facetLabels.SUBJECT,
  facetLabels.TECHNIQUE,
  facetLabels.VISIBILITY
];

// For now, this is the ReactiveSearch DataSearch customQuery function,
// which is used to do phrase matching with our current ElasticSearch
// indexing configuration
export const simpleQueryStringQuery = (value = "*") => {
  // Add fuzziness and substring matches to the query value
  let queryValue = value !== "*" ? `${value}~1 | ${value}*` : value;

  return {
    query: {
      simple_query_string: {
        query: queryValue,
        fields: [
          "all_titles^5",
          "description^2",
          "all_subjects^2",
          "full_text"
        ],
        default_operator: "or"
      }
    }
  };
};

export const imagesOnlyDefaultQuery = () => {
  return {
    query: {
      match: {
        "model.name": "Image"
      }
    }
  };
};

export const collectionDefaultQuery = collectionId => {
  return {
    query: {
      bool: {
        must: { match: { "collection.id": collectionId } },
        must_not: { match: { "collection.top_level": false } }
      }
    }
  };
};
