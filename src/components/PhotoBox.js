import React from 'react';

function PhotoBox(props) {
  return (
    <article className="photo-box">
        <a className="photo-box-image-wrapper">
          <img src={ require('../images/' + props.item.posterImage) } alt={props.item.label} />
        </a>
        <h4>{props.item.label}</h4>
        <p>{props.item.description}</p>
        <p className="link"><a>Read more</a></p>
    </article>
  );
}

export default PhotoBox;
