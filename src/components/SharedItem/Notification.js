import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

function SharedItemNotification({ expirationDate }) {
  return (
    <div className="shared-link-notification">
      <p>
        Access to this resource is for educational, personal and non commercial
        use. Written permission of copyright holders is required for
        distribution.{" "}
        <a
          href="https://www.library.northwestern.edu/about/administration/policies/rights-permissions.html"
          target="_blank"
          rel="noreferrer"
        >
          Read more
        </a>
      </p>
      <p>
        This work was shared with you via a temporary link. The link will
        expire:{" "}
        <strong>
          {moment(expirationDate).format("MMMM Do YYYY, h:mm:ss a")}
        </strong>
      </p>
    </div>
  );
}

SharedItemNotification.propTypes = {
  expirationDate: PropTypes.string,
};

export default SharedItemNotification;
