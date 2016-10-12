/**
 * @fileoverview Enforce anchor elements to contain accessible content.
 * @author Lisa Ring & Niklas Holmberg
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/anchor-has-content';

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'Anchors must have content and the content must be accessible by a screen reader.',
  type: 'JSXOpeningElement',
};

const options = [{
  components: ['Route'],
}];

ruleTester.run('anchor-has-content', rule, {
  valid: [
    { code: '<div />;', parserOptions },
    { code: '<a>Foo</a>', parserOptions },
    { code: '<a><Bar /></a>', parserOptions },
    { code: '<a>{foo}</a>', parserOptions },
    { code: '<a>{foo.bar}</a>', parserOptions },
    { code: '<a dangerouslySetInnerHTML={{ __html: "foo" }} />', parserOptions },
    { code: '<a children={children} />', parserOptions },

    // OPTIONS TESTS
    { code: '<div />;', parserOptions, options },
    { code: '<a>Foo</a>', parserOptions, options },
    { code: '<Route><Bar /></Route>', parserOptions, options },
    { code: '<Route>{foo}</Route>', parserOptions, options },
    { code: '<Route>{foo.bar}</Route>', parserOptions, options },
    { code: '<Route dangerouslySetInnerHTML={{ __html: "foo" }} />', parserOptions, options },
    { code: '<Route children={children} />', parserOptions, options },

    // GLOBAL SETTINGS TESTS
    { code: '<div />;', parserOptions },
    { code: '<Link>Foo</Link>', parserOptions },
    { code: '<Link><Bar /></Link>', parserOptions },
    { code: '<Link>{foo}</Link>', parserOptions },
    { code: '<Link>{foo.bar}</Link>', parserOptions },
    { code: '<Link dangerouslySetInnerHTML={{ __html: "foo" }} />', parserOptions },
    { code: '<Link children={children} />', parserOptions },
  ],
  invalid: [
    { code: '<a />', errors: [expectedError], parserOptions },
    { code: '<a><Bar aria-hidden /></a>', errors: [expectedError], parserOptions },
    { code: '<a>{undefined}</a>', errors: [expectedError], parserOptions },

    // OPTIONS TESTS
    { code: '<Route />', errors: [expectedError], parserOptions, options },
    { code: '<Route><Bar aria-hidden /></Route>', errors: [expectedError], parserOptions, options },
    { code: '<Route>{undefined}</Route>', errors: [expectedError], parserOptions, options },

    // GLOBAL SETTINGS TESTS
    { code: '<Link />', errors: [expectedError], parserOptions },
    { code: '<Link><Bar aria-hidden /></Link>', errors: [expectedError], parserOptions },
    { code: '<Link>{undefined}</Link>', errors: [expectedError], parserOptions },
  ],
});
