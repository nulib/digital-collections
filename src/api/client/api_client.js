export default class ApiClient {

  constructor() {
    // local solr
    this.api_base = 'http://localhost:8983/solr/hydra-development/select?'

  }

  search(strQuery) {
    return fetch(this.api_base + strQuery, {
      headers : {
        "Content-Type": "application/json",
        "Accept": "application/json"
       }
    }).then(response => response.json())
    .catch(err => console.error(err.toString()));

  };

}
