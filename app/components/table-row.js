import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  classNames: 'table-row',
  tagName: 'tr',

  /**
   * file information Object.
   * Passed down from parent
   */
  file: null,

  /**
   * Index associated with the file object passed down.
   */
  indx: 0,

  /**
   * action called after a row click / file selected.
   * Passed down from parent.
   */
  onRowClick: null,

  /**
   * An array of file ids that are selected.
   * Passed down from parent.
   */
  selectedFileArr: null,

  /**
   * Number of files selected.
   * Passed down from parent.
   */
  noOfFilesSelected: 0,

  /**
   * Boolean that conveys state of selected all checkbox
   * Passed down from parent.
   */
  isSelectedAllCheckboxChecked: false,

  /**
   * determine the checked state of available file
   * based on whether selected all checkbox is checked
   * and whether user manually selected the checkbox.
   */
  checkboxCheckedState: computed('isSelectedAllCheckboxChecked', 'noOfFilesSelected', function() {
    const currFileId = get(this, 'file.id');
    const currSelectedArray = get(this, 'selectedFileArr');

    return get(this, 'isSelectedAllCheckboxChecked') || (currSelectedArray && currSelectedArray.includes(currFileId));
  }),

  actions: {
    /**
     * let parent know when a file is selected/ unselected.
     * @param {Object} file file object associated with the row user clicked on
     * @param {Object} e    Click event object
     */
    onCheckboxClick(file, e) {
      const targetState = e.target.checked;
      this.onRowClick && this.onRowClick(get(file, 'id'), targetState);
    }
  }
});
