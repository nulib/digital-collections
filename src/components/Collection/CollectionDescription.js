import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { chopString } from '../../services/helpers';

const styles = {
  moreLess: {
    margin: '0 5px'
  }
};

// Number of words to limit the visible description to, until a "More" expansion linke is provided
const WORD_LIMIT = 70;

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
    const tooLong = description.split(' ').length > WORD_LIMIT;

    return (
      <React.Fragment>
        <p>
          {tooLong && !expanded && chopString(description, WORD_LIMIT)}
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
