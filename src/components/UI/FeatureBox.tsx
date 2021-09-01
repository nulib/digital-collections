import React from "react";
import { Link } from "react-router-dom";
import { chopString } from "../../services/helpers";

interface FeatureBoxProps {
  item: {
    description: string;
    id: string;
    image: string;
    label: string;
  };
  modelType: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ item, modelType }) => {
  const { description, id, image, label } = item;
  const urlHelper = modelType === "image" ? "/items" : "/collections";

  return (
    <article className="feature-box">
      <img alt={label} src={image} />
      <div className="feature-copy">
        <h4>{label}</h4>
        <p>{chopString(description, 15)}</p>
      </div>
      <Link className="button" to={`${urlHelper}/${id}`}>
        View Collection
      </Link>
    </article>
  );
};

export default FeatureBox;
