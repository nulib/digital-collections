import React, { useState } from "react";
import PropTypes from "prop-types";
import MetadataDisplay from "../MetadataDisplay";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = {
  monoSpace: {
    fontFamily: "monospace",
  },
  tabContent: {
    padding: "0 1rem",
  },
  copyLink: { width: "2rem" },
  active: { color: "#008656" },
};

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const tabContent = css`
  padding: 0 1rem;
`;
const monoSpace = css`
  font-family: monospace;
`;
const flexTitle = css`
  display: flex;
  padding-top: 1rem;
`;

const TabsCite = ({ item }) => {
  const {
    administrativeMetadata: { libraryUnit }, // = "Library Division"
    collection,
    createDate: [date] = "",
    descriptiveMetadata,
    id,
    termsOfUse,
  } = item;

  const { ark, identifier, license, title } = descriptiveMetadata;

  const [copied, setCopied] = useState();

  const nul = "Northwestern University Libraries";
  const itemLink = `${window.location.origin}/items/${id}`;
  const today = new Date().toDateString();
  const collectionTitle = collection ? collection.title : "";

  const citePanel = [
    { label: "Identifier", value: identifier },
    { label: "Licenses", value: license },
    { label: "Title", value: title },
    { label: "Use Statement", value: termsOfUse },
  ];

  const formats = [
    {
      id: "permalink",
      label: "Ark",
      text: ark,
      style: {},
    },
    {
      id: "apaFormat",
      label: "APA Format",
      text: `${libraryUnit.label}, ${nul}. (${date}). ${title}, Retrieved from ${itemLink}`,
      style: {},
    },
    {
      id: "turabianFormat",
      label: "Chicago/Turabian Format",
      text: `${libraryUnit.label}, ${nul}. "${title}", ${collectionTitle} Accessed ${today}. ${itemLink}`,
      style: {},
    },
    {
      id: "mlaFormat",
      label: "MLA Format",
      text: `${libraryUnit.label}, ${nul}. "${title}", ${collectionTitle} ${date}. ${window.location.origin}/items/${id}`,
      style: {},
    },
    {
      id: "wikiCitation",
      label: "Wikipedia Citation",
      text: `<ref name=NUL>{{cite web | url=${itemLink} | title= ${title} (${date}) }} |author=Digital Collections, ${nul} |accessdate=${today} |publisher=${nul}, ${libraryUnit.label}}}</ref>`,
      style: styles.monoSpace,
    },
  ];

  return (
    <div data-testid="tab-content-cite">
      <div css={tabContent}>
        {citePanel.map((item, i) => (
          <MetadataDisplay
            key={item.label}
            title={item.label}
            items={item.value}
          />
        ))}
      </div>
      <div className="cite-group" css={tabContent}>
        {formats.map((item, index) => (
          <div key={item.id}>
            <div css={flexTitle}>
              <h4>{item.label}</h4>
              <div>
                <CopyToClipboard
                  text={item.text}
                  onCopy={() => setCopied(item.id)}
                >
                  <button className="button-link" title="Copy to Clipboard">
                    <FontAwesomeIcon
                      icon="copy"
                      style={
                        copied === item.id
                          ? { ...styles.copyLink, ...styles.active }
                          : styles.copyLink
                      }
                    />
                  </button>
                </CopyToClipboard>
                {copied === item.id && (
                  <span style={styles.active}>
                    Copied to Clipboard
                    <br />
                  </span>
                )}
              </div>
            </div>

            <p>
              {item.style ? (
                <code style={item.style}>{item.text}</code>
              ) : (
                <>{item.text}</>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

TabsCite.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TabsCite;
