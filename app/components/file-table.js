import Component from '@ember/component';

export default Component.extend({
  classNames: 'file-table',
  tagName: 'table',
  /**
   * file information array.
   * Passed down from parent
   */
  fileList: null,

  /**
   * number of available files based on 'isAvailable' status.
   * Passed down from parent.
   */
  noOfAvailableFiles: 0,

  /**
   * Boolean that conveys state of selected all checkbox
   * Passed down from parent.
   */
  isSelectedAllCheckboxChecked: false,

  /**
   * An array of file ids that are selected.
   * Passed down from parent.
   */
  selectedFileArr: null,

  /**
   * action called after a row click / file selected.
   * Passed down from parent.
   */
  onRowClick: null,

  /**
   * Number of files selected.
   * Passed down from parent.
   */
  noOfFilesSelected: 0
});
