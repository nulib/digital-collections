import React, { useState, useEffect } from "react";
import Breadcrumbs from "../UI/Breadcrumbs/Breadcrumbs";
import PhotoGrid from "../UI/PhotoGrid";
import LoadingSpinner from "../UI/LoadingSpinner";
import { getAllCollections } from "../../api/elasticsearch-api";
import { prepPhotoGridItems } from "../../services/elasticsearch-parser";
import * as globalVars from "../../services/global-vars";

const { title } = globalVars.ROUTES.COLLECTIONS_ALL;
const breadcrumbItems = [
  { title: "Collections", link: "collections" },
  { title, link: "/" }
];

const CollectionList = () => {
  const [allCollections, setAllCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollections();
  }, []);

  async function getCollections() {
    let response = await getAllCollections(100);

    // Prep the data for PhotoGrid
    let allCollections = prepPhotoGridItems(
      response,
      globalVars.COLLECTION_MODEL
    );
    allCollections.forEach(collection => {
      collection.description = collection.description || [];
    });
    setAllCollections(allCollections);
    setFilteredCollections(allCollections);
    setLoading(false);
  }

  const handleFilterChange = e => {
    const filterValue = e.target.value.toUpperCase();

    if (!filterValue) {
      return setFilteredCollections(allCollections);
    }
    const filteredList = filteredCollections.filter(collection => {
      return collection.label.toUpperCase().indexOf(filterValue) > -1;
    });
    setFilteredCollections(filteredList);
  };

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="contain-1120">
        <h2>{title}</h2>
        <form className="web-form">
          <input
            onChange={handleFilterChange}
            placeholder="Filter collections"
            data-testid="input-collection-filter"
          />
        </form>
        <LoadingSpinner loading={loading} />
        <PhotoGrid items={filteredCollections} cols={4} />
      </div>
    </>
  );
};

export default CollectionList;
