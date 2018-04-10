import React from 'react';
import { Link } from 'react-router-dom';

const CrumbLink = props => <Link to={props.item.link}>{props.item.title}</Link>;

const Breadcrumbs = props => {
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
      <ul id="breadcrumbs">{crumbs}</ul>
    </section>
  );
};

export default Breadcrumbs;
