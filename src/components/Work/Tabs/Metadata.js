import React from "react";
import PropTypes from "prop-types";
import MetadataDisplay from "../MetadataDisplay";
import { reactiveSearchFacets } from "../../../services/reactive-search";
import { formatDate } from "../../../services/helpers";

const styles = {
  tabContent: {
    padding: "0 1rem",
  },
};

const TabsMetadata = ({ item }) => {
  if (!item) return;
  const {
    admin_set: { title: [admin_set] = "" } = "", // = "Library Division"
    create_date = "",
    nul_use_statement: nulUseStatement = null,
    descriptiveMetadata,
  } = item;

  const {
    abstract = "",
    alternateTitle = "",
    ark,
    caption = "",
    contributor = "",
    creator,
    description = "",
    genre = "",
    keywords = "",
    language = "",
    legacyIdentifier = "",
    location = "",
    notes = "",
    physicalDescriptionMaterial: materials,
    physicalDescriptionSize: size,
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
    { label: "Date", value: formatDate(create_date) },
    {
      label: "Department",
      value: admin_set,
      // facet: reactiveSearchFacets.find(
      //   facet => facet.value === "LibraryDepartment"
      // )
    },
    { label: "Description", value: description },

    { label: "Dimensions", value: size },
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
    { label: "Materials", value: materials },
    { label: "Notes", value: notes },
    { label: "NUL Use Statement", value: nulUseStatement },
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
    <div style={styles.tabContent} data-testid="tab-content-metadata">
      {metadataItems.map((metadataItem, i) => (
        <MetadataDisplay
          key={metadataItem.label}
          title={metadataItem.label}
          items={metadataItem.value}
          facet={metadataItem.facet}
          external_url={metadataItem.external_url}
        />
      ))}
    </div>
  );
};

TabsMetadata.propTypes = {
  item: PropTypes.object,
};

export default TabsMetadata;
