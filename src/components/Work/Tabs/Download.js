import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getTileSources } from "../../../services/iiif-parser";
import UILoadingSpinner from "../../UI/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IIIFImageEmbedModal from "../../UI/IIIFImageEmbedModal";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const downloadWrapper = css`
  max-height: 600px;
  overflow-y: auto;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
`;

const WorkTabsDownload = React.memo(function({ item }) {
  const [loading, setLoading] = useState(true);
  const [tileSources, setTileSources] = useState([]);
  const [modalOpen, setModalOpen] = useState();
  const [currentId, setCurrentId] = useState();
  const [currentLabel, setCurrentLabel] = useState();

  useEffect(() => {
    fetch(item.iiif_manifest)
      .then(response => response.json())
      .then(data => {
        setTileSources(getTileSources(data));
        setLoading(false);
      })
      .catch(e => console.log("There was an error fetching the manifest"));
  }, [item.iiif_manifest]);

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
      <div className="responsive-table">
        <table className="table-borders">
          <tbody>
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
                  <p>
                    <a
                      href={`${row.id}/full/3000,/0/default.jpg`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon="download" /> Download
                    </a>
                  </p>

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
        modalOpen={modalOpen}
      />
    </div>
  );
});

WorkTabsDownload.propTypes = {
  item: PropTypes.object
};

export default WorkTabsDownload;
