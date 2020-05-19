import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as globalVars from "../../services/global-vars";
import placeholderImage from "../../images/book_placeholder.png";
import { chopString } from "../../services/helpers";

const styles = {
  title: {
    lineHeight: "1.5rem"
  }
};

const PhotoBox = props => {
  const { description, imageUrl, label, type } = props.item;
  let linkPath = `/${
    type === globalVars.IMAGE_MODEL ? "items" : "collections"
  }/${props.item.id}`;

  let imgSrc = imageUrl ? imageUrl : placeholderImage;

  return (
    <article
      aria-labelledby="grid1"
      className="photo-box"
      data-testid="photo-box"
    >
      <Link to={linkPath}>
        <img alt={label} src={imgSrc} data-testid="img-photo-box" />
      </Link>
      <h4 data-testid="title-photo-box">
        <Link to={linkPath} style={styles.title}>
          {label}
        </Link>
      </h4>
      {!props.hideDescriptions && description && (
        <p data-testid="description-photo-box">{chopString(description, 15)}</p>
      )}
    </article>
  );
};

PhotoBox.propTypes = {
  hideDescriptions: PropTypes.bool,
  item: PropTypes.shape({
    description: PropTypes.array,
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })
};

export default PhotoBox;
