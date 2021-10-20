const { scopes, types, allowCustomScopes } = require('./commitizen.config.js');

const validScopes = scopes.map((scope) => scope.name);
const validTypes = types.map((type) => type.value);

module.exports = {
  rules : {
    'body-leading-blank': [2, 'always'],
    'header-max-length': [2, 'always', 150],
    'scope-case': [0, 'always', 'lowerCase'],
    'scope-empty': [2, 'never'],
    'subject-case': [0, 'always', 'lowerCase'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lowerCase'],
    'type-empty': [2, 'never'],
    'scope-enum': [ allowCustomScopes ? 1 : 2, 'always', validScopes],
    'type-enum': [2, 'always', validTypes]
  }
};