import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  /**
   * redirect to default route on initial load.
   * @param {Object} transition route transition object
   */
  redirectToProfile(transition){
    const targetRouteName = get(transition, 'targetName');
    if(targetRouteName && targetRouteName === 'index') {
      this.transitionTo('file-list');
    }
  },

  /**
   * use before model hook to redirect to default route.
   * @param {Object} transition route transition object
   */
  beforeModel(transition) {
    this._super(...arguments);
    
    this.redirectToProfile(transition);
  }
});
