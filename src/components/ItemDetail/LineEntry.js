import React from 'react';

const LineEntry = props => {
  let calculatedLink = (label, i) => {
    if (props.urls) {
      return <a href={props.urls[i]}>{label}</a>;
    } else {
      return label;
    }
  };

  return (
    <div>
      <h4>{props.title}</h4>
      <ul>
        {props.labels.map((label, i) => {
          return <li key={i}>{calculatedLink(label, i)}</li>;
        })}
      </ul>
    </div>
  );
};

export default LineEntry;
