import Component from '@ember/component';
import { computed, get, set, setProperties } from '@ember/object';
import { countOccurrence } from './../utils/array-utils';
import CONSTANTS from './../utils/global-constants';

export default Component.extend({
  classNames: 'file-container',

  /**
   * file array passed in from parent
   */
  fileList: null,

  /**
   * An array of file ids that are selected
   */
  selectedFileArr: null,

  /**
   * Boolean that sets state of selected all checkbox
   */
  isSelectedAllCheckboxChecked: false,

  /**
   * count associated with the number of files 
   * selected at any point in time
   */
  noOfFilesSelected: 0,

  /**
   * calculate the number of available files
   * based on 'isAvailable' status
   */
  noOfAvailableFiles: computed('fileList','fileList.length', function() {
    return countOccurrence(this.fileList, CONSTANTS.availableKey, true);
  }),

  /**
   * calculate the number of scheduled files
   */
  noOfScheduledFiles: computed('fileList','fileList.length', 'noOfAvailableFiles', function() {
    return this.fileList.length - get(this, 'noOfAvailableFiles');
  }),

  /**
   * add the newly selected file Id to selectedFileArr if it doesn't exist.
   * @param {Array} selectedFileArr Array with selected fileIds
   * @param {String} fileId         Newly selected file Id
   * @returns {Array}               Modified Array with newly selected file.
   */
  setSelectedFile(selectedFileArr, fileId) {
    if(selectedFileArr) {
      !selectedFileArr.includes(fileId) && selectedFileArr.push(fileId);
    } else {
      selectedFileArr = selectedFileArr || [];
      selectedFileArr.push(fileId); 
    }
    return selectedFileArr;
  },

  /**
   * remove the file Id from selectedFileArr if it exists.
   * @param {Array} selectedFileArr Array with selected fileIds
   * @param {String} fileId         Unselected File Id
   * @returns {Array}               Modified Array with fieldId removed
   */
  removeSelectedFile(selectedFileArr, fileId) {
    if(selectedFileArr) {
      const indx = selectedFileArr.indexOf(fileId);
      (indx !== -1) && selectedFileArr.splice(indx, 1);
    }

    return selectedFileArr;
  },

  /**
   * set the state of select all checkbox 
   * @param {Number} len length of selected files Array
   */
  setSelectAllState(len) {
    const noOfAvailableFiles = get(this, 'noOfAvailableFiles');
    const selectAllCheckBox = document.getElementById('selectall-checkbox');

    if(len && len === noOfAvailableFiles) {
      selectAllCheckBox.indeterminate = false;
      selectAllCheckBox.checked = true;
      set(this, 'isSelectedAllCheckboxChecked', true);
    } else if (len > 0 && noOfAvailableFiles > 0) {
      selectAllCheckBox.checked = false;
      selectAllCheckBox.indeterminate = true;
      set(this, 'isSelectedAllCheckboxChecked', false);
    } else {
      selectAllCheckBox.indeterminate = false;
      selectAllCheckBox.checked = false;
      set(this, 'isSelectedAllCheckboxChecked', false);
    }
  },

  actions: {
    /**
     * set the selected file fields based on whether a row was selected/unselected.
     * @param {String} fileId       fileId the user interacted with
     * @param {Boolean} isSelected  check state of the file user interacted with
     */
    onRowClick(fileId, isSelected) {
      let modifArr;
      if(isSelected) {
        modifArr = this.setSelectedFile(this.selectedFileArr, fileId);
      } else {
        modifArr = this.removeSelectedFile(this.selectedFileArr, fileId);
      }
      const arrLen = get(modifArr, 'length');

      setProperties(this, {
        selectedFileArr: modifArr,
        noOfFilesSelected: arrLen
      });
      this.setSelectAllState(arrLen);
    },

    /**
     * set isSelectedAllCheckboxChecked based on checkbox state.
     * @param {Object} e Checkbox Click Event
     */
    onSelectAllClick(e) {
      set(this, 'isSelectedAllCheckboxChecked', e.target.value);
    }
  }

});
