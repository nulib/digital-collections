import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SectionTop = ({
  sectionTitle,
  optionalSubhead,
  optionalContent,
  optionalButtons = []
}) => {
  return (
    <div className="section">
      <div className="section-top contain-970">
        <h3 data-testid="section-title">{sectionTitle}</h3>
        <p data-testid="subhead" className="subhead">
          {optionalSubhead}
        </p>
        <p>{optionalContent}</p>
        <ul className="center-list">
          {optionalButtons.map(optionalButton => (
            <li key={optionalButton.label}>
              <Link
                className="button"
                to={{
                  pathname: optionalButton.url,
                  state: optionalButton.state
                }}
              >
                {optionalButton.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

SectionTop.propTypes = {
  sectionTitle: PropTypes.string,
  optionalSubhead: PropTypes.string,
  optionalContent: PropTypes.string,
  optionalButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      state: PropTypes.shape({
        facet: PropTypes.shape({
          elasticSearchField: PropTypes.string,
          label: PropTypes.string,
          value: PropTypes.string
        }),
        searchValue: PropTypes.string
      }),
      url: PropTypes.string
    })
  )
};

export default SectionTop;
