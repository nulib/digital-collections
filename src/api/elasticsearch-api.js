import { ELASTICSEARCH_PROXY_BASE } from '../services/global-vars';
import store from '../store';

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: ELASTICSEARCH_PROXY_BASE + '/search'
  //log: 'trace'
});
const PAGE_SIZE = 500;
const getObjBase = {
  index: 'common',
  headers: authHeader()
};
const sortKey = {
  sort: [
    {
      modified_date: {
        order: 'desc'
      }
    }
  ]
};

function authHeader(headers = {}) {
  let result = {};
  let state = store.getState();
  if (state.auth.token) {
    result['Authorization'] = 'Bearer ' + state.auth.token;
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
      throw err;
    }
  }
}

export async function getAdminSetItems(id, numResults = PAGE_SIZE) {
  const response = await search({
    ...getObjBase,
    body: {
      size: numResults,
      query: {
        bool: {
          must: [
            { match: { 'model.name': 'Image' } },
            { match: { 'admin_set.id': id } }
          ]
        }
      },
      ...sortKey
    }
  });
  return response;
}

export async function getAllCollections(numResults = PAGE_SIZE) {
  const response = await search({
    ...getObjBase,
    body: {
      size: numResults,
      query: {
        bool: {
          must: [
            { match: { 'model.name': 'Collection' } },
            {
              match: { 'collection_type_idd.title.keyword': 'NUL Collection' }
            }
          ]
        }
      },
      sort: [
        {
          'title.primary.keyword': {
            order: 'asc'
          }
        }
      ]
    }
  });
  return response;
}

export async function getCollection(id) {
  const response = await client.get({
    ...getObjBase,
    ignore: [404],
    type: '_all',
    id: id
  });

  return response;
}

export async function getCollectionsByKeyword(keyword, numResults = PAGE_SIZE) {
  const response = await search({
    ...getObjBase,
    body: {
      size: numResults,
      query: {
        bool: {
          must: [
            { match: { 'model.name': 'Collection' } },
            {
              match: { 'collection_type_idd.title.keyword': 'NUL Collection' }
            },
            { match: { keyword: keyword } }
          ]
        }
      },
      ...sortKey
    }
  });

  return response;
}

export async function getCollectionItems(id, numResults = PAGE_SIZE) {
  const response = await search({
    ...getObjBase,
    body: {
      size: numResults,
      query: {
        bool: {
          must: [
            { match: { 'model.name': 'Image' } },
            { match: { 'collection.id': id } }
          ]
        }
      },
      ...sortKey
    }
  });
  return response;
}

export async function getItem(id) {
  try {
    const response = await client.get({
      ...getObjBase,
      ignore: [404], // Handle not found errors within the response itself
      type: '_all',
      id: id
    });

    return response;
  } catch (error) {
    console.log('Error in getItem() in elasticsearch-api.js: ', error);
    const errorObject = {
      error: {
        reason:
          error.statusCode === 403
            ? 'Authorized access only.'
            : 'Unknown error getting Item',
        statusCode: error.statusCode || -1
      }
    };
    return Promise.resolve(errorObject);
  }
}

/**
 * Get all Work items from indexer
 * @param {Number} numResults - Function caller can specify how many results they want back
 */
export async function getRecentlyDigitizedItems(numResults = PAGE_SIZE) {
  const response = await search({
    ...getObjBase,
    body: {
      size: numResults,
      query: {
        match: { 'model.name': 'Image' }
      },
      ...sortKey
    }
  });
  return response;
}

export async function getTotalItemCount() {
  try {
    const response = await search({
      ...getObjBase,
      body: {
        query: {
          match_all: {}
        }
      }
    });

    return response.hits.total;
  } catch (e) {
    return Promise.resolve(0);
  }
}

export async function getMemberIdsForImages(id) {
  try {
    const response = await search({
      ...getObjBase,
      body: {
        query: [
          { match: { 'model.name': 'Image' } },
          { match: { 'collection.id': id } }
        ],
        size: 0,
        aggs: {
          members: {
            terms: { field: 'member_ids.keyword', size: 10000 }
          }
        }
      }
    });
    const members = response.aggregations.members.buckets.map(
      member => member.key
    );

    return members;
  } catch (e) {
    return Promise.resolve(0);
  }
}
