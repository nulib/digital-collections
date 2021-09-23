import React from "react";
import PropTypes from "prop-types";
import CrumbLink from "./CrumbLink";

const Breadcrumbs = (props) => {
  if (!props.items) {
    return [];
  }
  const crumbs = props.items.map((item, i) => {
    const isLastCrumb = props.items.length - 1 === i;

    return (
      <li key={i} className={isLastCrumb ? `active` : ``}>
        {isLastCrumb ? item.title : <CrumbLink item={item} />}
      </li>
    );
  });

  return (
    <section className="contain-1120">
      <ul id="breadcrumbs" data-testid="breadcrumbs">
        {crumbs}
      </ul>
    </section>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, link: PropTypes.string })
  ),
};

export default Breadcrumbs;
