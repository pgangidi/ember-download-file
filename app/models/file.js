import DS from 'ember-data';
import { computed, get } from '@ember/object';
import CONFIG from '../utils/global-constants';

export default DS.Model.extend({
  name: DS.attr('string'),
  device: DS.attr('string'),
  path: DS.attr('string'),
  status: DS.attr('string'),
  /**
   * converting status from string to boolean
   * for ease of comparison
   */
  isScheduled: computed('status', function() {
    return get(this, 'status').toUpperCase() === CONFIG.fileStatus.scheduled;
  }),
  /**
   * converting status from string to boolean
   * for ease of comparison
   */
  isAvailable: computed('status', function() {
    return get(this, 'status').toUpperCase() === CONFIG.fileStatus.available;
  })
});
