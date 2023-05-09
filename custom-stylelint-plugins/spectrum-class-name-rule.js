const stylelint = require('stylelint');

const ruleName = 'custom-rule/spectrum-class-name';
const messages = stylelint.utils.ruleMessages(ruleName, {
  wrongCapitalization: (className) =>
    `Class name "${className}" should follow the SUIT-style naming conventions with the ".spectrum" prefix.`,
});
// style lint pattern which will only check for SUIT patterns 
// and discard any patterns in combination with SUIT and BEM
const excludedElements = /^(p|strong|em|div|span|...)$/; // Add more elements as needed

module.exports = stylelint.createPlugin(ruleName, (enabled) => {
  return (root, result) => {
    if (!enabled) {
      return;
    }

    root.walkRules((rule) => {
      rule.selectors.forEach((selector) => {
        if (selector.startsWith('.') && selector !== '.spectrum' && !excludedElements.test(selector)) {
          const classNames = selector.split('.').slice(1);
          if (classNames.length > 0 && !classNames.every((className) => className.startsWith('spectrum-'))) {
            stylelint.utils.report({
              ruleName,
              result,
              node: rule,
              message: messages.wrongCapitalization(selector),
            });
          }
        }
      });
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
