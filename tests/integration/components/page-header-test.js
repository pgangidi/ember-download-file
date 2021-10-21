import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('page-header', {
  integration: true
});

test('when page header renders', async function(assert) {
  await this.render(hbs`
    {{page-header}}
  `);

  const headerEl = document.getElementById('page-header');
  const headerText = headerEl.innerText.trim();

  assert.ok(headerEl, 'then header is rendered');
  assert.equal(headerText, 'Hello, this is Priyanka Gangidi.', 'with right content,');
});