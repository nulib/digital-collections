export default class MockClient {
  getData(file) {
    return fetch(file)
      .then(response => response.json())
      .then(
        results => {
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
