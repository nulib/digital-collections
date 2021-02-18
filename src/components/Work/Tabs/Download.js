import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getTileSources } from "../../../services/iiif-parser";
import UILoadingSpinner from "../../UI/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IIIFImageEmbedModal from "../../UI/IIIFImageEmbedModal";
import DownloadIIIFImage from "./DownloadIIIFImage";
import { cleanupFilename } from "../../../services/helpers";
import WorkEmbedViewer from "../EmbedViewer";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const downloadWrapper = css`
  max-height: 600px;
  overflow-y: auto;
`;
const table = css`
  td:nth-of-type(1) {
    width: 175px;
  }
  td:nth-of-type(3) {
    width: 200px;
  }
`;

const WorkTabsDownload = React.memo(function ({ item }) {
  const [loading, setLoading] = useState(true);
  const [tileSources, setTileSources] = useState([]);
  const [modalOpen, setModalOpen] = useState();
  const [currentId, setCurrentId] = useState();
  const [currentLabel, setCurrentLabel] = useState();

  const iiifServerUrl = item.representativeFileSet.url.slice(
    0,
    item.representativeFileSet.url.lastIndexOf("/")
  );

  useEffect(() => {
    fetch(item.iiifManifest)
      .then((response) => response.json())
      .then((data) => {
        setTileSources(getTileSources(data));
        setLoading(false);
      })
      .catch((e) => console.log("There was an error fetching the manifest"));
  }, [item.iiifManifest]);

  function closeModal() {
    setCurrentId(null);
    setCurrentLabel(null);
    setModalOpen(false);
  }

  function handleOpenModal(row) {
    let parsedId = row.id
      .slice(row.id.lastIndexOf("/") + 1)
      .split("%2F")
      .join("");

    setCurrentId(parsedId);
    setCurrentLabel(row.label);
    setModalOpen(true);
  }

  if (loading) return <UILoadingSpinner loading />;

  return (
    <div css={downloadWrapper} data-testid="tab-content-download">
      {item.visibility === "open" && <WorkEmbedViewer item={item} />}

      <div className="responsive-table">
        <table css={table}>
          <tbody>
            <tr className="stripe">
              <th>Image preview</th>
              <th>Label</th>
              <th>Actions</th>
            </tr>
            {tileSources.map((row, i) => (
              <tr key={row.id} className={`${i % 2 === 0 ? "stripe" : ""}`}>
                <td>
                  <img
                    src={`${row.id}/square/100,100/0/default.jpg`}
                    alt={`${row.label} thumbnail`}
                  />
                </td>
                <td>{row.label}</td>
                <td>
                  <DownloadIIIFImage
                    imageUrl={`${row.id}/full/3000,/0/default.jpg`}
                    imageTitle={row.label ? cleanupFilename(row.label) : ""}
                  />
                  <p>
                    <button
                      className="button-link"
                      onClick={() => handleOpenModal(row)}
                    >
                      <FontAwesomeIcon icon="code" /> HTML Embed
                    </button>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <IIIFImageEmbedModal
        altLabel={currentLabel}
        closeModal={closeModal}
        id={currentId}
        iiifServerUrl={iiifServerUrl}
        modalOpen={modalOpen}
      />
    </div>
  );
});

WorkTabsDownload.propTypes = {
  item: PropTypes.object,
};

export default WorkTabsDownload;
