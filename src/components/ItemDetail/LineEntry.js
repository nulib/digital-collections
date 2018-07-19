import React from 'react';

const LineEntry = props => {
  return (
    <div>
      <h4>{props.title}</h4>
      <ul>{props.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
    </div>
  );
};

export default LineEntry;
