import React, {Component} from 'react';
import PhotoBox from './PhotoBox';

class PhotoGrid extends Component {
  
  render() {
    return (
      <div className="photo-grid contain-1120">
        {this.props.items.map((item) => (
          <PhotoBox
            key={item.id}
            item={item}
            linkPath={`${this.props.linkPrefix}/${item.id}`}
            />
        ))}
      </div>
    );
  }
}

export default PhotoGrid;
