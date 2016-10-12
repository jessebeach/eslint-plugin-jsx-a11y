/**
 * @fileoverview Enforce anchor elements to contain accessible content.
 * @author Lisa Ring & Niklas Holmberg
 */

 import { elementType, hasAnyProp } from 'jsx-ast-utils';
 import { arraySchema, generateObjSchema } from '../util/schemas';
 import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader';
 import createRule from '../util/helpers/createRule';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

 const schema = generateObjSchema({ components: arraySchema });
 const meta = {
   docs: {},
   schema: [schema],
 };

 const errorMessage =
    'Anchors must have content and the content must be accessible by a screen reader.';

// Rule options override global settings if set.
 function resolveElementsToCheck(context = {}) {
   // Global settings
   const globalSettings = context.settings || {};
   const componentGlobalOptions = globalSettings.components && globalSettings.components.a;
   // Rule options
   const ruleOptions = context.options[0] || {};
   const componentRuleOptions = ruleOptions.components;

   const componentOptions = componentRuleOptions || componentGlobalOptions;
   return ['a'].concat(componentOptions);
 }

 const rule = context => ({
   JSXOpeningElement: (node) => {
     const typeCheck = resolveElementsToCheck(context);
     const nodeType = elementType(node);

    // Only check anchor elements and custom types.
     if (typeCheck.indexOf(nodeType) === -1) {
       return;
     }
     const isAccessible = node.parent.children.some((child) => {
       switch (child.type) {
         case 'Literal':
           return Boolean(child.value);
         case 'JSXElement':
           return !isHiddenFromScreenReader(
              elementType(child.openingElement),
              child.openingElement.attributes
          );
         case 'JSXExpressionContainer':
           if (child.expression.type === 'Identifier') {
             return child.expression.name !== 'undefined';
           }
           return true;
         default:
           return false;
       }
     }) || hasAnyProp(node.attributes, ['dangerouslySetInnerHTML', 'children']);


     if (isAccessible) {
       return;
     }

     context.report({
       node,
       message: errorMessage,
     });
   },
 });

 module.exports = createRule(rule, meta);
