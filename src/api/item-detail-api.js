export default class ItemDetailApi {

  getMetadata() {
    return fetch('/json/item-detail.json', {
      headers : {
        "Content-Type": "application/json",
        "Accept": "application/json"
       }
    }).then(response => response.json())
      .then(results => {
        console.log(results)
        return results;
      })
      .catch(err => console.error(err.toString()));
  };

}
