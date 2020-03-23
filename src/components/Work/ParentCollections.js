import React from "react";
import PhotoGrid from "../UI/PhotoGrid";
import PropTypes from "prop-types";
import ThisItem from "./ThisItem";
import SectionTop from "../UI/SectionTop";
import { reactiveSearchFacets } from "../../services/reactive-search";

const ParentCollections = ({ adminSetItems = [], collection, item }) => {
  const adminSetTitle = item.admin_set ? item.admin_set.title[0] : "";

  return (
    <div>
      {item && adminSetItems && (
        <section className="section" data-testid="section-library-department">
          <SectionTop
            sectionTitle="Library Department"
            optionalSubhead={adminSetTitle}
            optionalButtons={[
              {
                label: "View All Items in Library Department",
                url: "/search",
                state: {
                  facetValue: reactiveSearchFacets.find(
                    facet => facet.value === "LibraryDepartment"
                  ),
                  searchValue: adminSetTitle
                }
              }
            ]}
          />
          <PhotoGrid items={adminSetItems} hideDescriptions={true} />
        </section>
      )}

      {item && collection.items.length > 0 && (
        <section data-testid="section-collection">
          <SectionTop
            sectionTitle="Collection"
            optionalSubhead={collection.title}
            optionalButtons={[
              {
                label: "View All Items in Collection",
                url: `/collections/${collection.id}`
              }
            ]}
          />
          <PhotoGrid items={collection.items} />
        </section>
      )}

      <ThisItem item={item} />
    </div>
  );
};

ParentCollections.propTypes = {
  adminSetItems: PropTypes.array.isRequired,
  collection: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.array
  }),
  item: PropTypes.object.isRequired
};

export default ParentCollections;
