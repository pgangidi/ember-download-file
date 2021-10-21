import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  store: inject(),

  /**
   * Fetches the file list before route loads.
   * @returns {Object} Store with File information.
   */
  model() {
    this._super(...arguments);

    return this.store.findAll('file');
  }
});
