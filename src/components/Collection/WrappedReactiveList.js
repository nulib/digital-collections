import React from "react";
import { ReactiveList } from "@appbaseio/reactivesearch";
import PhotoBox from "components/UI/PhotoBox";
import {
  COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
  FACET_SENSORS_RIGHTS_USAGE,
  FACET_SENSORS_LOCATION,
  FACET_SENSORS_CREATOR,
  FACET_SENSORS_DESCRIPTIVE,
  collectionDefaultQuery,
} from "services/reactive-search";
import { getESImagePath } from "services/elasticsearch-parser";
import LoadingSpinner from "components/UI/LoadingSpinner";

const allFilters = [
  COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
  ...FACET_SENSORS_RIGHTS_USAGE.map((facet) => facet.componentId),
  ...FACET_SENSORS_LOCATION.map((facet) => facet.componentId),
  ...FACET_SENSORS_CREATOR.map((facet) => facet.componentId),
  ...FACET_SENSORS_DESCRIPTIVE.map((facet) => facet.componentId),
];

const sortOptions = [
  {
    dataField: "modifiedDate",
    label: "Sort By Modified Date",
    sortBy: "desc",
  },
  {
    dataField: "_score",
    label: "Sort By Relevancy",
    sortBy: "desc",
  },
  {
    dataField: "descriptiveMetadata.title.keyword",
    sortBy: "asc",
    label: "Sort By Title",
  },
];

const WrappedReactiveList = ({ collectionId }) => {
  function renderItem(res) {
    return (
      <PhotoBox
        key={res.id}
        id={res.id}
        imageUrl={getESImagePath(res)}
        label={res.descriptiveMetadata.title}
        modelName={res.model.name}
        workType={res.workType?.id}
      />
    );
  }

  return (
    <ReactiveList
      componentId="collection-items-results"
      dataField="descriptiveMetadata.title.keyword"
      react={{
        and: [...allFilters],
      }}
      defaultQuery={() => collectionDefaultQuery(collectionId)}
      defaultSortOption={"Sort By Relevancy"}
      includeFields={[
        "id",
        "descriptiveMetadata.title",
        "model.name",
        "representativeFileSet.url",
        "workType",
      ]}
      loader={<LoadingSpinner loading={true} />}
      size={10}
      //pages={10}
      // pagination={true}
      // paginationAt="bottom"
      renderItem={renderItem}
      innerClass={{
        list: "rs-result-list photo-grid four-grid",
        pagination: "rs-pagination",
        resultsInfo: "rs-results-info",
      }}
      URLParams={true}
      sortOptions={sortOptions}
    />
  );
};

export default React.memo(WrappedReactiveList);
