const types = [
  {
    value: 'feat',
    name: 'feat:  A new feature'
  },
  {
    value: 'fix',
    name: 'fix:  A bug fix'
  },
  {
    value: 'docs',
    name: 'docs:  Documentation ONLY changes'
  },
  {
    value: 'style',
    name: 'style:  stylistic changes CSS/SCSS'
  },
  {
    value: 'refactor',
    name: 'refactor:  A change that neither fixes a bug nor adds a feature'
  },
  {
    value: 'test',
    name: 'test:  Write tests!'
  },
  {
    value: 'chore',
    name: 'chore:  A change to the build process or auxillary tools'
  },
  {
    value: 'revert',
    name: 'revert:  revert a commit'
  }
];

const scope = [].map((name)=>{
  return { name };
});

const scopeOverrides = {
  docs: [
    { name: 'readme' },
    { name: 'contribution' },
    { name: 'conventional' },
    { name: 'code-docs' }
  ],
  style: [
    { name: 'mixin' },
    { name: 'components' },
    { name: 'global' },
    { name: 'vars' },
    { name: 'resets' }
  ],
  refactor: [
    { name: 'linting' },
    { name: 'tech-debt' }
  ],
  test: [
    { name: 'unit' },
    { name: 'integration' },
    { name: 'acceptance' }
  ],
  chore: [
    { name: 'build' },
    { name: 'package.json' },
    { name: 'lockfile' },
    { name: 'eslintrc' },
    { name: 'eslintignore' },
    { name: 'templatelintrc' },
    { name: 'stylelintrc' },
    { name: 'gitignore' },
    { name: 'commitizen' },
    { name: 'jenkins' },
    { name: 'terraform' }
  ]
};

module.exports = {
  types,
  scopes,
  scopeOverrides,
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'refactor']
};