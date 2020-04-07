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
    elasticSearchField: "series.keyword",
    label: "Series",
    value: "Series"
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

// For now, this is the ReactiveSearch DataSearch customQuery function,
// which is used to do phrase matching with our current ElasticSearch
// indexing configuration
export const simpleQueryStringQuery = (value = "*") => {
  value = value.trim();

  // Add fuzziness and substring matches to the query value
  let queryValue = value !== "*" ? `${value || "*"}~1 | ${value}*` : value;

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
