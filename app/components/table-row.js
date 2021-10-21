import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  tagName: 'tr',
  classNames: 'table-row',

  checkboxCheckedState: computed('isSelectedAllCheckboxChecked', 'noOfFilesSelected', function() {
    const currFileId = get(this, 'file.id');
    const currSelectedArray = get(this, 'selectedFileArr');

    return get(this, 'isSelectedAllCheckboxChecked') || (currSelectedArray && currSelectedArray.includes(currFileId));
  }),

  actions: {
    /**
     * set the checkbox state based on isAvailable state.
     * @param {Object} file file object associated with the row user clicked on
     * @param {Object} e    Click event object
     */
    onCheckboxClick(file, e) {
      const targetState = e.target.checked;
      this.onRowClick(get(file, 'id'), targetState);
    }
  }
});
