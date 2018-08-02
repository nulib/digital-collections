import React from "react";
import { Link } from "react-router-dom";

export function calculatedLink(label, i, urls = null) {
  if (urls) {
    return (
      <li key={label}>
        <Link to={urls[i]}>{label}</Link>
      </li>
    );
  } else {
    return <li key={label}>{label}</li>;
  }
}
