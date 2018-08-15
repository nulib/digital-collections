import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon
} from 'react-share';

const SocialLinks = props => {
  const currentLocation = String(window.location);
  const imgUrl = `${
    props.item.representative_file_url
  }/full/full/0/default.jpg`;

  return (
    <div className="summary-list-item social-media">
      <FacebookShareButton url={currentLocation}>
        <FacebookIcon size={32} round={false} />
      </FacebookShareButton>
      <TwitterShareButton url={currentLocation}>
        <TwitterIcon size={32} round={false} />
      </TwitterShareButton>
      <PinterestShareButton
        url={currentLocation}
        media={imgUrl}
        windowWidth={1000}
        windowHeight={730}
        className=""
      >
        <PinterestIcon size={32} round={false} />
      </PinterestShareButton>
    </div>
  );
};

export default SocialLinks;
