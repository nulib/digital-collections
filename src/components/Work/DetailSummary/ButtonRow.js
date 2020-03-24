import React from "react";
import $ from "jquery";

const ButtonRow = () => {
  function handleButtonClick(e) {
    const buttonId = e.target.id;
    let dataTabId = "about";

    if (buttonId === "item-cite") {
      dataTabId = "cite";
    }

    const $targetTab = $("#tabs").find(`[data-tab-id="${dataTabId}"]`);

    $targetTab.trigger("click");
    $("html, body").animate(
      {
        scrollTop: $targetTab.offset().top - 60
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
    </div>
  );
};

export default ButtonRow;
