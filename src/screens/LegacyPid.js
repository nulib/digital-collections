import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import UILoadingSpinner from "../components/UI/LoadingSpinner";
import { getLegacyPidItem } from "../api/elasticsearch-api";

function ScreensLegacyPid() {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState();
  const params = useParams();

  useEffect(() => {
    const fn = async () => {
      const id = await getLegacyPidItem(params.pid);
      setId(id);
      setLoading(false);
    };
    fn();
  }, [params.pid]);

  return loading ? (
    <UILoadingSpinner />
  ) : (
    <Redirect to={id ? `/items/${id}` : "/"} />
  );
}

export default ScreensLegacyPid;
