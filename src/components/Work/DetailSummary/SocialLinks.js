import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon
} from 'react-share';
import PropTypes from 'prop-types';

const SocialLinks = props => {
  const currentLocation = String(window.location);
  const imgUrl = `${props.item.representative_file_url}/full/full/0/default.jpg`;
  const iconBgStyleObj = { fill: '#4e2a84' };
  const styles = {
    shareButton: {
      cursor: 'pointer',
      display: 'inline-block',
      margin: '0 2px'
    }
  };

  return (
    <div className="summary-list-item social-media">
      <FacebookShareButton url={currentLocation} style={styles.shareButton}>
        <FacebookIcon size={32} round={false} iconBgStyle={iconBgStyleObj} />
      </FacebookShareButton>
      <TwitterShareButton url={currentLocation} style={styles.shareButton}>
        <TwitterIcon size={32} round={false} iconBgStyle={iconBgStyleObj} />
      </TwitterShareButton>
      <PinterestShareButton
        url={currentLocation}
        media={imgUrl}
        windowWidth={1000}
        windowHeight={730}
        className=""
        style={styles.shareButton}
      >
        <PinterestIcon size={32} round={false} iconBgStyle={iconBgStyleObj} />
      </PinterestShareButton>
    </div>
  );
};

SocialLinks.propTypes = {
  item: PropTypes.object.isRequired
};

export default SocialLinks;
