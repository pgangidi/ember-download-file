import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('file-list-container', 'Integration | Component | file list container', {
  integration: true
});

test('when file list container is rendered with an array with default values', function(assert) {
  this.fileList = [{
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
  }]
  this.render(hbs`{{
    file-list-container
    fileList=fileList
  }}`);

  const selectAllEl = document.getElementById('selectall-checkbox');
  const countEl = document.getElementById('select-file-count');
  const downloadBttn = document.getElementsByClassName('file-container__download-button')[0];
  const tableEl = document.getElementsByClassName('file-table')[0];
  const captionEl = tableEl.getElementsByTagName('caption')[0];
  const headerEls = tableEl.getElementsByTagName('th');
  const tableCells = tableEl.getElementsByTagName('td');
  const row1Checkbox = document.getElementById('checkbox-input0');
  const row2Checkbox = document.getElementById('checkbox-input1');

  assert.ok(selectAllEl, 'then select all checkbox is rendered,')
  assert.equal(selectAllEl.checked, false, 'it should be unchecked,');
  assert.equal(selectAllEl.ariaChecked, 'false', 'it should have right aria-checked value,');
  assert.equal(selectAllEl.ariaDisabled, 'false', 'it should have the right aria-disabled value,');
  assert.ok(countEl, 'the count element is rendered');
  assert.equal(countEl.innerText.trim(), 'None Selected', 'with right content');
  assert.ok(downloadBttn, 'the download button is rendered');
  assert.equal(downloadBttn.innerText.trim(), 'Download Selected', 'with right content');
  assert.ok(tableEl, 'table is rendered,');
  assert.ok(captionEl, 'table caption is rendered');
  assert.equal(captionEl.innerText.trim(), 'Available and Scheduled Files listed below.1 files available to download.0 files selected to download.', 'table caption has the right content');
  assert.equal(headerEls.length, 5, 'with 5 table headers');
  assert.equal(headerEls[0].innerText.trim(), 'select file', 'first header content is right');
  assert.equal(headerEls[1].innerText.trim(), 'Name', 'second header content is right');
  assert.equal(headerEls[2].innerText.trim(), 'Device', 'third header content is right');
  assert.equal(headerEls[3].innerText.trim(), 'Path', 'forth header content is right');
  assert.equal(headerEls[4].innerText.trim(), 'Status', 'fifth header content is right');
  assert.equal(tableCells.length, 10, 'table renders 10 cells');
  assert.equal(tableCells[0].innerText.trim(), 'file abc is unavailable for download', 'first cell content is right');
  assert.ok(row1Checkbox, 'then scheduled checkbox is rendered,')
  assert.equal(row1Checkbox.checked, false, 'it should be unchecked,');
  assert.equal(row1Checkbox.ariaChecked, 'false', 'it should have right aria-checked value,');
  assert.equal(row1Checkbox.ariaDisabled, 'true', 'it should have the right aria-disabled value,');
  assert.ok(row2Checkbox, 'then available checkbox is rendered,')
  assert.equal(row2Checkbox.checked, false, 'it should be unchecked,');
  assert.equal(row2Checkbox.ariaChecked, 'false', 'it should have right aria-checked value,');
  assert.equal(row2Checkbox.ariaDisabled, 'false', 'it should have the right aria-disabled value,');
  assert.equal(tableCells[1].innerText.trim(), 'abc', 'second cell content is right');
  assert.equal(tableCells[2].innerText.trim(), 'def', 'third cell content is right');
  assert.equal(tableCells[3].innerText.trim(), '\\device\\path', 'forth cell content is right');
  assert.equal(tableCells[4].innerText.trim(), 'Scheduled', 'fifth cell content is right');
  assert.equal(tableCells[5].innerText.trim(), 'select to mark file for download ghi', 'sixth cell content is right');
  assert.equal(tableCells[6].innerText.trim(), 'ghi', 'seventh cell content is right');
  assert.equal(tableCells[7].innerText.trim(), 'jkl', 'eigth cell content is right');
  assert.equal(tableCells[8].innerText.trim(), '\\device\\path2', 'ninth cell content is right');
  assert.equal(tableCells[9].innerText.trim(), 'Available', 'tenth cell content is right');
});

test('when file list container is rendered with an array and selected all checked', function(assert) {
  this.fileList = [{
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
  }]
  this.render(hbs`{{
    file-list-container
    fileList=fileList
    isSelectedAllCheckboxChecked=true
  }}`);

  const selectAllEl = document.getElementById('selectall-checkbox');
  const countEl = document.getElementById('select-file-count');
  const downloadBttn = document.getElementsByClassName('file-container__download-button')[0];
  const tableEl = document.getElementsByClassName('file-table')[0];
  const captionEl = tableEl.getElementsByTagName('caption')[0];
  const headerEls = tableEl.getElementsByTagName('th');
  const tableCells = tableEl.getElementsByTagName('td');
  const row1Checkbox = document.getElementById('checkbox-input0');
  const row2Checkbox = document.getElementById('checkbox-input1');

  assert.ok(selectAllEl, 'then select all checkbox is rendered,')
  assert.equal(selectAllEl.checked, true, 'it should be checked,');
  assert.equal(selectAllEl.ariaChecked, 'true', 'it should have right aria-checked value,');
  assert.equal(selectAllEl.ariaDisabled, 'false', 'it should have the right aria-disabled value,');
  assert.ok(countEl, 'the count element is rendered');
  assert.equal(countEl.innerText.trim(), 'Selected 1.', 'with right content');
  assert.ok(downloadBttn, 'the download button is rendered');
  assert.equal(downloadBttn.innerText.trim(), 'Download Selected', 'with right content');
  assert.ok(tableEl, 'table is rendered,');
  assert.ok(captionEl, 'table caption is rendered');
  assert.equal(captionEl.innerText.trim(), 'Available and Scheduled Files listed below.1 files available to download.1 files selected to download.', 'table caption has the right content');
  assert.equal(headerEls.length, 5, 'with 5 table headers');
  assert.equal(headerEls[0].innerText.trim(), 'select file', 'first header content is right');
  assert.equal(headerEls[1].innerText.trim(), 'Name', 'second header content is right');
  assert.equal(headerEls[2].innerText.trim(), 'Device', 'third header content is right');
  assert.equal(headerEls[3].innerText.trim(), 'Path', 'forth header content is right');
  assert.equal(headerEls[4].innerText.trim(), 'Status', 'fifth header content is right');
  assert.equal(tableCells.length, 10, 'table renders 10 cells');
  assert.equal(tableCells[0].innerText.trim(), 'file abc is unavailable for download', 'first cell content is right');
  assert.ok(row1Checkbox, 'then scheduled checkbox is rendered,')
  assert.equal(row1Checkbox.checked, false, 'it should be unchecked,');
  assert.equal(row1Checkbox.ariaChecked, 'false', 'it should have right aria-checked value,');
  assert.equal(row1Checkbox.ariaDisabled, 'true', 'it should have the right aria-disabled value,');
  assert.ok(row2Checkbox, 'then available checkbox is rendered,')
  assert.equal(row2Checkbox.checked, true, 'it should be checked,');
  assert.equal(row2Checkbox.ariaChecked, 'true', 'it should have right aria-checked value,');
  assert.equal(row2Checkbox.ariaDisabled, 'false', 'it should have the right aria-disabled value,');
  assert.equal(tableCells[1].innerText.trim(), 'abc', 'second cell content is right');
  assert.equal(tableCells[2].innerText.trim(), 'def', 'third cell content is right');
  assert.equal(tableCells[3].innerText.trim(), '\\device\\path', 'forth cell content is right');
  assert.equal(tableCells[4].innerText.trim(), 'Scheduled', 'fifth cell content is right');
  assert.equal(tableCells[5].innerText.trim(), 'select to mark file for download ghi', 'sixth cell content is right');
  assert.equal(tableCells[6].innerText.trim(), 'ghi', 'seventh cell content is right');
  assert.equal(tableCells[7].innerText.trim(), 'jkl', 'eigth cell content is right');
  assert.equal(tableCells[8].innerText.trim(), '\\device\\path2', 'ninth cell content is right');
  assert.equal(tableCells[9].innerText.trim(), 'Available', 'tenth cell content is right');
});
