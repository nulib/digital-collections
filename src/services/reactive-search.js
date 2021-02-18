// ReactiveSearch component Ids
export const COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID = "collection-search";
export const GLOBAL_SEARCH_BAR_COMPONENT_ID = "q";
export const DATASEARCH_PLACEHOLDER =
  "Search by title, description, or wildcard (ie. Picass*)";

export const reactiveSearchFacets = [
  {
    elasticSearchField: "descriptiveMetadata.boxName.keyword",
    label: "Box Name",
    value: "BoxName",
  },
  {
    elasticSearchField: "descriptiveMetadata.boxNumber.keyword",
    label: "Box Number",
    value: "BoxNumber",
  },
  {
    elasticSearchField: "collection.title.keyword",
    label: "Collection",
    value: "Collection",
  },
  {
    elasticSearchField: "descriptiveMetadata.contributor.displayFacet",
    label: "Contributor",
    value: "Contributor",
  },
  {
    elasticSearchField: "descriptiveMetadata.creator.displayFacet",
    label: "Creator",
    value: "Creator",
  },
  {
    elasticSearchField: "descriptiveMetadata.folderName.keyword",
    label: "Folder Name",
    value: "FolderName",
  },
  {
    elasticSearchField: "descriptiveMetadata.folderNumber.keyword",
    label: "Folder Number",
    value: "FolderNumber",
  },
  {
    elasticSearchField: "descriptiveMetadata.genre.displayFacet",
    label: "Genre",
    value: "Genre",
  },
  {
    elasticSearchField: "descriptiveMetadata.language.displayFacet",
    label: "Language",
    value: "Language",
  },
  {
    elasticSearchField: "administrativeMetadata.libraryUnit.label.keyword",
    label: "Library Department",
    value: "LibraryDepartment",
  },
  {
    elasticSearchField: "descriptiveMetadata.location.displayFacet",
    label: "Location",
    value: "Location",
  },
  {
    elasticSearchField: "descriptiveMetadata.rightsStatement.label.keyword",
    label: "Rights Statement",
    value: "RightsStatement",
  },
  {
    elasticSearchField: "descriptiveMetadata.series.keyword",
    label: "Series",
    value: "Series",
  },
  {
    elasticSearchField: "descriptiveMetadata.stylePeriod.displayFacet",
    label: "Style Period",
    value: "StylePeriod",
  },
  {
    elasticSearchField: "descriptiveMetadata.subject.term.label.keyword",
    label: "Subject",
    value: "Subject",
  },
  {
    elasticSearchField: "descriptiveMetadata.technique.displayFacet",
    label: "Technique",
    value: "Technique",
  },
  {
    elasticSearchField: "visibility.label.keyword",
    label: "Visibility",
    value: "Visibility",
  },
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
          "full_text",
          "legacy_identifier",
          "accession_number",
          "id",
        ],
        default_operator: "or",
      },
    },
  };
};

export const imagesOnlyDefaultQuery = () => {
  return {
    query: {
      match: {
        "model.name": "Image",
      },
    },
  };
};

export const collectionDefaultQuery = (collectionId) => {
  return {
    query: {
      bool: {
        must: { match: { "collection.id": collectionId } },
        must_not: { match: { "collection.top_level": false } },
      },
    },
  };
};
