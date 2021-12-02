import React from "react";
import { ReactiveList } from "@appbaseio/reactivesearch";
import LoadingSpinner from "../UI/LoadingSpinner";
import PhotoBox from "components/UI/PhotoBox";
import { buildImageUrl, getESTitle } from "services/elasticsearch-parser";
import { IMAGE_MODEL } from "services/global-vars";
import {
  GLOBAL_SEARCH_BAR_COMPONENT_ID,
  worksOnlyDefaultQuery,
  FACET_SENSORS_RIGHTS_USAGE,
  FACET_SENSORS_LOCATION,
  FACET_SENSORS_CREATOR,
  FACET_SENSORS_DESCRIPTIVE,
} from "services/reactive-search";

const allFilters = [
  GLOBAL_SEARCH_BAR_COMPONENT_ID,
  ...FACET_SENSORS_RIGHTS_USAGE.map((f) => f.componentId),
  ...FACET_SENSORS_LOCATION.map((f) => f.componentId),
  ...FACET_SENSORS_CREATOR.map((f) => f.componentId),
  ...FACET_SENSORS_DESCRIPTIVE.map((f) => f.componentId),
];

function WrappedReactiveList() {
  const renderItem = (res) => {
    return (
      <PhotoBox
        key={res._id}
        id={res._id}
        imageUrl={buildImageUrl(res, IMAGE_MODEL)}
        label={getESTitle(res)}
        modelName={res.model.name}
        workType={res.workType.id}
      />
    );
  };

  return (
    <ReactiveList
      componentId="results"
      dataField="title.primary.keyword"
      defaultQuery={() => worksOnlyDefaultQuery}
      innerClass={{
        list: "rs-result-list photo-grid four-grid",
        pagination: "rs-pagination",
        resultsInfo: "rs-results-info",
      }}
      includeFields={[
        "id",
        "descriptiveMetadata.title",
        "model",
        "representativeFileSet.url",
        "title",
        "workType",
      ]}
      loader={<LoadingSpinner loading={true} />}
      react={{
        and: allFilters,
      }}
      renderItem={renderItem}
      pagination={true}
      paginationAt="bottom"
      pages={10}
      showResultStats={true}
      size={24}
      URLParams={true}
    />
  );
}

export default React.memo(WrappedReactiveList);
