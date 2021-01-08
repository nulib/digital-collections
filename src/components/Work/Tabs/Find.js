import React from "react";
import PropTypes from "prop-types";
import MetadataDisplay from "../MetadataDisplay";
import { getPrimoLink } from "../../../services/helpers";
import { ADMIN_SET_CONTACTS } from "../../../services/global-vars";
import { reactiveSearchFacets } from "../../../services/reactive-search";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const tabContent = css`
  padding: 0 1rem;
`;

const TabsFind = ({ item }) => {
  if (!item) return;
  const { descriptiveMetadata } = item;
  const {
    boxName = "",
    boxNumber = "",
    citation = "",
    catalogKey = "",
    folderName = "",
    folderNumber = "",
  } = descriptiveMetadata;
  const { accessionNumber = "", call_number: callNumber = "" } = item;

  const getAdminSetEmail = () => {
    let email = "";
    try {
      let results = ADMIN_SET_CONTACTS.filter(
        (obj) => obj.id === item.adminSet.id
      );
      email = results[0].email;
    } catch (e) {}

    if (!email) {
      return;
    }

    return {
      label: "More Information",
      value: `For more information on this item or collection, please contact ${email}`,
    };
  };

  const findItems = [
    { label: "Accession", value: accessionNumber },
    { label: "Box Name", value: boxName },
    {
      label: "Box Number",
      //    facet: reactiveSearchFacets.find(facet => facet.value === "Box"),
      value: boxNumber,
    },
    { label: "Call Number", value: callNumber },
    {
      label: "NUsearch",
      value: catalogKey,
      externalUrl: getPrimoLink(catalogKey),
    },
    { label: "Citation", value: citation },
    { label: "Folder Name", value: folderName },
    {
      label: "Folder Number",
      //  facet: reactiveSearchFacets.find(facet => facet.value === "Folder"),
      value: folderNumber,
    },
  ];

  const adminSetEmail = getAdminSetEmail();
  if (adminSetEmail) {
    findItems.push(adminSetEmail);
  }

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
    </div>
  );
};

TabsFind.propTypes = {
  item: PropTypes.object,
};

export default TabsFind;
