import React from "react";
import PropTypes from "prop-types";
import MetadataDisplay from "../MetadataDisplay";
import { reactiveSearchFacets } from "../../../services/reactive-search";
import { formatDate } from "../../../services/helpers";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const tabContent = css`
  padding: 0 1rem;
`;

const TabsMetadata = ({ item }) => {
  if (!item) return;
  const {
    administrativeMetadata: { libraryUnit }, // = "Library Division"
    descriptiveMetadata,
  } = item;

  const {
    abstract,
    alternateTitle,
    caption,
    contributor,
    creator,
    dateCreated,
    description,
    genre,
    keywords,
    language,
    location,
    notes,
    physicalDescriptionMaterial,
    physicalDescriptionSize,
    provenance,
    publisher,
    relatedMaterial,
    relatedUrl,
    rightsHolder,
    rightsStatement,
    scopeAndContents,
    series,
    source,
    stylePeriod,
    subject,
    tableOfContents,
    technique,
    title,
    termsOfUse,
  } = descriptiveMetadata;

  const metadataItems = [
    { label: "Alternate Title", value: alternateTitle },
    { label: "Abstract", value: abstract },
    { label: "Caption", value: caption },

    {
      label: "Contributor",
      value: contributor,
      facet: reactiveSearchFacets.find(
        (facet) => facet.value === "Contributor"
      ),
    },
    {
      label: "Creator",
      value: creator,
      facet: reactiveSearchFacets.find((facet) => facet.value === "Creator"),
    },
    { label: "Date", value: dateCreated.map((d) => d.humanized) },
    {
      label: "Department",
      value: libraryUnit.label,
      facet: reactiveSearchFacets.find(
        (facet) => facet.value === "LibraryDepartment"
      ),
    },
    { label: "Description", value: description },

    { label: "Dimensions", value: physicalDescriptionSize },
    {
      label: "Genre",
      value: genre,
      facet: reactiveSearchFacets.find((facet) => facet.value === "Genre"),
    },
    { label: "Keyword", value: keywords },
    {
      label: "Language",
      value: language,
      facet: reactiveSearchFacets.find((facet) => facet.value === "Language"),
    },
    {
      label: "Location",
      value: location,
      facet: reactiveSearchFacets.find((facet) => facet.value === "Location"),
    },
    { label: "Materials", value: physicalDescriptionMaterial },
    { label: "Notes", value: notes },
    { label: "Terms of Use", value: termsOfUse },
    { label: "Provenance", value: provenance },
    { label: "Publisher", value: publisher },
    { label: "Related Material", value: relatedMaterial },
    { label: "Related Url", value: relatedUrl },
    { label: "Rights Holder", value: rightsHolder },
    {
      label: "Rights Statement",
      value: rightsStatement ? rightsStatement.label : "",
      facet: reactiveSearchFacets.find(
        (facet) => facet.value === "RightsStatement"
      ),
    },
    { label: "Scope and Contents", value: scopeAndContents },
    {
      label: "Series",
      value: series,
      facet: reactiveSearchFacets.find((facet) => facet.value === "Series"),
    },
    { label: "Source", value: source },
    {
      label: "Style Period",
      value: stylePeriod,
      facet: reactiveSearchFacets.find(
        (facet) => facet.value === "StylePeriod"
      ),
    },
    {
      label: "Subject",
      value: subject,
      facet: reactiveSearchFacets.find((facet) => facet.value === "Subject"),
    },
    { label: "Table of Contents", value: tableOfContents },
    {
      label: "Technique",
      value: technique,
      facet: reactiveSearchFacets.find((facet) => facet.value === "Technique"),
    },
    { label: "Title", value: title },
  ];
  return (
    <div css={tabContent} data-testid="tab-content-metadata">
      {metadataItems.map(({ label, value, facet }, i) => (
        <MetadataDisplay
          key={label}
          title={label}
          items={value}
          facet={facet}
        />
      ))}
    </div>
  );
};

TabsMetadata.propTypes = {
  item: PropTypes.object,
};

export default TabsMetadata;
