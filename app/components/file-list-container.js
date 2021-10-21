import Component from '@ember/component';
import { computed, get, set, setProperties } from '@ember/object';
import { countOccurrence } from './../utils/array-utils';
import CONSTANTS from './../utils/global-constants';
import { inject } from '@ember/service';

export default Component.extend({
  classNames: 'file-container',
  intl: inject(),
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
  noOfFilesSelected: computed('noOfFilesSelected', 'isSelectedAllCheckboxChecked', 'isIndeterminate', function() {
    const selectedFileArr = get(this, 'selectedFileArr');
    return (selectedFileArr && get(selectedFileArr, 'length')) || 0;
  }),

  fileCountText: computed('noOfFilesSelected', function() {
    const intlServ = get(this, 'intl')
    return get(this, 'noOfFilesSelected') ? intlServ.t('selectedCount', {noOfFilesSelected: get(this,'noOfFilesSelected')}): intlServ.t('noneSelected')
  }),

  /**
   * calculate the number of available files
   * based on 'isAvailable' status
   */
  noOfAvailableFiles: computed('fileList', function() {
    return countOccurrence(get(this, 'fileList'), CONSTANTS.availableKey, true);
  }),

  /**
   * calculate the number of scheduled files
   */
  noOfScheduledFiles: computed('fileList', 'noOfAvailableFiles', function() {
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

    if(len && len === noOfAvailableFiles) {
      set(this, 'isIndeterminate', false);
      set(this, 'isSelectedAllCheckboxChecked', true);
    } else if (len > 0 && noOfAvailableFiles > 0) {
      set(this, 'isIndeterminate', true);
      set(this, 'isSelectedAllCheckboxChecked', false);
    } else {
      set(this, 'isIndeterminate', false);
      set(this, 'isSelectedAllCheckboxChecked', false);
    }
  },

  setSelectedArr(selectedAllCheckboxState) {
    let arr;
    if(selectedAllCheckboxState) {
      arr = [];  
      get(this, 'fileList').map((file)=> {
        get(file, 'isAvailable') && arr.push(file.id);
      })
    }
    set(this, 'selectedFileArr', arr);
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

      set(this,'selectedFileArr', modifArr);
      this.setSelectAllState(arrLen);
    },

    /**
     * set isSelectedAllCheckboxChecked based on checkbox state.
     * @param {Object} e Checkbox Click Event
     */
    onSelectAllClick(e) {
      const checkedState = e.target.checked;

      set(this, 'isIndeterminate', false);
      set(this, 'isSelectedAllCheckboxChecked', checkedState);
      this.setSelectedArr(checkedState);
    }
  }

});
