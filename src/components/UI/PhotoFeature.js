import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../../images/book_placeholder.png";

import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const backHide = css`
  opacity: 0;
`;
const frontShow = css`
  opacity: 1;
  text-align: left;
`;
const frontHide = css`
  opacity: 0;
  height: 0;
  visibility: hidden;
  transition: visibility 0.5s, opacity 0.2s linear;
`;

const PhotoFeature = props => {
  let { id, description, imageUrl, label } = props.item;
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const backShow = css`
    opacity: 1;
    background-color: #836eaa;
    width: 100%;
    height: ${height}px;
  `;
  useEffect(() => {
    if (isHover) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [isHover]);

  const addHoverClass = e => {
    if (!isHover) {
      e.preventDefault();
    }
    setIsHover(!isHover);
  };
  const loadPlaceholderImage = e => {
    e.target.src = placeholderImage;
  };

  return (
    <article
      className="photo-feature"
      style={props.styles}
      onMouseEnter={addHoverClass}
      onMouseLeave={addHoverClass}
      onClick={addHoverClass}
      aria-labelledby="photo-feature"
      data-testid="photo-feature"
    >
      <Link
        to={`/collections/${id}`}
        id="photo-feature"
        onClick={addHoverClass}
      >
        <div css={!isHover ? frontShow : frontHide}>
          <img
            alt="image description"
            src={imageUrl}
            onError={loadPlaceholderImage}
            ref={ref}
          />
          <div className="text-over-image" data-testid="front-photo-box">
            <h4>{label}</h4>
          </div>
        </div>
        <div css={isHover ? backShow : backHide}>
          <div className="back-text" data-testid="back-photo-box">
            <h4>{label}</h4>
            <p>{description.substr(0, 200)}...</p>
            <p className="link">View Collection</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

PhotoFeature.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    label: PropTypes.string
  })
};

export default PhotoFeature;
