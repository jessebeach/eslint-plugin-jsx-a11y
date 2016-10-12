/**
 * @fileoverview Enforce no accesskey attribute on element.
 * @author Ethan Cohen
 */

 import { getProp, getPropValue } from 'jsx-ast-utils';
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

 const errorMessage = 'No access key attribute allowed. Inconsistencies ' +
  'between keyboard shortcuts and keyboard comments used by screenreader ' +
  'and keyboard only users create a11y complications.';

 const rule = context => ({
   JSXOpeningElement: (node) => {
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

 module.exports = createRule(rule, meta);
