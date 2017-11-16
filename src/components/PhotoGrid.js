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
          <PhotoBox item={item} sectionType={this.props.sectionType} key={item.id} />
        ))}
      </div>
    );
  }
}

export default PhotoGrid;
