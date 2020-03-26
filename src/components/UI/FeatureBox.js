import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { chopString } from "../../services/helpers";

const FeatureBox = props => {
  const { description, id, image, label } = props.item;
  const urlHelper = props.modelType === "image" ? "/items" : "/collections";

  return (
    <article className="feature-box" data-testid={`feature-box-${id}`}>
      <img alt={label} src={image} />
      <div className="feature-copy">
        <h4>{label}</h4>
        <p>{chopString(description, 15)}</p>
      </div>
      <Link className="button" to={`${urlHelper}/${id}`}>
        View Work
      </Link>
    </article>
  );
};

FeatureBox.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    label: PropTypes.string
  }),
  modelType: PropTypes.string // 'image' or 'collection'
};

export default FeatureBox;
