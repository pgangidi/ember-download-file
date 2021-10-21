import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  classNames: 'file-table',
  tagName: 'table',

  /**
   * Number of files selected.
   * Passed down from parent.
   */
  noOfFilesSelected: 0,

  actions: {
    /**
     * set the checkbox state based on isAvailable state.
     * @param {Object} file file object associated with the row user clicked on
     * @param {Object} e    Click event object
     */
    onCheckboxClick(file, e) {
      const targetVal = e.target.checked;
      if(!get(file, 'isAvailable')) {
        e.target.checked = false;
      } else {
        e.target.ariaChecked=`${targetVal}`;
        this.onRowClick(get(file, 'id'), targetVal);
      }
    }
  }
});
