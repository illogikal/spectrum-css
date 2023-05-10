const stylelint = require('stylelint');

const ruleName = 'custom-rule/no-missing-var';

const plugin = stylelint.createPlugin(ruleName, (enabled, options) => {
  return (root, result) => {
    root.walkDecls((decl) => {
      const value = decl.value.replace(/\s/g, '');
      const regex = /(?<!var\()(--\S+)\)/g;
      let match;
      while ((match = regex.exec(value)) !== null) {
        const varName = match[1];
        const message = `Missing 'var' before custom property "${varName}"`;
        stylelint.utils.report({ message, node: decl, result, ruleName });
      }
    });
  };
});

module.exports = plugin;
