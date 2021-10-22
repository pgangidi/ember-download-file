import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';

module('Unit | Component | file list container', function(hooks) {
  setupTest(hooks);

  test('when file list container is set with a scheduled and avaulable file', function(assert) {
    const compRef = this.owner.lookup('component:file-list-container');

    compRef.set('fileList', [{
      id: '0',
      name: 'abc',
      device: 'def',
      path: '\\device\\path',
      isScheduled: true,
      status: 'scheduled'
    },
    {
      id: '1',
      name: 'ghi',
      device: 'jkl',
      path: '\\device\\path2',
      isAvailable: true,
      status: 'available'
    }]);

    assert.equal(get(compRef, 'noOfAvailableFiles'), 1, 'noOfAvailableFiles value is 1,');
    assert.equal(get(compRef, 'noOfScheduledFiles'), 1, 'noOfScheduledFiles value is 1,');
    assert.equal(get(compRef, 'noOfFilesSelected'), 0, 'noOfFilesSelected value is 0,');
    assert.equal(get(compRef, 'fileCountText').toString(), 'None Selected', 'fileCountText has right value,');
    assert.equal(compRef.getAlertBoxContent().toString(), 'None Selected', 'getAlertBoxContent returns right content');
  });

  test('when file list container is rendered', function(assert) {
    const compRef = this.owner.lookup('component:file-list-container');

    assert.equal(compRef.isRoleAlertSet, false, 'initial value of isRoleAlertSet is false');
    compRef.announceFilesSelected();
    assert.equal(compRef.isRoleAlertSet, true, 'and set to true after announceFilesSelected is called');
  });

  test('when file list container is set with a scheduled and available file and one file is selected', function(assert) {
    const compRef = this.owner.lookup('component:file-list-container');

    compRef.set('fileList', [{
      id: '0',
      name: 'abc',
      device: 'def',
      path: '\\device\\path',
      isScheduled: true,
      status: 'scheduled'
    },
    {
      id: '1',
      name: 'ghi',
      device: 'jkl',
      path: '\\device\\path2',
      isAvailable: true,
      status: 'available'
    }]);
    compRef.set('noOfFilesSelected', 1);

    assert.equal(get(compRef, 'fileCountText').toString(), 'Selected 1.', 'fileCountText has right value,');
  });

  test('when addSelectedFile is called with empty array', function(assert) {
    const compRef = this.owner.lookup('component:file-list-container');
    const result = compRef.addSelectedFile(null, '1');

    assert.equal(result.length, 1, 'an array of length 1 is returned');
    assert.equal(result[0], '1', 'with the passed in value');
  });

  test('when addSelectedFile is called with an array', function(assert) {
    const compRef = this.owner.lookup('component:file-list-container');
    const result = compRef.addSelectedFile(['2'], '1');

    assert.equal(result.length, 2, 'an array of length 2 is returned');
    assert.equal(result[1], '1', 'with the passed in value as last value');
  });

  test('when removeSelectedFile is called with empty array', function(assert) {
    const compRef = this.owner.lookup('component:file-list-container');
    const result = compRef.removeSelectedFile(null, '1');

    assert.equal(result, null, 'same null value is returned');
  });

  test('when removeSelectedFile is called with an array and a matching value', function(assert) {
    const compRef = this.owner.lookup('component:file-list-container');
    const result = compRef.removeSelectedFile(['2', '1', '3'], '1');

    assert.equal(result.length, 2, 'an array of length 2 is returned');
    assert.equal(result[1], '3', 'with the passed in value removed');
  });

  test('when setSelectAllCheckboxState is called with len eq to noOfAvailableFiles', function(assert) {
    const compRef = this.owner.lookup('component:file-list-container');
    compRef.set('noOfAvailableFiles', 2);
    compRef.setSelectAllCheckboxState(2);

    assert.equal(get(compRef, 'isIndeterminate'), false, 'isIndeterminate is false');
    assert.equal(get(compRef, 'isSelectedAllCheckboxChecked'), true, 'isSelectedAllCheckboxChecked is true');
  });

  test('when setSelectAllCheckboxState is called with len less than noOfAvailableFiles and not zero', function(assert) {
    const compRef = this.owner.lookup('component:file-list-container');
    compRef.set('noOfAvailableFiles', 2);
    compRef.setSelectAllCheckboxState(1);

    assert.equal(get(compRef, 'isIndeterminate'), true, 'isIndeterminate is true');
    assert.equal(get(compRef, 'isSelectedAllCheckboxChecked'), false, 'isSelectedAllCheckboxChecked is false');
  });

  test('when setSelectAllCheckboxState is called with len equal to 0 and less than noOfAvailableFiles', function(assert) {
    const compRef = this.owner.lookup('component:file-list-container');
    compRef.set('noOfAvailableFiles', 2);
    compRef.setSelectAllCheckboxState(0);

    assert.equal(get(compRef, 'isIndeterminate'), false, 'isIndeterminate is false');
    assert.equal(get(compRef, 'isSelectedAllCheckboxChecked'), false, 'isSelectedAllCheckboxChecked is false');
  });

  test('when initializeSelectedArr is called with selectedAllCheckboxState as true', function(assert) {
    const compRef = this.owner.lookup('component:file-list-container');

    compRef.set('fileList', [{
      id: '0',
      name: 'abc',
      device: 'def',
      path: '\\device\\path',
      isScheduled: true,
      status: 'scheduled'
    },
    {
      id: '1',
      name: 'ghi',
      device: 'jkl',
      path: '\\device\\path2',
      isAvailable: true,
      status: 'available'
    }]);
    compRef.initializeSelectedArr(false);

    assert.equal(get(compRef, 'selectedFileArr'), undefined, 'selectedFileArr is undefined');
  });

  test('when initializeSelectedArr is called with selectedAllCheckboxState as true', function(assert) {
    const compRef = this.owner.lookup('component:file-list-container');

    compRef.set('fileList', [{
      id: '0',
      name: 'abc',
      device: 'def',
      path: '\\device\\path',
      isScheduled: true,
      status: 'scheduled'
    },
    {
      id: '1',
      name: 'ghi',
      device: 'jkl',
      path: '\\device\\path2',
      isAvailable: true,
      status: 'available'
    }]);
    compRef.initializeSelectedArr(true);
    const arr = get(compRef, 'selectedFileArr');

    assert.equal(get(arr, 'length'), 1, 'selectedFileArr has length 1');
    assert.equal(arr[0], '1', 'with right value');
  });

  test('when getAlertBoxContent is called with selected files', function(assert) {
    const compRef = this.owner.lookup('component:file-list-container');

    compRef.set('fileList', [{
      id: '0',
      name: 'abc',
      device: 'def',
      path: '\\device\\path',
      isScheduled: true,
      status: 'scheduled'
    },
    {
      id: '1',
      name: 'ghi',
      device: 'jkl',
      path: '\\device\\path2',
      isAvailable: true,
      status: 'available'
    }]);
    compRef.set('selectedFileArr', ['1']);

    const content = compRef.getAlertBoxContent(true);

    assert.equal(content, ' PATH:\\device\\path2  DEVICE:jkl \n', 'it returns the right content');
  });

});