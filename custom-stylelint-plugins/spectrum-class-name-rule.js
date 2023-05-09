const stylelint = require('stylelint');

const ruleName = 'custom-rule/spectrum-class-name';
const messages = stylelint.utils.ruleMessages(ruleName, {
  wrongCapitalization: (className) =>
    `Class name "${className}" should follow the SUIT-style naming conventions with the ".spectrum" prefix.`,
});

// style lint pattern which will only check for SUIT patterns 
// and discard any patterns in combination with SUIT and BEM
const suitPattern = /^\.spectrum-[A-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$/;
const suitBemPattern = /^\.spectrum-[A-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*(--?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)*$/;

module.exports = stylelint.createPlugin(ruleName, (enabled) => {
  return (root, result) => {
    if (!enabled) {
      return;
    }

    root.walkRules((rule) => {
      rule.selectors.forEach((selector) => {
        if (
          selector !== '.spectrum' &&
          !suitBemPattern.test(selector) &&
          suitPattern.test(selector) === false
        ) {
          stylelint.utils.report({
            ruleName,
            result,
            node: rule,
            message: messages.wrongCapitalization(selector),
          });
        }
      });
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
