/**
 * @fileoverview Enforce <marquee> elements are not used.
 * @author Ethan Cohen
 */

import { elementType } from 'jsx-ast-utils';
import createRule from '../util/helpers/createRule';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage =
  'Do not use <marquee> elements as they create accessibility issues and are deprecated.';

const rule = context => ({
  JSXOpeningElement: node => {
    const isMarquee = elementType(node) === 'marquee';

    if (isMarquee) {
      context.report({
        node,
        message: errorMessage,
      });
    }
  },
});

module.exports = createRule(rule);
