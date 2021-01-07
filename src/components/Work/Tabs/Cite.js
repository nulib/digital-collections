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

  const [copied, setCopied] = useState();

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

  // TODO: Wire this up
  // const formats = [
  //   {
  //     id: "permalink",
  //     label: "Ark",
  //     text: permalink,
  //     style: {}
  //   },
  //   {
  //     id: "apaFormat",
  //     label: "APA Format",
  //     text: `${adminSet}, ${nul}. (${date}). ${title}, Retrieved from ${item_link}`,
  //     style: {}
  //   },
  //   {
  //     id: "turabianFormat",
  //     label: "Chicago/Turabian Format",
  //     text: `${adminSet}, ${nul}. "${title}", ${collection_title} Accessed ${today}. ${item_link}`,
  //     style: {}
  //   },
  //   {
  //     id: "mlaFormat",
  //     label: "MLA Format",
  //     text: `${adminSet}, ${nul}. "${title}", ${collection_title} ${date}. ${window.location.origin}/items/${id}`,
  //     style: {}
  //   },
  //   {
  //     id: "wikiCitation",
  //     label: "Wikipedia Citation",
  //     text: `<ref name=NUL>{{cite web | url=${item_link} | title= ${title} (${date}) }} |author=Digital Collections, ${nul} |accessdate=${today} |publisher=${nul}, ${adminSet}}}</ref>`,
  //     style: styles.monoSpace
  //   }
  // ];

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
      <div className="cite-group-col">
        {/* <div className="cite-group" css={tabContent}>
          {formats.map((item, index) => (
          <div key={item.id}>
            <h4>{item.label}</h4>
            <p>
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
              {item.style ? (
                <code style={item.style}>{item.text}</code>
              ) : (
                <>{item.text}</>
              )}
            </p>
          </div>
        ))}
          </div> */}
      </div>
    </div>
  );
};

TabsCite.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TabsCite;
