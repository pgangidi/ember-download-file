import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNames: 'page-header',
  tagName: 'section'
})