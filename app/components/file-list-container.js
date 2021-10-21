import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { countOccurrence } from './../utils/array-utils';
import CONSTANTS from './../utils/global-constants';
import { inject } from '@ember/service';

export default Component.extend({
  classNames: 'file-container',
  intl: inject(),
  /**
   * file information array passed in from parent
   */
  fileList: null,

  /**
   * An array of file ids that are selected
   */
  selectedFileArr: null,

  /**
   * Boolean that determines if role alert is set on
   * selected count content.
   */
  isRoleAlertSet: false,

  /**
   * Boolean that conveys state of selected all checkbox
   */
  isSelectedAllCheckboxChecked: false,

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
   * count associated with the number of files 
   * selected at any point in time
   */
  noOfFilesSelected: computed('noOfFilesSelected', 'isSelectedAllCheckboxChecked', 'isIndeterminate', function() {
    const selectedFileArr = get(this, 'selectedFileArr');
    return (selectedFileArr && get(selectedFileArr, 'length')) || 0;
  }),

  /**
   * content presented to the user based 
   * on the selected file count.
   */
  fileCountText: computed('noOfFilesSelected', function() {
    const intlServ = get(this, 'intl');
    return get(this, 'noOfFilesSelected') ? intlServ.t('selectedCount', {noOfFilesSelected: get(this,'noOfFilesSelected')}): intlServ.t('noneSelected')
  }),

  /**
   * add the newly selected file Id to selectedFileArr if it doesn't exist.
   * @param {Array} selectedFileArr Array with selected fileIds
   * @param {String} fileId         Newly selected file Id
   * @returns {Array}               Modified Array with newly selected file.
   */
  addSelectedFile(selectedFileArr, fileId) {
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
  setSelectAllCheckboxState(len) {
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

  /**
   * set selectedFileArr based on select all checkbox state.
   * @param {Boolean} selectedAllCheckboxState current select all checkbox checked status
   */
  initializeSelectedArr(selectedAllCheckboxState) {
    let arr;
    if(selectedAllCheckboxState) {
      arr = [];  
      get(this, 'fileList').map((file)=> {
        get(file, 'isAvailable') && arr.push(file.id);
      })
    }
    set(this, 'selectedFileArr', arr);
  },

  /**
   * set a role alert on the file count container
   * this helps announce selected file count to user when it changes
   */
  announceFilesSelected() {
    const contEl = document.getElementById('select-file-count');
    contEl.setAttribute('role', 'alert');
    set(this, 'isRoleAlertSet', true);
  },

  /**
   * init hook
   * Set the initial state of selectedFileArr
   */
  init() {
    this._super(...arguments);

    this.initializeSelectedArr(get(this, 'isSelectedAllCheckboxChecked'));
  },

  actions: {
    /**
     * set the selected file fields based on whether a row was selected/unselected.
     * also adjust the select all checkbox state based on number of files selected.
     * set a role alert on the file count container if not already set.
     * @param {String} fileId       fileId the user interacted with
     * @param {Boolean} isSelected  check state of the file user interacted with
     */
    onRowClick(fileId, isSelected) {
      let modifArr;
      if(isSelected) {
        modifArr = this.addSelectedFile(this.selectedFileArr, fileId);
      } else {
        modifArr = this.removeSelectedFile(this.selectedFileArr, fileId);
      }
      const arrLen = get(modifArr, 'length');

      set(this,'selectedFileArr', modifArr);
      this.setSelectAllCheckboxState(arrLen);
      !this.isRoleAlertSet && this.announceFilesSelected();
    },

    /**
     * set isSelectedAllCheckboxChecked based on checkbox state.
     * reinitialize selectedFileArr.
     * set a role alert on the file count container if not already set.
     * @param {Object} e Checkbox Click Event
     */
    onSelectAllClick(e) {
      const checkedState = e.target.checked;

      set(this, 'isIndeterminate', false);
      set(this, 'isSelectedAllCheckboxChecked', checkedState);
      this.initializeSelectedArr(checkedState);
      !this.isRoleAlertSet && this.announceFilesSelected();
    }
  }

});
