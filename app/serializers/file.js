import DS from 'ember-data';
import CONSTANTS from './../utils/global-constants';
import { sortPayload } from './../utils/array-utils';
export default DS.RESTSerializer.extend({

  /**
   * Ember hook to normalize payload returned.
   * @param   {Object}  store              Store service.
   * @param   {Object}  primaryModelClass  Model Class.
   * @param   {Array}   payload            Payload Array.
   * @param   {Null}    id                 null in this scenario.
   * @param   {String}  requestType        'findAll' in this scenario.
   * @returns {Array}                      Normalized payload response.
   */
  normalizeFindAllResponse (store, primaryModelClass, payload, id, requestType) {
    let attributes = {};

    if(payload) {
      sortPayload(payload, CONSTANTS.defaultTableSortKey, CONSTANTS.apiConfig.ascending);
      attributes[primaryModelClass.modelName] = payload;
    } else {
      attributes.errors = payload || [{errorCode: CONSTANTS.defaultErrorCode}];
    }

    return this._super(store, primaryModelClass, attributes, id, requestType)
  }
});