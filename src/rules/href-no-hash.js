/**
 * @fileoverview Enforce links may not point to just #.
 * @author Ethan Cohen
 */

 import { getProp, getPropValue, elementType } from 'jsx-ast-utils';
 import { generateObjSchema, arraySchema } from '../util/schemas';
 import createRule from '../util/helpers/createRule';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

 const schema = generateObjSchema({
   components: arraySchema,
   specialLink: arraySchema,
 });
 const meta = {
   docs: {},
   schema: [schema],
 };

 const errorMessage = 'Links must not point to "#". ' +
  'Use a more descriptive href or use a button instead.';

 const rule = context => ({
   JSXOpeningElement: (node) => {
     const options = context.options[0] || {};
     const componentOptions = options.components || [];
     const typesToValidate = ['a'].concat(componentOptions);
     const nodeType = elementType(node);

    // Only check 'a' elements and custom types.
     if (typesToValidate.indexOf(nodeType) === -1) {
       return;
     }

     const propOptions = options.specialLink || [];
     const propsToValidate = ['href'].concat(propOptions);
     const values = propsToValidate
      .map(prop => getProp(node.attributes, prop))
      .map(prop => getPropValue(prop));

     values.forEach((value) => {
       if (value === '#') {
         context.report({
           node,
           message: errorMessage,
         });
       }
     });
   },
 });

 module.exports = createRule(rule, meta);
