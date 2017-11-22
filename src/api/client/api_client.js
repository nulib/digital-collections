export default class ApiClient {

  constructor() {

    this.api_base = 'http://localhost:8983/solr/hydra-development/select?'

  }

  search(strQuery) {
    return fetch(this.api_base + strQuery, {
      headers : {
        "Content-Type": "application/json",
        "Accept": "application/json"
       }
    }).then(this.handleErrors)
      .then(response => response.json())
      .then(results => {
        console.log(results)
        return results;
    })
    .catch(err => console.error(err.toString()));

  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

}
