import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../../images/book_placeholder.png";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

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

interface PhotoFeatureProps {
  item: {
    description: string;
    id: string;
    imageUrl: string;
    label: string;
  };
  styles: {};
}

const PhotoFeature: React.FC<PhotoFeatureProps> = ({ item, styles }) => {
  let { id, description, imageUrl, label } = item;
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLImageElement | null>(null);
  const [isHover, setIsHover] = useState(false);
  const backShow = css`
    opacity: 1;
    background-color: #836eaa;
    width: 100%;
    height: ${height}px;
  `;
  useEffect(() => {
    isHover &&
      ref.current &&
      setHeight(ref.current.getBoundingClientRect().height);
  }, [isHover]);

  const addHoverClass = (
    e: React.MouseEvent<HTMLElement | HTMLAnchorElement>
  ) => {
    if (!isHover) {
      e.preventDefault();
    }
    setIsHover(!isHover);
  };
  const loadPlaceholderImage = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.src = placeholderImage;
  };

  return (
    <article
      className="photo-feature"
      style={styles}
      onMouseEnter={addHoverClass}
      onMouseLeave={addHoverClass}
      onClick={addHoverClass}
      aria-labelledby={`photo-feature-${id}`}
      data-testid="photo-feature"
    >
      <Link
        to={`/collections/${id}`}
        id={`photo-feature-${id}`}
        onClick={addHoverClass}
      >
        <div css={!isHover ? frontShow : frontHide}>
          <img
            alt={`${label} description`}
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

export default PhotoFeature;
