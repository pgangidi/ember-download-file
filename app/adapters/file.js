import DS from 'ember-data';
import CONSTANTS from './../utils/global-constants';

export default DS.RESTAdapter.extend({
  /**
   * Base URL for API.
   * @type {String}
   */
  host: CONSTANTS.apiConfig.hostURL,

  /**
   * Namespace for API.
   * @type {String}
   */
  namespace:  CONSTANTS.apiConfig.namespace,

  /**
   * Returns API URL for fetching file Information.
   * @returns {String}
   */
  urlForFindAll() {
    return `${this.host}${this.namespace}${CONSTANTS.apiConfig.fileListAPIURL}`;
  }
});