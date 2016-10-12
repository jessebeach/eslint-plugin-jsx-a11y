/**
 * @fileoverview Enforce scope prop is only used on <th> elements.
 * @author Ethan Cohen
 */

 import { propName, elementType } from 'jsx-ast-utils';
 import { generateObjSchema } from '../util/schemas';
 import DOMElements from '../util/attributes/DOM.json';
 import createRule from '../util/helpers/createRule';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

 const schema = generateObjSchema();
 const meta = {
   docs: {},
   schema: [schema],
 };

 const errorMessage = 'The scope prop can only be used on <th> elements.';

 const rule = context => ({
   JSXAttribute: (node) => {
     const name = propName(node);
     if (name && name.toUpperCase() !== 'SCOPE') {
       return;
     }

     const { parent } = node;
     const tagName = elementType(parent);

    // Do not test higher level JSX components, as we do not know what
    // low-level DOM element this maps to.
     if (Object.keys(DOMElements).indexOf(tagName) === -1) {
       return;
     } else if (tagName && tagName.toUpperCase() === 'TH') {
       return;
     }

     context.report({
       node,
       message: errorMessage,
     });
   },
 });

 module.exports = createRule(rule, meta);
