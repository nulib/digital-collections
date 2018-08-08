const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'http://localhost:9201',
  log: 'trace'
});

export async function getItem(id) {
  try {
    const response = await client.get({
      index: 'common',
      ignore: [404],
      type: '_all',
      id: id
    });
    return response;
  } catch (error) {
    return {
      error: true,
      statusText: error.message
    };
  }
}
