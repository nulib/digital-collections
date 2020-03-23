import React from "react";
import PropTypes from "prop-types";
import MetadataDisplay from "../MetadataDisplay";

const styles = {
  monoSpace: {
    fontFamily: "monospace"
  },
  tabContent: {
    padding: "0 1rem"
  }
};

const TabsCite = props => {
  const {
    admin_set: { title: [admin_set] } = "", // division,
    collection = null,
    date: [date] = "",
    id = "",
    identifier = null,
    license = null,
    nulUseStatement = "",
    title: { primary: title } = ""
  } = props.item;

  const nul = "Northwestern University Libraries";
  const item_link = `${window.location.origin}/items/${id}`;
  const today = new Date().toDateString();
  const collection_title =
    collection && collection.length > 0 ? `${collection[0].title}.` : "";

  const citePanel = [
    { label: "Identifier", value: identifier },
    { label: "Licenses", value: license },
    { label: "Title", value: title },
    { label: "Use Statement", value: nulUseStatement }
  ];

  return (
    <div data-testid="tab-content-cite">
      <div className="cite-group-col">
        <div className="cite-group">
          <div style={styles.tabContent}>
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
        <div className="cite-group" style={styles.tabContent}>
          <h4>APA Format</h4>
          <p>{`${admin_set}, ${nul}. (${date}). ${title}, Retrieved from ${item_link}`}</p>

          <h4>Chicago/Turabian Format</h4>
          <p>{`${admin_set}, ${nul}. "${title}", ${collection_title} Accessed ${today}. ${item_link}`}</p>

          <h4>MLA Format</h4>
          <p>{`${admin_set}, ${nul}. "${title}", ${collection_title} ${date}. ${window.location.origin}/items/${id}`}</p>

          <h4>Wikipedia Citation</h4>
          <p>
            <code
              style={styles.monoSpace}
            >{`<ref name=NUL>{{cite web | url=${item_link} | title= ${title} (${date}) }} |author=Digital Collections, ${nul} |accessdate=${today} |publisher=${nul}, ${admin_set}}}</ref>`}</code>
          </p>
        </div>
      </div>
    </div>
  );
};

TabsCite.propTypes = {
  item: PropTypes.object.isRequired
};

export default TabsCite;
