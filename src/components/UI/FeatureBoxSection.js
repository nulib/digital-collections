import React from "react";
import FeatureBox from "./FeatureBox";
import PropTypes from "prop-types";

const FeatureBoxSection = (props) => {
  return (
    <div className="section">
      <div className="feature-four-col">
        {props.items.map((item) => (
          <FeatureBox key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

FeatureBoxSection.propTypes = {
  items: PropTypes.array,
};

export default FeatureBoxSection;
