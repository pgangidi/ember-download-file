import Component from '@ember/component';
import { get, set, setProperties } from '@ember/object';

export default Component.extend({
  tagName: '',
  isIndeterminate: false,
  isChecked: false,
  isDisabled: false,
  checkboxId: 'simple-checkbox',
  labelClassNames: '',
  inputClassNames: '',
  labelText: '',

  didInsertElement() {
    this._super(...arguments);

    this.setCheckboxStates();
  },

  didUpdateAttrs() {
    this._super(...arguments);

    this.setCheckboxStates();
  },

  setCheckboxStates(){
    const checkedState = get(this, 'isChecked');
    const isDisabled = get(this, 'isDisabled');

    const checkboxEl = document.getElementById(this.checkboxId);
    checkboxEl.checked = checkedState;
    isDisabled && (checkboxEl.disabled = true);
  },

  actions: {
    onCheckBoxClick: function(e){
      this.onClick && this.onClick(e);
    }
  }
});
