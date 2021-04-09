import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UIErrorSection from "../components/UI/ErrorSection";
import { SHARED_ITEM_PROXY_URL } from "../services/global-vars";
import UILoadingSpinner from "../components/UI/LoadingSpinner";
import { ErrorBoundary } from "react-error-boundary";
import SharedItem from "../components/SharedItem/SharedItem";
import FallbackErrorComponent from "components/UI/FallbackErrorComponent";
import SharedItemNotification from "components/SharedItem/Notification";
import { getSharedItem } from "api/elasticsearch-api";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const loadingWrapper = css`
  display: flex;
  justify-content: center;
  padding: 5rem 0;
`;

export default function ScreensSharedItem() {
  const { sharedLinkId } = useParams();
  const [fetchErrors, setFetchErrors] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [workData, setWorkData] = useState();
  const [sharedLinkData, setSharedLinkData] = React.useState();

  useEffect(() => {
    getSharedItem(sharedLinkId).then((response) => {
      if (response?.found) {
        setSharedLinkData(response._source);
      }
    });

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

        setWorkData(data._source);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error fetching Shared item", error);
        setFetchErrors(`Error: Shared Link Id (${sharedLinkId}) doesn't exist`);
      });
  }, []);

  return (
    <div className="landing-page" data-testid="shared-item-container">
      <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
        {isLoading ? (
          <div css={loadingWrapper}>
            <UILoadingSpinner />
          </div>
        ) : (
          <div>
            {fetchErrors && <UIErrorSection message={fetchErrors} />}
            <>
              {sharedLinkData && (
                <SharedItemNotification
                  expirationDate={sharedLinkData.expires}
                />
              )}
              <SharedItem work={workData} />
            </>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}
