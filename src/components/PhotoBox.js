import React from 'react';
import {Link} from 'react-router-dom';

function PhotoBox(props) {
  return (
    <article className="photo-box">
      <Link to={props.linkPath} className="photo-box-image-wrapper">
        <img src={ require('../images/' + props.item.posterImage) } alt={props.item.label} />
      </Link>
      <h4>{props.item.label}</h4>
      <p>{props.item.description}</p>
      <p className="link">
        <Link to={props.linkPath}>Read more</Link>
      </p>
    </article>
  );
}

export default PhotoBox;
