import React from "react";
import PropTypes from "prop-types";
import MetadataDisplay from "../MetadataDisplay";
import { reactiveSearchFacets } from "../../../services/reactive-search";

const styles = {
  tabContent: {
    padding: "0 1rem",
  },
};

const TabsMetadata = ({ item }) => {
  if (!item) return;

  const {
    admin_set: { title: [admin_set] } = "", // = "Library Division"
    based_near = null,
    abstract: [abstract] = "",
    caption: [caption] = "",
    contributor = null,
    creator = null,
    date = null,
    description = null,
    genre = null,
    keyword = "",
    language = null,
    notes = null,
    nul_use_statement: nulUseStatement = null,
    physical_description: { material } = null,
    physical_description: { size } = null,
    provenance: [provenance] = "",
    publisher = "",
    related_material: relatedMaterial = null,
    related_url: relatedUrl = null,
    rights_holder: rightsHolder = "",
    rights_statement: { label: rightsStatementText } = null,
    scope_and_contents: scopeAndContents = null,
    series = null,
    source = "",
    style_period: stylePeriod = null,
    subject = "",
    table_of_contents: tableOfConents = null,
    technique = null,
    title: { primary: title } = "",
    title: { alternate: alternateTitle } = "",
  } = item;

  const metadataItems = [
    { label: "Alternate Title", value: alternateTitle },
    { label: "Abstract", value: abstract },
    { label: "Caption", value: caption },
    {
      label: "Creator",
      value: creator,
      facet: reactiveSearchFacets.find((facet) => facet.value === "Creator"),
    },
    {
      label: "Contributor",
      value: contributor,
      facet: reactiveSearchFacets.find(
        (facet) => facet.value === "Contributor"
      ),
    },
    { label: "Date", value: date },
    { label: "Description", value: description },
    {
      label: "Department",
      value: admin_set,
      facet: reactiveSearchFacets.find(
        (facet) => facet.value === "LibraryDepartment"
      ),
    },
    { label: "Dimensions", value: size },
    {
      label: "Genre",
      value: genre,
      facet: reactiveSearchFacets.find((facet) => facet.value === "Genre"),
    },
    { label: "Keyword", value: keyword },
    {
      label: "Language",
      value: language,
      facet: reactiveSearchFacets.find((facet) => facet.value === "Language"),
    },
    {
      label: "Location",
      value: based_near,
      facet: reactiveSearchFacets.find((facet) => facet.value === "Location"),
    },
    { label: "Materials", value: material },
    { label: "Notes", value: notes },
    { label: "NUL Use Statement", value: nulUseStatement },
    { label: "Provenance", value: provenance },
    { label: "Publisher", value: publisher },
    { label: "Related Material", value: relatedMaterial },
    { label: "Related Url", value: relatedUrl },
    { label: "Rights Holder", value: rightsHolder },
    {
      label: "Rights Statement",
      value: rightsStatementText,
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
    { label: "Table of Contents", value: tableOfConents },
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
