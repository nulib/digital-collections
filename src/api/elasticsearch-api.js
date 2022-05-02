import { ELASTICSEARCH_PROXY_BASE } from "../services/global-vars";
import store from "../store";

const PAGE_SIZE = 500;

/**
 * API Network request default config
 */
const defaultRequestConfig = {
  method: "POST",
  headers: authHeader({
    "Content-Type": "application/json",
  }),
};

/**
 * Default ElasticSearch sort parameter
 */
const sortKey = {
  sort: [
    {
      modifiedDate: {
        order: "desc",
      },
    },
  ],
};

/**
 * Helper function to build network request authorization headers
 * @param {object} headers Initial headers config
 * @returns {object} Network authorization headers
 */
function authHeader(headers = {}) {
  let result = {};
  let state = store.getState();
  if (state.auth.token) {
    result["Authorization"] = "Bearer " + state.auth.token;
  }
  const response = { ...headers, ...result };
  return response;
}

/**
 * Update application values in Redux store?
 */
store.subscribe(() => {
  defaultRequestConfig.headers = authHeader({
    "Content-Type": "application/json",
  });
});

/**
 * Wrapper for Elasticsearch API /search network requests
 * @param {object} requestConfig Fetch API request params
 * @param {number} retries In case of network error, retry a given amount of times
 * @returns {Promise}
 */
async function search(requestConfig, retries = 8) {
  const url = `${ELASTICSEARCH_PROXY_BASE}/search/meadow/_search`;
  const body = JSON.stringify(requestConfig.body || {});

  try {
    const response = await fetch(url, {
      ...requestConfig,
      body,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    if (err instanceof elasticsearch.errors.NoConnections) {
      return await search(requestConfig, retries - 1);
    } else {
      throw new Error(`Error in elasticsearch-api.js: ${err}`);
    }
  }
}

/**
 * Retrieve random admin set items from Elasticsearch index
 * @param {String} id
 * @param {Number} numResults
 * @returns {Array}
 */
export async function getLibraryUnitItems(id, numResults = PAGE_SIZE) {
  try {
    const response = await search({
      ...defaultRequestConfig,
      body: {
        size: numResults,
        query: {
          function_score: {
            query: {
              bool: {
                must: [
                  { match: { "model.name": "Work" } },
                  { match: { "administrativeMetadata.libraryUnit.id": id } },
                ],
              },
            },
            boost: "5",
            random_score: {},
            boost_mode: "multiply",
          },
        },
      },
    });
    const esSources = response.hits.hits.map((hit) => hit._source);
    return esSources;
  } catch (error) {
    console.error(`Error in getAdminSetItems()`, error);
    return Promise.resolve([]);
  }
}

export async function getAllCollections(numResults = PAGE_SIZE) {
  try {
    const response = await search({
      ...defaultRequestConfig,
      body: {
        size: numResults,
        query: {
          bool: {
            must: [
              {
                match: {
                  "model.name": "Collection",
                },
              },
              {
                match: {
                  "model.application": "Meadow",
                },
              },
            ],
          },
        },
        sort: {
          "title.keyword": "asc",
        },
      },
    });
    return response.hits.hits.map((hit) => ({ id: hit._id, ...hit._source }));
  } catch (error) {
    console.error("Error in getAllCollections", error);
    return Promise.resolve([]);
  }
}

export async function getCollection(id) {
  try {
    const response = await fetch(
      `${ELASTICSEARCH_PROXY_BASE}/search/meadow/_all/${id}`,
      {
        ...defaultRequestConfig,
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in elasticsearch-api.js > getCollection", error);
    return Promise.resolve({ error });
  }
}

export async function getCollectionsByKeywords(
  keywords,
  numResults = PAGE_SIZE
) {
  const queryKeywords = keywords
    .map((keyword) => {
      return `keywords:${keyword}`;
    })
    .join(" OR ");

  try {
    const response = await search({
      ...defaultRequestConfig,
      body: {
        query: {
          query_string: {
            query: `model.name:collection AND (${queryKeywords})`,
          },
        },
        collapse: {
          field: "keywords.keyword",
          inner_hits: {
            name: "collection_results",
            size: numResults,
            _source: [
              "descriptiveMetadata",
              "id",
              "model",
              "representativeImage",
              "title",
            ],
          },
        },
        _source: ["keywords"],
        ...sortKey,
      },
    });
    return response.hits.hits.map((hit) => {
      return {
        keyword: hit._source.keywords.join(),
        hits: hit.inner_hits.collection_results.hits.hits.map(
          (hit) => hit._source
        ),
      };
    });
  } catch (error) {
    console.error("Error in getCollectionsByKeyword()", error);
    return Promise.resolve([]);
  }
}

/**
 * Retrieve random collection items
 * @param {String} id
 * @param {Number} numResults
 * @returns {Array} Array of Elasticsearch hit sources
 */
export async function getCollectionItems(id, numResults = PAGE_SIZE) {
  try {
    const response = await search({
      ...defaultRequestConfig,
      body: {
        size: numResults,
        query: {
          function_score: {
            query: {
              bool: {
                must: [
                  { match: { "model.name": "Work" } },
                  { match: { "collection.id": id } },
                ],
              },
            },
            boost: "5",
            random_score: {},
            boost_mode: "multiply",
          },
        },
      },
    });
    return response.hits.hits.map((hit) => hit._source);
  } catch (error) {
    console.error("Error in getCollectionItems()", error);
    return Promise.resolve([]);
  }
}

export async function getFeaturedCollections(numResults = PAGE_SIZE) {
  try {
    const response = await search({
      ...defaultRequestConfig,
      body: {
        size: numResults,
        query: {
          bool: {
            must: [
              { match: { "model.name": "Collection" } },
              { match: { featured: true } },
            ],
          },
        },
        _source: ["descriptiveMetadata", "id", "representativeImage", "title"],
        ...sortKey,
      },
    });

    return response.hits.hits.map((hit) => hit._source);
  } catch (error) {
    console.error("Error in getFeaturedCollections()", error);
    return Promise.resolve([]);
  }
}

export async function getItem(id) {
  try {
    const response = await fetch(
      `${ELASTICSEARCH_PROXY_BASE}/search/meadow/_all/${id}`,
      {
        ...defaultRequestConfig,
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getItem() in elasticsearch-api.js: ", error);
    const errorObject = {
      error: {
        reason:
          error.statusCode === 403
            ? "Authorized access only."
            : "Unknown error getting Item",
        statusCode: error.statusCode || -1,
      },
    };
    return Promise.resolve(errorObject);
  }
}

export async function getLegacyPidItem(pid) {
  try {
    const response = await search({
      ...defaultRequestConfig,
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  "descriptiveMetadata.legacyIdentifier.keyword": pid,
                },
              },
            ],
          },
        },
      },
    });
    const id = response.hits.hits[0]._source.id;
    return id;
  } catch (e) {
    console.error(`Error in getLegacyPidItem(): ${e}`);
    return Promise.resolve();
  }
}

/**
 * Get all Work items from indexer
 * @param {Number} numResults - Function caller can specify how many results they want back
 */
export async function getRecentlyDigitizedItems(numResults = PAGE_SIZE) {
  try {
    const response = await search({
      ...defaultRequestConfig,
      body: {
        size: numResults,
        query: {
          bool: {
            must: [
              { match: { "model.name": "Work" } },
              {
                match: {
                  "model.application": "Meadow",
                },
              },
            ],
          },
        },
        _source: [
          "descriptiveMetadata",
          "model",
          "representativeFileSet",
          "workType",
        ],
        ...sortKey,
      },
    });

    return response.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
    }));
  } catch (error) {
    console.error("Error in getRecentlyDigitizedItems()", error);
  }
}

export async function getTotalItemCount() {
  try {
    const response = await search({
      ...defaultRequestConfig,
      body: {
        query: {
          match_all: {},
        },
      },
    });

    return response.hits.total === "object"
      ? response.hits.total.value
      : response.hits.total;
  } catch (e) {
    return Promise.resolve(0);
  }
}

export async function getSharedItem(id) {
  try {
    const response = await fetch(
      `${ELASTICSEARCH_PROXY_BASE}/search/shared_links/_all/${id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(`Error in getSharedItem()`, e);
  }
}
