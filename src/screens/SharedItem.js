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

const testSuccessUrl =
  "http://digital-collections.rdc-staging.library.northwestern.edu/shared/4f00df5b-1ec5-4d64-9c67-6a50bced88b4";

export default function ScreensSharedItem() {
  const { sharedLinkId } = useParams();
  const history = useHistory();
  const [fetchErrors, setFetchErrors] = useState();
  const [isLoading, setIsLoading] = useState(true);

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

        // Success, redirect user to the items page
        history.push(`/items/${data._source.id}`);
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
          fetchErrors && <UIErrorSection message={fetchErrors} />
        )}
      </div>
    </div>
  );
}
