import React from "react";
import PhotoGrid from "../UI/PhotoGrid";
import PropTypes from "prop-types";
import ThisItem from "./ThisItem";
import SectionTop from "../UI/SectionTop";
import { FACET_SENSORS_ADMINISTRATIVE } from "services/reactive-search";

const ParentCollections = ({ libraryUnitItems = [], collection, item }) => {
  if (!item) return;

  const libraryDepartment = item.administrativeMetadata.libraryUnit
    ? item.administrativeMetadata.libraryUnit.label
    : "";
  return (
    <div>
      {libraryUnitItems.length > 0 && (
        <section className="section" data-testid="section-library-department">
          <SectionTop
            sectionTitle="Library Department"
            optionalSubhead={libraryDepartment}
            optionalButtons={[
              {
                label: "View All Items in Library Department",
                url: "/search",
                state: {
                  facet: FACET_SENSORS_ADMINISTRATIVE.find(
                    (facet) => facet.componentId === "LibraryDepartment"
                  ),
                  searchValue: libraryDepartment,
                },
              },
            ]}
          />
          <PhotoGrid items={libraryUnitItems} hideDescriptions={true} />
        </section>
      )}

      {collection.items && collection.items.length > 0 && (
        <section data-testid="section-collection">
          <SectionTop
            sectionTitle="Collection"
            optionalSubhead={collection.title}
            optionalButtons={[
              {
                label: "View All Items in Collection",
                url: `/collections/${collection.id}`,
              },
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
  libraryUnitItems: PropTypes.array.isRequired,
  collection: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.array,
  }),
  item: PropTypes.object.isRequired,
};

export default ParentCollections;
