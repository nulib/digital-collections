import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  moreLess: {
    margin: '0 5px'
  }
};

class CollectionDescription extends Component {
  static propTypes = {
    description: PropTypes.array
  };

  state = {
    expanded: false
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { expanded } = this.state;
    const { description } = this.props;
    const tooLong = description.length > 1;

    return (
      <React.Fragment>
        <p>
          {tooLong && !expanded && description[0]}
          {(!tooLong || expanded) && description}
          {tooLong && (
            <a href="/" onClick={this.handleClick}>
              <FontAwesomeIcon
                icon={expanded ? 'angle-up' : 'angle-right'}
                style={styles.moreLess}
              />
              {expanded ? 'Less' : 'More'}
            </a>
          )}
        </p>
      </React.Fragment>
    );
  }
}

export default CollectionDescription;
