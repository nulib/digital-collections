import React, { useState, useEffect, useRef } from "react";

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
  visibility: hidden;
  height: 0;
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
      setHeight(ref.current.clientHeight);
    }
  }, [isHover]);

  const addHoverClass = () => setIsHover(!isHover);

  return (
    <article
      className="photo-feature"
      onMouseEnter={addHoverClass}
      onMouseLeave={addHoverClass}
      aria-labelledby="photo-feature"
      data-testid="photo-feature"
    >
      <a href={`/items/${id}`} id="photo-feature">
        <div css={!isHover ? frontShow : frontHide}>
          <img alt="image description" src={imageUrl} ref={ref} />
          <div className="text-over-image" data-testid="front-photo-box">
            <h4>{label}</h4>
            <p className="link">Learn more</p>
          </div>
        </div>
        <div css={isHover ? backShow : backHide}>
          <div className="back-text" data-testid="back-photo-box">
            <h4>{label}</h4>
            <p>{description.substr(0, 200)}...</p>
            <p className="link">Go to Site</p>
          </div>
        </div>
      </a>
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
