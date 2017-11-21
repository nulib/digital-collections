export default class MockClient {

  constructor() {

  }

  getData(file) {
    return fetch(file, {
      headers : {
        "Content-Type": "application/json",
        "Accept": "application/json"
       }
    }).then(response => response.json())
    .catch(err => console.error(err.toString()));

  };

}
