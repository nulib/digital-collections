import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import UIErrorSection from "../components/UI/ErrorSection";
import { SHARED_ITEM_PROXY_URL } from "../services/global-vars";
import UILoadingSpinner from "../components/UI/LoadingSpinner";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const errorWrapper = css`
  padding-bottom: 3rem;
`;

const loadingWrapper = css`
  display: flex;
  justify-content: center;
`;

export default function ScreensSharedItem() {
  const { sharedLinkId } = useParams();
  const history = useHistory();
  const [fetchErrors, setFetchErrors] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [workData, setWorkData] = useState();

  useEffect(() => {
    fetch(`${SHARED_ITEM_PROXY_URL}${sharedLinkId}`)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);

        // Shared id wasn't found
        if (!data.found) {
          return setFetchErrors(
            `The Shared Link Id (${sharedLinkId}) was not found`
          );
        }

        console.log("data", data);
        setWorkData(data._source);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error fetching Shared item", error);
        setFetchErrors(`Error: Shared Link Id (${sharedLinkId}) doesn't exist`);
      });
  }, []);

  return (
    <div className="standard-page" data-testid="shared-item-wrapper">
      <div id="page" className="search" css={errorWrapper}>
        {isLoading ? (
          <div css={loadingWrapper}>
            <UILoadingSpinner />
          </div>
        ) : (
          <div>
            {fetchErrors && <UIErrorSection message={fetchErrors} />}
            <h1>do it here</h1>
          </div>
        )}
      </div>
    </div>
  );
}
