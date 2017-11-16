import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class PhotoBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const linkTo = `/sets/${this.props.sectionType}/${this.props.item.id}`;

    return (
      <article className="photo-box">
        <Link to={linkTo} className="photo-box-image-wrapper">
          <img src={ require('../images/' + this.props.item.posterImage) } alt={this.props.item.label} />
        </Link>
        <h4>{this.props.item.label}</h4>
        <p>{this.props.item.description}</p>
        <p className="link">
          <Link to={linkTo}>Read more</Link>
        </p>
      </article>
    );
  }

}

export default PhotoBox;
