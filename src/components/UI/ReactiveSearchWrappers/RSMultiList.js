import React from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";
import PropTypes from "prop-types";

// Css class name helper
const multiListInnerClass = {
  title: "rs-facet-title",
  list: "rs-facet-list",
  label: "rs-facet-label",
  icon: "rs-facet-icon"
};

const RSMultiList = props => {
  const { allFilters, defaultValue = [], defaultQuery, facet, title } = props;
  const facetNameNoSpaces = facet.name.replace(/\s+/g, "");
  const filterList = allFilters.filter(entry => {
    return entry !== facetNameNoSpaces;
  });

  return (
    <MultiDropdownList
      componentId={facetNameNoSpaces}
      dataField={facet.field}
      defaultValue={defaultValue}
      defaultQuery={defaultQuery}
      innerClass={multiListInnerClass}
      missingLabel="None"
      react={{
        and: [...filterList]
      }}
      showMissing={true}
      showSearch={false}
      size={250}
      //sortBy={'asc'}
      title={title}
      URLParams={true}
    />
  );
};

RSMultiList.propTypes = {
  allFilters: PropTypes.array,
  defaultValue: PropTypes.array,
  defaultQuery: PropTypes.func,
  facet: PropTypes.object,
  title: PropTypes.string
};

export default RSMultiList;
