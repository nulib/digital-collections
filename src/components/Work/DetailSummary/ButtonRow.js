import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";

const ButtonRow = () => {
  function handleButtonClick(e) {
    const buttonId = e.target.id;
    let dataTabId = "about";

    if (buttonId === "item-cite") {
      dataTabId = "cite";
    } else if (buttonId === "item-download-share") {
      dataTabId = "download";
    }

    const $targetTab = $("#tabs").find(`[data-tab-id="${dataTabId}"]`);

    $targetTab.trigger("click");
    $("html, body").animate(
      {
        scrollTop: $targetTab.offset().top - 60,
      },
      1000
    );
  }

  return (
    <div>
      <button
        id="item-more-details"
        data-testid="item-more-details"
        className="button"
        onClick={handleButtonClick}
      >
        More Details
      </button>
      <button
        id="item-cite"
        data-testid="item-cite"
        className="button"
        onClick={handleButtonClick}
      >
        Cite This Item
      </button>
      <button
        id="item-download-share"
        data-testid="item-download-share"
        className="button"
        onClick={handleButtonClick}
      >
        Download &amp; Share
      </button>
    </div>
  );
};

ButtonRow.propTypes = {
  handleEmbedViewerClick: PropTypes.func,
};

export default ButtonRow;
