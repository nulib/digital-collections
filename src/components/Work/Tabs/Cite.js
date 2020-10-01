import React from "react";
import PropTypes from "prop-types";
import MetadataDisplay from "../MetadataDisplay";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const tabContent = css`
  padding: 0 1rem;
`;
const monoSpace = css`
  font-family: monospace;
`;

const TabsCite = ({ item }) => {
  const {
    adminSet: { title: [adminSet] = "" } = "", // division,
    collection,
    createDate: [date] = "",
    descriptiveMetadata,
    id = "",
    nulUseStatement = "",
  } = item;

  const {
    identifier = "",
    license = null,
    title: title = "",
  } = descriptiveMetadata;

  const nul = "Northwestern University Libraries";
  const itemLink = `${window.location.origin}/items/${id}`;
  const today = new Date().toDateString();
  const collectionTitle = collection ? collection.title : "";

  const citePanel = [
    { label: "Identifier", value: identifier },
    { label: "Licenses", value: license },
    { label: "Title", value: title },
    { label: "Use Statement", value: nulUseStatement },
  ];

  return (
    <div data-testid="tab-content-cite">
      <div className="cite-group-col">
        <div className="cite-group">
          <div css={tabContent}>
            {citePanel.map((item, i) => (
              <MetadataDisplay
                key={item.label}
                title={item.label}
                items={item.value}
              />
            ))}
          </div>
        </div>
      </div>
      {/* TO-DO adminSet not yet supported */}
      {adminSet && (
        <div className="cite-group-col">
          <div className="cite-group" css={tabContent}>
            <h4>APA Format</h4>
            <p>{`${adminSet}, ${nul}. (${date}). ${title}, Retrieved from ${itemLink}`}</p>

            <h4>Chicago/Turabian Format</h4>
            <p>{`${adminSet}, ${nul}. "${title}", ${collectionTitle} Accessed ${today}. ${itemLink}`}</p>

            <h4>MLA Format</h4>
            <p>{`${adminSet}, ${nul}. "${title}", ${collectionTitle} ${date}. ${window.location.origin}/items/${id}`}</p>

            <h4>Wikipedia Citation</h4>
            <p>
              <code
                css={monoSpace}
              >{`<ref name=NUL>{{cite web | url=${itemLink} | title= ${title} (${date}) }} |author=Digital Collections, ${nul} |accessdate=${today} |publisher=${nul}, ${adminSet}}}</ref>`}</code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

TabsCite.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TabsCite;
