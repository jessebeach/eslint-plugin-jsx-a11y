/**
 * @fileoverview Enforce non-interactive elements have no interactive handlers.
 * @author Ethan Cohen
 */

import { hasAnyProp, elementType } from 'jsx-ast-utils';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
import isInteractiveElement from '../util/isInteractiveElement';
import createRule from '../util/helpers/createRule';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage =
  'Visible, non-interactive elements should not have mouse or keyboard event listeners';

const rule = context => ({
  JSXOpeningElement: node => {
    const props = node.attributes;
    const type = elementType(node);

    const interactiveProps = [
      'onclick',
      'ondblclick',
      'onkeydown',
      'onkeyup',
      'onkeypress',
    ];

    if (isHiddenFromScreenReader(type, props)) {
      return;
    } else if (isInteractiveElement(type, props)) {
      return;
    } else if (hasAnyProp(props, interactiveProps) === false) {
      return;
    }

    // Visible, non-interactive elements should not have an interactive handler.
    context.report({
      node,
      message: errorMessage,
    });
  },
});

module.exports = createRule(rule);
