/**
 * @fileoverview Enforce no accesskey attribute on element.
 * @author Ethan Cohen
 */

import { getProp, getPropValue } from 'jsx-ast-utils';
import createRule from '../util/helpers/createRule';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = 'No access key attribute allowed. Inconsistencies ' +
  'between keyboard shortcuts and keyboard comments used by screenreader ' +
  'and keyboard only users create a11y complications.';

const rule = context => ({
  JSXOpeningElement: node => {
    const accessKey = getProp(node.attributes, 'accesskey');
    const accessKeyValue = getPropValue(accessKey);

    if (accessKey && accessKeyValue) {
      context.report({
        node,
        message: errorMessage,
      });
    }
  },
});

module.exports = createRule(rule);
