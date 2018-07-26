import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as globalVars from '../../services/global-vars';

// Helper component since we're reusing the route
const LinkWrapper = props => {
  const modelType = props.modelType === 'Image' ? '/items/' : '/collections/';

  return <Link to={`${modelType}${props.itemId}`}>{props.children}</Link>;
};

const SearchResultItem = props => {
  const {
    description_tesim,
    file_set_iiif_urls_ssim,
    has_model_ssim,
    thumbnail_iiif_url_ss,
    title_tesim
  } = props.item;

  const getIIIFImageSourceUrl = modelType => {
    if (modelType === 'Image') {
      return file_set_iiif_urls_ssim ? file_set_iiif_urls_ssim[0] : '';
    } else if (modelType === 'Collection') {
      return thumbnail_iiif_url_ss ? thumbnail_iiif_url_ss : '';
    } else {
      return '';
    }
  };

  const buildImageTag = () => {
    if (!has_model_ssim) {
      return '';
    }
    const iiifUrl = getIIIFImageSourceUrl(has_model_ssim[0]);
    const alt = description_tesim ? description_tesim[0] : '';
    const imgSrc = `${iiifUrl}${globalVars.IIIF_MEDIUM_ITEM_REGION}`;

    return <img src={imgSrc} alt={alt} />;
  };

  return (
    <article className="photo-box" aria-labelledby="grid1">
      <LinkWrapper
        itemId={props.item.id}
        modelType={props.item.has_model_ssim[0]}
      >
        {buildImageTag()}
      </LinkWrapper>
      <h4 id="grid1">
        {title_tesim.map(title => (
          <div key={title}>
            <LinkWrapper itemId={props.item.id}>{title}</LinkWrapper>
          </div>
        ))}
      </h4>
      {description_tesim &&
        description_tesim.map(description => (
          <p key={description}>{description}</p>
        ))}
    </article>
  );
};

SearchResultItem.propTypes = {
  item: PropTypes.object.isRequired
};

LinkWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  itemId: PropTypes.string.isRequired,
  modelType: PropTypes.string.isRequired
};

export default SearchResultItem;
