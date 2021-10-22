// ReactiveSearch component Ids
export const COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID = "collection-search";
export const GLOBAL_SEARCH_BAR_COMPONENT_ID = "q";
export const DATASEARCH_PLACEHOLDER =
  "Search by title, description, or wildcard (ie. Picass*)";

const defaultListItemValues = {
  showSearch: true,
  sortBy: "asc",
  URLParams: true,
};

export const FACET_SENSORS_RIGHTS_USAGE = [
  {
    ...defaultListItemValues,
    componentId: "RightsStatement",
    dataField: "descriptiveMetadata.rightsStatement.label.keyword",
    title: "Rights Statement",
  },

  {
    ...defaultListItemValues,
    componentId: "Visibility",
    dataField: "visibility.label.keyword",
    showSearch: false,
    title: "Visibility",
  },
];

export const FACET_SENSORS_CREATOR = [
  {
    ...defaultListItemValues,
    componentId: "Contributor",
    dataField: "descriptiveMetadata.contributor.displayFacet",
    title: "Contributor",
  },
  {
    ...defaultListItemValues,
    componentId: "Creator",
    dataField: "descriptiveMetadata.creator.displayFacet",
    title: "Creator",
  },
];

export const FACET_SENSORS_DESCRIPTIVE = [
  {
    ...defaultListItemValues,
    componentId: "Genre",
    dataField: "descriptiveMetadata.genre.displayFacet",
    title: "Genre",
  },
  {
    ...defaultListItemValues,
    componentId: "Language",
    dataField: "descriptiveMetadata.language.displayFacet",
    title: "Language",
  },
  {
    ...defaultListItemValues,
    componentId: "Location",
    dataField: "descriptiveMetadata.location.displayFacet",
    title: "Location",
  },
  {
    ...defaultListItemValues,
    componentId: "StylePeriod",
    dataField: "descriptiveMetadata.stylePeriod.displayFacet",
    title: "Style Period",
  },
  {
    ...defaultListItemValues,
    componentId: "Subject",
    dataField: "descriptiveMetadata.subject.term.label.keyword",
    title: "Subject",
  },
  {
    ...defaultListItemValues,
    componentId: "Technique",
    dataField: "descriptiveMetadata.technique.displayFacet",
    title: "Technique",
  },
  {
    ...defaultListItemValues,
    componentId: "WorkType",
    dataField: "workType.label.keyword",
    title: "Work Type",
  },
];

export const FACET_SENSORS_LOCATION = [
  {
    ...defaultListItemValues,
    componentId: "LibraryDepartment",
    dataField: "administrativeMetadata.libraryUnit.label.keyword",
    title: "Library Department",
  },
  {
    ...defaultListItemValues,
    componentId: "Collection",
    dataField: "collection.title.keyword",
    title: "Collection",
  },
  {
    ...defaultListItemValues,
    componentId: "BoxName",
    dataField: "descriptiveMetadata.boxName.keyword",
    title: "Box Name",
  },
  {
    ...defaultListItemValues,
    componentId: "BoxNumber",
    dataField: "descriptiveMetadata.boxNumber.keyword",
    showSearch: false,
    title: "Box Number",
  },
  {
    ...defaultListItemValues,
    componentId: "FolderName",
    dataField: "descriptiveMetadata.folderName.keyword",
    title: "Folder Name",
  },
  {
    ...defaultListItemValues,
    componentId: "FolderNumber",
    dataField: "descriptiveMetadata.folderNumber.keyword",
    showSearch: false,
    title: "Folder Number",
  },

  {
    ...defaultListItemValues,
    componentId: "Series",
    dataField: "descriptiveMetadata.series.keyword",
    title: "Series",
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

export const worksOnlyDefaultQuery = () => {
  return {
    query: {
      match: {
        "model.name": "Work",
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
