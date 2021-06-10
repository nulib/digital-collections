// ReactiveSearch component Ids
export const COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID = "collection-search";
export const GLOBAL_SEARCH_BAR_COMPONENT_ID = "q";
export const DATASEARCH_PLACEHOLDER =
  "Search by title, description, or wildcard (ie. Picass*)";

const defaultListItemValues = {
  showSearch: false,
  sortBy: "asc",
  URLParams: true,
};

export const FACET_SENSORS = [
  {
    ...defaultListItemValues,
    componentId: "BoxName",
    dataField: "descriptiveMetadata.boxName.keyword",
    showSearch: true,
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
    componentId: "Collection",
    dataField: "collection.title.keyword",
    showSearch: true,
    title: "Collection",
  },
  {
    ...defaultListItemValues,
    componentId: "Contributor",
    dataField: "descriptiveMetadata.contributor.displayFacet",
    showSearch: true,
    title: "Contributor",
  },
  {
    ...defaultListItemValues,
    componentId: "Creator",
    dataField: "descriptiveMetadata.creator.displayFacet",
    showSearch: true,
    title: "Creator",
  },
  {
    ...defaultListItemValues,
    componentId: "FolderName",
    dataField: "descriptiveMetadata.folderName.keyword",
    showSearch: true,
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
    componentId: "Genre",
    dataField: "descriptiveMetadata.genre.displayFacet",
    showSearch: true,
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
    componentId: "LibraryDepartment",
    dataField: "administrativeMetadata.libraryUnit.label.keyword",
    title: "Library Department",
  },
  {
    ...defaultListItemValues,
    componentId: "Location",
    dataField: "descriptiveMetadata.location.displayFacet",
    showSearch: true,
    title: "Location",
  },
  {
    ...defaultListItemValues,
    componentId: "RightsStatement",
    dataField: "descriptiveMetadata.rightsStatement.label.keyword",
    title: "Rights Statement",
  },
  {
    ...defaultListItemValues,
    componentId: "Series",
    dataField: "descriptiveMetadata.series.keyword",
    showSearch: false,
    title: "Series",
  },
  {
    ...defaultListItemValues,
    componentId: "StylePeriod",
    dataField: "descriptiveMetadata.stylePeriod.displayFacet",
    showSearch: true,
    title: "Style Period",
  },
  {
    ...defaultListItemValues,
    componentId: "Subject",
    dataField: "descriptiveMetadata.subject.displayFacet",
    showSearch: true,
    title: "Subject",
  },
  {
    ...defaultListItemValues,
    componentId: "Technique",
    dataField: "descriptiveMetadata.technique.displayFacet",
    showSearch: true,
    title: "Technique",
  },
  {
    ...defaultListItemValues,
    componentId: "Visibility",
    dataField: "visibility.label.keyword",
    title: "Visibility",
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
