/**
 * @fileoverview Enforce label tags have htmlFor attribute.
 * @author Ethan Cohen
 */

 import { getProp, getPropValue, elementType } from 'jsx-ast-utils';
 import { generateObjSchema, arraySchema } from '../util/schemas';
 import createRule from '../util/helpers/createRule';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

 const schema = generateObjSchema({ components: arraySchema });
 const meta = {
   docs: {},
   schema: [schema],
 };

 const errorMessage = 'Form controls using a label to identify them must be ' +
  'programmatically associated with the control using htmlFor';

 const rule = context => ({
   JSXOpeningElement: (node) => {
     const options = context.options[0] || {};
     const componentOptions = options.components || [];
     const typesToValidate = ['label'].concat(componentOptions);
     const nodeType = elementType(node);

    // Only check 'label' elements and custom types.
     if (typesToValidate.indexOf(nodeType) === -1) {
       return;
     }

     const htmlForAttr = getProp(node.attributes, 'htmlFor');
     const htmlForValue = getPropValue(htmlForAttr);
     const isInvalid = htmlForAttr === false || !htmlForValue;

     if (isInvalid) {
       context.report({
         node,
         message: errorMessage,
       });
     }
   },
 });

 module.exports = createRule(rule, meta);
