import Component from '@ember/component';
import { get, set, setProperties } from '@ember/object';

export default Component.extend({
  tagName: '',
  isIndeterminate: false,
  isChecked: false,
  checkboxCheckedState: false,
  checkboxIndeterminateState: false,
  ariaDisabled: false,
  checkboxId: 'simple-checkbox',
  labelClassNames: '',
  inputClassNames: '',
  labelText: '',

  init() {
    this._super(...arguments);

    const checkedState = get(this, 'isChecked');
    const indeterminateState = get(this, 'isIndeterminate');
    setProperties(this, {
      checkboxCheckedState: checkedState,
      checkboxIndeterminateState: indeterminateState
    });
  },
  didUpdateAttrs() {
    this._super(...arguments);

    const checkedState = get(this, 'isChecked');
    const indeterminateState = get(this, 'isIndeterminate');
    setProperties(this, {
      checkboxCheckedState: checkedState,
      checkboxIndeterminateState: indeterminateState
    });
    const checkboxEl = document.getElementById(this.checkboxId);
    checkboxEl.checked = checkedState;
  },
  actions: {
    onCheckBoxClick: function(e){
      this.ariaDisabled && (e.target.checked = false);
      set(this, 'checkboxCheckedState', e.target.checked);
      this.onClick && this.onClick(e);
    }
  }
});
