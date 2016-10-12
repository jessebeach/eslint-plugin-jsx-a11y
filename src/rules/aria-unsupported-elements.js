/**
 * @fileoverview Enforce that elements that do not support ARIA roles,
 *  states and properties do not have those attributes.
 * @author Ethan Cohen
 */

 import { elementType, propName } from 'jsx-ast-utils';
 import { generateObjSchema } from '../util/schemas';
 import DOM from '../util/attributes/DOM.json';
 import ARIA from '../util/attributes/ARIA.json';
 import createRule from '../util/helpers/createRule';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

 const schema = generateObjSchema();
 const meta = {
   docs: {},
   schema: [schema],
 };

 const errorMessage = invalidProp =>
  `This element does not support ARIA roles, states and properties. \
Try removing the prop '${invalidProp}'.`;

 const rule = context => ({
   JSXOpeningElement: (node) => {
     const nodeType = elementType(node);
     const nodeAttrs = DOM[nodeType] || {};
     const {
      reserved: isReservedNodeType = false,
    } = nodeAttrs;

    // If it's not reserved, then it can have ARIA-* roles, states, and properties
     if (isReservedNodeType === false) {
       return;
     }

     const invalidAttributes = Object.keys(ARIA).concat('ROLE');

     node.attributes.forEach((prop) => {
       if (prop.type === 'JSXSpreadAttribute') {
         return;
       }

       const name = propName(prop);
       const normalizedName = name ? name.toUpperCase() : '';

       if (invalidAttributes.indexOf(normalizedName) > -1) {
         context.report({
           node,
           message: errorMessage(name),
         });
       }
     });
   },
 });

 module.exports = createRule(rule, meta);
