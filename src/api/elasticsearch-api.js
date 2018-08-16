import { ELASTIC_SEARCH_ENDPOINT } from '../services/global-vars';

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: ELASTIC_SEARCH_ENDPOINT,
  log: 'trace'
});

export async function getItem(id) {
  const response = await client.get({
    index: 'common',
    ignore: [404],
    type: '_all',
    id: id
  });
  return response;
}

export async function getCollection(id) {
  const response = await client.get({
    index: 'common',
    ignore: [404],
    type: '_all',
    id: id
  });
  return response;
}

export async function getAllCollections() {
  const response = await client.search({
    index: 'common',
    q: 'model.name:Collection'
  });
  return response;
}

export async function getCollectionItems(id) {
  const response = await client.search({
    index: 'common',
    body: {
      query: {
        bool: {
          must: [
            { match: { 'model.name': 'Image' } },
            { match: { 'collection.id': id } }
          ]
        }
      }
    }
  });
  return response;
}

export async function getCollectionsByKeyword(keyword) {
  const response = await client.search({
    index: 'common',
    body: {
      query: {
        bool: {
          must: [
            { match: { 'model.name': 'Collection' } },
            { match: { keyword: keyword } }
          ]
        }
      }
    }
  });
  return response;
}

export async function getRecentlyDigitizedItems() {
  const response = await client.search({
    index: 'common',
    q: 'model.name:Image'
  });
  return response;
}
