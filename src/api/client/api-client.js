export default class ApiClient {
  constructor() {
    this.apiBase = 'http://localhost:8983/solr/hydra-development/select?';
  }

  search(strQuery) {
    return fetch(this.apiBase + strQuery)
      .then(response => response.json())
      .then(
        results => {
          console.log(results);
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
