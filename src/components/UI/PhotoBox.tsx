import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import * as globalVars from "services/global-vars";
import imgPlaceholder from "images/book_placeholder.png";
import avPlaceholder from "images/av_placeholder.png";
import { chopString } from "services/helpers";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const lineHeight = css`
  lineheight: 1.5rem;
`;

const smallLabel = css`
  display: flex-inline;
  color: #716c6b;
  font-size: 0.7222rem;
  text-transform: capitalize;
`;

function buildImgSrc(
  imgUrl: string | undefined,
  workType: string,
  modelName: string
): string {
  if (imgUrl) return imgUrl;
  if (modelName === "Collection") {
    return imgPlaceholder;
  }
  if (workType === "IMAGE") {
    return imgPlaceholder;
  } else {
    return avPlaceholder;
  }
}

export interface PhotoBoxProps {
  description?: string;
  hideDescriptions?: boolean;
  id: string;
  imageUrl?: string;
  label: string;
  modelName: string;
  workType: string;
}

const PhotoBox: React.FC<PhotoBoxProps> = ({
  description,
  hideDescriptions,
  id,
  imageUrl,
  label,
  modelName,
  workType,
}) => {
  // Construct link to either Image or Collection screen
  const linkPath = `/${
    modelName === globalVars.COLLECTION_MODEL ? "collections" : "items"
  }/${id}`;

  const imgSrc = buildImgSrc(imageUrl, workType, modelName);
  const loadPlaceholderImage = (e: SyntheticEvent<HTMLImageElement>): void => {
    e.currentTarget.src = imgPlaceholder;
  };

  return (
    <article className="photo-box" data-testid="photo-box">
      <Link to={linkPath}>
        <img
          alt={`${label} description`}
          src={imgSrc}
          data-testid="img-photo-box"
          onError={loadPlaceholderImage}
        />
        <h4 data-testid="title-photo-box">
          <span css={lineHeight} className="button-link">
            {label}
          </span>
        </h4>
      </Link>

      {!hideDescriptions && description && (
        <p data-testid="description-photo-box">{chopString(description, 15)}</p>
      )}

      <span data-testid="work-type-photo-box" css={smallLabel}>
        {workType}
      </span>
    </article>
  );
};

export default PhotoBox;
