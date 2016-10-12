/**
 * @fileoverview Enforce <marquee> elements are not used.
 * @author Ethan Cohen
 */

 import { elementType } from 'jsx-ast-utils';
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

 const errorMessage =
  'Do not use <marquee> elements as they create accessibility issues and are deprecated.';

 const rule = context => ({
   JSXOpeningElement: (node) => {
     const isMarquee = elementType(node) === 'marquee';

     if (isMarquee) {
       context.report({
         node,
         message: errorMessage,
       });
     }
   },
 });

 module.exports = createRule(rule, meta);
