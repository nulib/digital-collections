import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CrumbLink = props => <Link to={props.item.link}>{props.item.title}</Link>;

CrumbLink.propTypes = {
  item: PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

export default CrumbLink;
