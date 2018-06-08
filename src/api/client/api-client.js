import fetch from 'cross-fetch';
import { SOLR_BASE } from '../../services/global-vars';

export default class ApiClient {
  async search(strQuery) {
    const response = await fetch(SOLR_BASE + strQuery);
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
