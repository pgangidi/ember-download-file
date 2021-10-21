import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  classNames: 'simple-checkbox',
  tagName: '',

  /**
   * Boolean to determine if checkbox is in indeterminate state.
   */
  isIndeterminate: false,

  /**
   * Boolean to determine if checkbox should be checked.
   */
  isChecked: false,

  /**
   * Boolean to determine if checkbox should be disabled.
   */
  isDisabled: false,

  /**
   * default checkbox id.
   */
  checkboxId: 'simple-checkbox',

  /**
   * class names for label.
   */
  labelClassNames: '',

  /**
   * class names for checkbox.
   */
  inputClassNames: '',

  /**
   * label content for checkbox.
   */
  labelText: '',

  /**
   * set the checked and disabled state of checkbox.
   */
  setCheckboxStates(){
    const checkedState = get(this, 'isChecked');
    const isDisabled = get(this, 'isDisabled');
    const checkboxEl = document.getElementById(this.checkboxId);

    checkboxEl.checked = checkedState;
    isDisabled && (checkboxEl.disabled = true);
  },

  /**
   * update checkbox states on initial load.
   */
  didInsertElement() {
    this._super(...arguments);

    this.setCheckboxStates();
  },

  /**
   * update checkbox states when attr values change.
   */
  didUpdateAttrs() {
    this._super(...arguments);

    this.setCheckboxStates();
  },

  actions: {
    /**
     * call parent hook if passed in
     * @param {Object} e checkbox click event object 
     */
    onCheckBoxClick: function(e){
      this.onClick && this.onClick(e);
    }
  }
});
