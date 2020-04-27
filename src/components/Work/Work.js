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
  const [adminSetItems, setAdminSetItems] = useState([]);
  const [collection, setCollection] = useState({
    id: "",
    title: "",
    items: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getApiData() {
      if (!work) {
        return;
      }
      console.log("work", work);

      // TODO: Make this work
      /*
      const adminSetItems = await getAdminSets(work.admin_set.id);
      let collectionResponse = await getCollections(work);

      if (collectionResponse.items) {
        setCollection({ ...collectionResponse });
      }

      setAdminSetItems(adminSetItems);
      setLoading(false);
      */
    }
    getApiData();
  }, [work]);

  async function getAdminSets(adminSetId) {
    let sources = await elasticsearchApi.getAdminSetItems(adminSetId, 4);

    return elasticsearchParser.prepPhotoGridItems(
      sources,
      globalVars.IMAGE_MODEL
    );
  }

  async function getCollections(work) {
    if (work.collection.length === 0) {
      return {};
    }

    const sources = await elasticsearchApi.getCollectionItems(
      work.collection[0].id,
      4
    );
    let items = elasticsearchParser.prepPhotoGridItems(
      sources,
      globalVars.IMAGE_MODEL
    );

    return {
      id: work.collection[0].id,
      title: elasticsearchParser.getESTitle(work.collection[0]),
      items
    };
  }

  return (
    <div>
      <LargeFeature item={work} />
      <LoadingSpinner loading={loading} />
      <ParentCollections
        item={work}
        adminSetItems={adminSetItems}
        collection={collection}
      />
      <WorkItemDetail item={work} />
    </div>
  );
};

Work.propTypes = {
  work: PropTypes.object.isRequired
};

export default Work;
