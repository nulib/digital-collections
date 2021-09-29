import React from "react";
import PropTypes, { array } from "prop-types";
import PhotoBox from "./PhotoBox";
import { PhotoBoxProps } from "components/UI/PhotoBox";

interface PhotoGridProps {
  cols: number;
  hideDescriptions: boolean;
  items: [];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({
  cols,
  items,
  hideDescriptions,
}) => {
  let className = "photo-grid contain-1120";
  if (cols) {
    switch (cols) {
      case 2:
        className += ` two-grid`;
        break;
      case 3:
        className += ` three-grid`;
        break;
      case 4:
        className += ` four-grid`;
        break;
      default:
        break;
    }
  }

  return (
    <div className={className} data-testid="photo-grid">
      {items.length > 0 &&
        items.map(
          ({ id, imageUrl, label, modelName, workType }: PhotoBoxProps) => (
            <PhotoBox
              key={id}
              hideDescriptions={hideDescriptions}
              id={id}
              imageUrl={imageUrl}
              label={label}
              modelName={modelName}
              workType={workType}
            />
          )
        )}
    </div>
  );
};

export default PhotoGrid;
