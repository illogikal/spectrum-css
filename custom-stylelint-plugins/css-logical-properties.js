const stylelint = require('stylelint');
const { report, ruleMessages, validateOptions } = stylelint.utils;

const ruleName = 'custom-rule/no-logical-properties';
const messages = ruleMessages(ruleName, {
  expected: logicalProp => `Unexpected usage of logical property "${logicalProp}"`,
});

const logicalProps = [
  'inset-block-start',
  'inset-inline-end',
  'inset-block-end',
  'margin-inline',
  'inset-inline-start',
  'margin-block-start',
  'margin-inline-end',
  'margin-block-end',
  'margin-inline-start',

  'padding-block-start',
  'padding-inline-end',
  'padding-block-end',
  'padding-inline-start',

  'inline-size',
  'min-inline-size',
  'max-inline-size',
  'block-size',
  'min-block-size',
  'max-block-size'
];

module.exports = stylelint.createPlugin(ruleName, function getPlugin(primaryOption, secondaryOptionObject, context) {
  return function lint(postcssRoot, postcssResult) {
    const validOptions = validateOptions(postcssResult, ruleName, {
      actual: primaryOption,
      possible: [true],
    });

    if (!validOptions) {
      return;
    }

    const isAutoFixing = Boolean(context.fix);

    postcssRoot.walkDecls(decl => {
      logicalProps.forEach(logicalProp => {
        if (decl.prop === logicalProp) {
          if (isAutoFixing) {
            const physicalProp = logicalProp.replace('-inline', '');
            const newValue = decl.value.replace(logicalProp, physicalProp);
            if (decl.raws.value) {
              decl.raws.value.raw = newValue;
            } else {
              decl.value = newValue;
            }
          } else {
            report({
              ruleName,
              result: postcssResult,
              message: messages.expected(logicalProp),
              node: decl,
              word: logicalProp,
            });
          }
        }
      });
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
