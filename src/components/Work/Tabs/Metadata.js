import PropTypes from "prop-types";
import MetadataDisplay from "../MetadataDisplay";
import {
  FACET_SENSORS_RIGHTS_USAGE,
  FACET_SENSORS_LOCATION,
  FACET_SENSORS_CREATOR,
  FACET_SENSORS_DESCRIPTIVE,
} from "services/reactive-search";

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

  const allFacets = [
    ...FACET_SENSORS_RIGHTS_USAGE,
    ...FACET_SENSORS_LOCATION,
    ...FACET_SENSORS_CREATOR,
    ...FACET_SENSORS_DESCRIPTIVE,
  ];

  const {
    abstract,
    alternateTitle,
    caption,
    contributor,
    creator,
    culturalContext,
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
      facet: allFacets.find((facet) => facet.componentId === "Contributor"),
    },
    {
      label: "Creator",
      value: creator,
      facet: allFacets.find((facet) => facet.componentId === "Creator"),
    },
    { label: "Cultural Context", value: culturalContext },
    { label: "Date", value: dateCreated.map((d) => d.humanized) },
    {
      label: "Department",
      value: libraryUnit ? libraryUnit.label : "",
      facet: allFacets.find(
        (facet) => facet.componentId === "LibraryDepartment"
      ),
    },
    { label: "Description", value: description },

    { label: "Dimensions", value: physicalDescriptionSize },
    {
      label: "Genre",
      value: genre,
      facet: allFacets.find((facet) => facet.componentId === "Genre"),
    },
    { label: "Keyword", value: keywords },
    {
      label: "Language",
      value: language,
      facet: allFacets.find((facet) => facet.componentId === "Language"),
    },
    {
      label: "Location",
      value: location,
      facet: allFacets.find((facet) => facet.componentId === "Location"),
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
      facet: allFacets.find((facet) => facet.componentId === "RightsStatement"),
    },
    { label: "Scope and Contents", value: scopeAndContents },
    {
      label: "Series",
      value: series,
      facet: allFacets.find((facet) => facet.componentId === "Series"),
    },
    { label: "Source", value: source },
    {
      label: "Style Period",
      value: stylePeriod,
      facet: allFacets.find((facet) => facet.componentId === "StylePeriod"),
    },
    {
      label: "Subject",
      value: subject,
      facet: allFacets.find((facet) => facet.componentId === "Subject"),
    },
    { label: "Table of Contents", value: tableOfContents },
    {
      label: "Technique",
      value: technique,
      facet: allFacets.find((facet) => facet.componentId === "Technique"),
    },
    { label: "Title", value: title },
  ];

  return (
    <div css={tabContent} data-testid="tab-content-metadata">
      {metadataItems.map(({ label, value, facet }) => (
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
