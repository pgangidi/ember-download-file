import Component from '@ember/component';

export default Component.extend({
  classNames: 'file-table',
  tagName: 'table',

  /**
   * Number of files selected.
   * Passed down from parent.
   */
  noOfFilesSelected: 0
});
