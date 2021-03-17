import React, { useState, useEffect } from "react";
import * as elasticsearchApi from "../../api/elasticsearch-api.js";
import WorkItemDetail from "../../components/Work/ItemDetail";
import * as elasticsearchParser from "../../services/elasticsearch-parser";
import * as globalVars from "../../services/global-vars";
import LoadingSpinner from "../UI/LoadingSpinner";
import ParentCollections from "../../components/Work/ParentCollections";
import LargeFeature from "../../components/Work/LargeFeature";
import PropTypes from "prop-types";

const Work = ({ work }) => {
  const [libraryUnitItems, setLibraryUnitItems] = useState([]);
  const [collection, setCollection] = useState({
    id: "",
    title: "",
    items: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getApiData() {
      if (!work) {
        return;
      }
      if (work.administrativeMetadata.libraryUnit) {
        const libraryUnitItems = await getLibraryUnits(
          work.administrativeMetadata.libraryUnit.id
        );
        setLibraryUnitItems(libraryUnitItems);
      }

      let collectionResponse = await getCollections(work);
      if (collectionResponse) {
        setCollection({ ...collectionResponse });
      }

      setLoading(false);
    }
    getApiData();
  }, [work]);

  async function getLibraryUnits(libraryUnitId) {
    let sources = await elasticsearchApi.getLibraryUnitItems(libraryUnitId, 4);

    return elasticsearchParser.prepPhotoGridItems(
      sources,
      globalVars.IMAGE_MODEL
    );
  }

  async function getCollections(work) {
    if (Object.keys(work.collection).length === 0) {
      return {};
    }

    const sources = await elasticsearchApi.getCollectionItems(
      work.collection.id,
      4
    );

    let items = elasticsearchParser.prepPhotoGridItems(
      sources,
      globalVars.IMAGE_MODEL
    );

    return {
      id: work.collection.id,
      title: work.collection.title,
      items,
    };
  }

  return (
    <div data-testid="work-component">
      <LargeFeature item={work} />
      <LoadingSpinner loading={loading} />
      <ParentCollections
        item={work}
        libraryUnitItems={libraryUnitItems}
        collection={collection}
      />
      <WorkItemDetail item={work} />
    </div>
  );
};

Work.propTypes = {
  work: PropTypes.object.isRequired,
};

export default Work;
