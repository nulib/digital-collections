import React, {Component} from 'react';
import PhotoBox from './PhotoBox';

class PhotoGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="photo-grid contain-1120">
        {this.props.items.map((item) => (
          <PhotoBox key={item.id} item={item} sectionType={this.props.sectionType} />
        ))}
      </div>
    );
  }
}

export default PhotoGrid;
