export default class MockClient {
  getData(file) {
    return fetch(file, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(
        results => {
          console.log('mock client data', results);
          return results;
        },
        error => {
          const data = {};
          data.error = error;
          return data;
        }
      );
  }
}
