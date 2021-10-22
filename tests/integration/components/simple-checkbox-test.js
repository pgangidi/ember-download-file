import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-checkbox', 'Integration | Component | simple checkbox', {
  integration: true
});

test('when disabled checkbox is rendered', async function(assert) {
  await this.render(hbs`
    {{simple-checkbox
      isDisabled=true
      inputClassNames='test-input-classname'
      labelClassNames='test-label-classname'
      labelText='test label'
    }}
  `);
  const checkboxEl = document.getElementById('simple-checkbox');
  const labelClassNameEl = document.getElementsByClassName('test-label-classname')[0];

  assert.ok(checkboxEl, 'then simple-checkbox is the id assigned to the checkbox,');
  assert.equal(checkboxEl.disabled, true, 'it is disabled,');
  assert.equal(checkboxEl.checked, false, 'it is not checked,');
  assert.equal(checkboxEl.indeterminate, false, 'it is not indeterminate,');
  assert.equal(checkboxEl.ariaDisabled, 'true', 'it has the right aria-disabled value,');
  assert.equal(checkboxEl.ariaChecked, 'false', 'it has the right aia-checked value,');
  assert.equal(checkboxEl.className, 'test-input-classname', 'it has the right classname,');
  assert.ok(labelClassNameEl, 'label has the right class name');
  assert.equal(labelClassNameEl.innerText.trim(), 'test label', 'and label also has the right content');
});

test('when checked checkbox is rendered', async function(assert) {
  await this.render(hbs`
    {{simple-checkbox
      isChecked=true
      inputClassNames='test-input-classname'
      labelClassNames='test-label-classname'
      labelText='test label'
    }}
  `);
  const checkboxEl = document.getElementById('simple-checkbox');
  const labelClassNameEl = document.getElementsByClassName('test-label-classname')[0];

  assert.ok(checkboxEl, 'then simple-checkbox is the id assigned to the checkbox,');
  assert.equal(checkboxEl.disabled, false, 'it is not disabled,');
  assert.equal(checkboxEl.checked, true, 'it is checked,');
  assert.equal(checkboxEl.indeterminate, false, 'it is not indeterminate,');
  assert.equal(checkboxEl.ariaDisabled, 'false', 'it has the right aria-disabled value,');
  assert.equal(checkboxEl.ariaChecked, 'true', 'it has the right aia-checked value,');
  assert.equal(checkboxEl.className, 'test-input-classname', 'it has the right classname,');
  assert.ok(labelClassNameEl, 'label has the right class name');
  assert.equal(labelClassNameEl.innerText.trim(), 'test label', 'and label also has the right content');
});

test('when indeterminate checkbox is rendered', async function(assert) {
  await this.render(hbs`
    {{simple-checkbox
      isIndeterminate=true
      inputClassNames='test-input-classname'
      labelClassNames='test-label-classname'
      labelText='test label'
    }}
  `);
  const checkboxEl = document.getElementById('simple-checkbox');
  const labelClassNameEl = document.getElementsByClassName('test-label-classname')[0];

  assert.ok(checkboxEl, 'then simple-checkbox is the id assigned to the checkbox,');
  assert.equal(checkboxEl.disabled, false, 'it is not disabled,');
  assert.equal(checkboxEl.checked, false, 'it is not checked,');
  assert.equal(checkboxEl.indeterminate, true, 'it is indeterminate,');
  assert.equal(checkboxEl.ariaDisabled, 'false', 'it has the right aria-disabled value,');
  assert.equal(checkboxEl.ariaChecked, 'mixed', 'it has the right aia-checked value,');
  assert.equal(checkboxEl.className, 'test-input-classname', 'it has the right classname,');
  assert.ok(labelClassNameEl, 'label has the right class name');
  assert.equal(labelClassNameEl.innerText.trim(), 'test label', 'and label also has the right content');
});