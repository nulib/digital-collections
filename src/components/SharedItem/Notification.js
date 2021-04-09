import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

function SharedItemNotification({ expirationDate }) {
  return (
    <div className="shared-link-notification">
      This work was shared with you via a temporary link. The link will expire:{" "}
      <strong>
        {moment(expirationDate).format("MMMM Do YYYY, h:mm:ss a")}
      </strong>
    </div>
  );
}

SharedItemNotification.propTypes = {
  expirationDate: PropTypes.string,
};

export default SharedItemNotification;
