import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Route.extend({
  intl: inject(),

  beforeModel(transition) {
    this._super(...arguments);
    
    this.redirectToProfile(transition);
  },

  model() {
    this._super(...arguments);

    return {
      name: 'Priyanka Gangidi',
    }
  },

  
  redirectToProfile(transition){
    const targetRouteName = get(transition, 'targetName');
    if(targetRouteName && targetRouteName === 'index') {
      this.transitionTo('file-list');
    }
  }

});
