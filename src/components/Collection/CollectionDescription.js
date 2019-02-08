import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { chopString } from '../../services/helpers';

const styles = {
  moreLess: {
    margin: '0 5px'
  }
};

class CollectionDescription extends Component {
  static propTypes = {
    description: PropTypes.string
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
    const tooLong = description.length > 70;

    return (
      <React.Fragment>
        <h3>Collection Description</h3>
        <p>
          {tooLong && !expanded && chopString(description, 70)}
          {(!tooLong || expanded) && description}
          {tooLong && (
            <a href="/" onClick={this.handleClick} style={styles.moreLess}>
              {expanded ? 'Less' : 'More'}
            </a>
          )}
        </p>
      </React.Fragment>
    );
  }
}

export default CollectionDescription;
