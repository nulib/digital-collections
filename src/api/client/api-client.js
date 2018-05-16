import fetch from 'cross-fetch';

export default class ApiClient {
  constructor() {
    this.apiBase = '/solr/development-core/select?';
  }

  async search(strQuery) {
    const response = await fetch(this.apiBase + strQuery);
    if (!response.ok) {
      return {
        error: true,
        statusText: response.statusText,
        url: response.url
      };
    }
    const json = await response.json();
    return json;
  }
}
