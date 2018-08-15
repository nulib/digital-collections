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
