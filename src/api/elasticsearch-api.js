import { ELASTICSEARCH_PROXY_BASE } from "../services/global-vars";
import store from "../store";

const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
  host: ELASTICSEARCH_PROXY_BASE + "/search",
  //log: 'trace'
});
const PAGE_SIZE = 500;
const getObjBase = {
  index: "meadow",
  headers: authHeader(),
};
const sortKey = {
  sort: [
    {
      modifiedDate: {
        order: "desc",
      },
    },
  ],
};

function authHeader(headers = {}) {
  let result = {};
  let state = store.getState();
  if (state.auth.token) {
    result["Authorization"] = "Bearer " + state.auth.token;
  }
  return { ...headers, ...result };
}

store.subscribe(() => {
  getObjBase.headers = authHeader();
});

async function search(query_hash, retries = 8) {
  try {
    return await client.search(query_hash);
  } catch (err) {
    if (err instanceof elasticsearch.errors.NoConnections) {
      return await search(query_hash, retries - 1);
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
      ...getObjBase,
      body: {
        size: numResults,
        query: {
          function_score: {
            query: {
              bool: {
                must: [
                  {
                    match: {
                      "model.name": "Image",
                    },
                  },
                  {
                    match: {
                      "administrativeMetadata.libraryUnit.id": id,
                    },
                  },
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
      ...getObjBase,
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
    console.log("Error in getAllCollections", error);
    return Promise.resolve([]);
  }
}

export async function getCollection(id) {
  try {
    const response = await client.get({
      ...getObjBase,
      ignore: [404],
      type: "_all",
      id: id,
    });

    return response;
  } catch (error) {
    console.log("Error in elasticsearch-api.js > getCollection", error);
    return Promise.resolve({ error });
  }
}

export async function getCollectionsByKeyword(keyword, numResults = PAGE_SIZE) {
  try {
    const response = await search({
      ...getObjBase,
      body: {
        size: numResults,
        query: {
          bool: {
            must: [
              { match: { "model.name": "Collection" } },
              { match: { keywords: keyword } },
            ],
          },
        },
        ...sortKey,
      },
    });
    return response.hits.hits.map((hit) => hit._source);
  } catch (error) {
    console.log("Error in getCollectionsByKeyword()", error);
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
      ...getObjBase,
      body: {
        size: numResults,
        query: {
          function_score: {
            query: {
              bool: {
                must: [
                  { match: { "model.name": "Image" } },
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
    console.log("Error in getCollectionItems()", error);
    return Promise.resolve([]);
  }
}

export async function getFeaturedCollections(numResults = PAGE_SIZE) {
  try {
    const response = await search({
      ...getObjBase,
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
        ...sortKey,
      },
    });

    return response.hits.hits.map((hit) => hit._source);
  } catch (error) {
    console.log("Error in getCollectionsByKeyword()", error);
    return Promise.resolve([]);
  }
}

export async function getItem(id) {
  try {
    const response = await client.get({
      ...getObjBase,
      ignore: [404], // Handle not found errors within the response itself
      type: "_all",
      id: id,
    });

    return response;
  } catch (error) {
    console.log("Error in getItem() in elasticsearch-api.js: ", error);
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
      ...getObjBase,
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
    console.log(`Error in getLegacyPidItem(): ${e}`);
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
      ...getObjBase,
      body: {
        size: numResults,
        query: {
          bool: {
            must: [
              {
                match: {
                  "model.name": "Image",
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
        ...sortKey,
      },
    });

    return response.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
    }));
  } catch (error) {
    console.log("Error in getRecentlyDigitizedItems()", error);
  }
}

export async function getTotalItemCount() {
  try {
    const response = await search({
      ...getObjBase,
      body: {
        query: {
          match_all: {},
        },
      },
    });

    return response.hits.total;
  } catch (e) {
    return Promise.resolve(0);
  }
}

export async function getSharedItem(id) {
  try {
    let response = await client.get({
      index: "shared_links",
      id,
    });
    console.log(`response`, response);

    return response;
  } catch (e) {
    console.error(`e`, e);
  }
}
