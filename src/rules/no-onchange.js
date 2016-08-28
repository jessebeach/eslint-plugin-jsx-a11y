/**
 * @fileoverview Enforce usage of onBlur over onChange for accessibility.
 * @author Ethan Cohen
 */

import { getProp, elementType } from 'jsx-ast-utils';
import createRule from '../util/helpers/createRule';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = 'onBlur must be used instead of onchange, ' +
  'unless absolutely necessary and it causes no negative consequences ' +
  'for keyboard only or screen reader users.';

const applicableTypes = [
  'select',
  'option',
];

const rule = context => ({
  JSXOpeningElement: node => {
    const nodeType = elementType(node);

    if (applicableTypes.indexOf(nodeType) === -1) {
      return;
    }

    const onChange = getProp(node.attributes, 'onChange');
    const hasOnBlur = getProp(node.attributes, 'onBlur') !== undefined;

    if (onChange && !hasOnBlur) {
      context.report({
        node,
        message: errorMessage,
      });
    }
  },
});

module.exports = createRule(rule);
