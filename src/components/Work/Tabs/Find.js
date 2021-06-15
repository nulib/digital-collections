import React from "react";
import PropTypes from "prop-types";
import MetadataDisplay from "components/Work/MetadataDisplay";
import { getPrimoLink } from "services/helpers";
import {
  FACET_SENSORS_RIGHTS_USAGE,
  FACET_SENSORS_LOCATION,
  FACET_SENSORS_CREATOR,
  FACET_SENSORS_DESCRIPTIVE,
} from "services/reactive-search";
import WorkTabsMoreInformation from "components/Work/Tabs/MoreInformation";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const tabContent = css`
  padding: 0 1rem;
`;

const TabsFind = ({ item }) => {
  if (!item) return;
  const { accessionNumber, collection, descriptiveMetadata } = item;
  const {
    boxName = "",
    boxNumber = "",
    citation = "",
    catalogKey = "",
    folderName = "",
    folderNumber = "",
  } = descriptiveMetadata;
  const allFacets = [
    ...FACET_SENSORS_RIGHTS_USAGE,
    ...FACET_SENSORS_LOCATION,
    ...FACET_SENSORS_CREATOR,
    ...FACET_SENSORS_DESCRIPTIVE,
  ];

  const [findItems, setFindItems] = React.useState([
    { label: "Accession", value: accessionNumber },
    { label: "Box Name", value: boxName },
    {
      label: "Box Number",
      facet: allFacets.find((facet) => facet.componentId === "BoxNumber"),
      value: boxNumber,
    },
    {
      label: "NUsearch",
      value: catalogKey,
      externalUrl: getPrimoLink(catalogKey),
    },
    { label: "Citation", value: citation },
    { label: "Folder Name", value: folderName },
    {
      label: "Folder Number",
      facet: allFacets.find((facet) => facet.componentId === "FolderNumber"),
      value: folderNumber,
    },
  ]);

  return (
    <div data-testid="tab-content-find" css={tabContent}>
      {findItems.map((findItem, i) => (
        <MetadataDisplay
          key={findItem.label}
          title={findItem.label}
          items={findItem.value}
          facet={findItem.facet}
          externalUrl={findItem.externalUrl}
          collection={item.collection[0]}
          boxNumber={boxNumber}
        />
      ))}
      <WorkTabsMoreInformation collection={item.collection} />
    </div>
  );
};

TabsFind.propTypes = {
  item: PropTypes.object,
};

export default TabsFind;
