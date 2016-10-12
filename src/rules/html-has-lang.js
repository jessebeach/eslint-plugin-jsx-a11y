/**
 * @fileoverview Enforce html element has lang prop.
 * @author Ethan Cohen
 */

 import { elementType, getProp, getPropValue } from 'jsx-ast-utils';
 import { generateObjSchema } from '../util/schemas';
 import createRule from '../util/helpers/createRule';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

 const schema = generateObjSchema();
 const meta = {
   docs: {},
   schema: [schema],
 };

 const errorMessage = '<html> elements must have the lang prop.';

 const rule = context => ({
   JSXOpeningElement: (node) => {
     const type = elementType(node);

     if (type && type !== 'html') {
       return;
     }

     const lang = getPropValue(getProp(node.attributes, 'lang'));

     if (lang) {
       return;
     }

     context.report({
       node,
       message: errorMessage,
     });
   },
 });

 module.exports = createRule(rule, meta);
