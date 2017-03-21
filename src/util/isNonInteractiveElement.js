/**
 * @flow
 */

import {
  roles,
  elementRoles,
  roleElements,
} from 'aria-query';
import { getProp, getPropValue, getLiteralPropValue } from 'jsx-ast-utils';
import getTabIndex from './getTabIndex';
import DOMElements from './attributes/DOM.json';

const nonInteractiveRoles = new Set(
  [...roles.keys()].filter(name => !roles.get(name).interactive),
);

const pureNonInteractiveElements = [...elementRoles.entries()]
  .reduce((accumulator, [elementSchemaJSON, roleSet]): {
    [elementName: string]: (attributes: Array<Object>) => boolean,
  } => {
    const nonInteractiveElements = accumulator;
    const elementSchema = JSON.parse(elementSchemaJSON);
    const elementName = elementSchema.name;
    const elementAttributes = elementSchema.attributes || [];
    nonInteractiveElements[elementName] = (attributes: Array<Object>): boolean => {
      const passedAttrCheck =
        elementAttributes.length === 0 ||
        elementAttributes.every(
          (controlAttr): boolean => attributes.some(
            (attr): boolean => (
              controlAttr.name === propName(attr).toLowerCase()
              && controlAttr.value === getLiteralPropValue(attr)
            ),
          ),
        );
      return passedAttrCheck && [...roleSet.keys()].every(
        (roleName): boolean => nonInteractiveRoles.has(roleName),
      );
    };
    return nonInteractiveElements;
  }, {});

const isNotLink = function isNotLink(attributes) {
  const href = getPropValue(getProp(attributes, 'href'));
  const tabIndex = getTabIndex(getProp(attributes, 'tabIndex'));
  return href === undefined && tabIndex === undefined;
};

export const nonInteractiveElementsMap = {
  ...pureNonInteractiveElements,
  a: isNotLink,
  area: isNotLink,
  input: (attributes) => {
    const typeAttr = getLiteralPropValue(getProp(attributes, 'type'));
    return typeAttr ? typeAttr.toUpperCase() === 'HIDDEN' : false;
  },
};

/**
 * Returns boolean indicating whether the given element is a non-interactive
 * element. If the element has either a non-interactive role assigned or it
 * is an element with an inherently non-interactive role, then this utility
 * returns true. Elements that lack either an explicitly assigned role or
 * an inherent role are not considered. For those, this utility returns false
 * because a positive determination of interactiveness cannot be determined.
 */
const isNonInteractiveElement = (tagName, attributes) => {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if (Object.keys(DOMElements).indexOf(tagName) === -1) {
    return false;
  }

  // The element has a role.
  const role = getLiteralPropValue(getProp(attributes, 'role'));
  if (role) {
    return nonInteractiveRoles.has(role);
  }

  // The element does not have an explicit role, determine if it has an
  // inherently non-interactive role.
  if ({}.hasOwnProperty.call(nonInteractiveElementsMap, tagName) === false) {
    return false;
  }

  return nonInteractiveElementsMap[tagName](attributes);
};

export default isNonInteractiveElement;
