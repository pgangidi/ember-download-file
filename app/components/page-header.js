import Component from '@ember/component';

export default Component.extend({
  classNames: 'page-header',
  tagName: 'section',

  init() {
    this._super(...arguments);
    const headerEl = document.getElementById('page-header');
    headerEl && headerEl.focus();
  },
})