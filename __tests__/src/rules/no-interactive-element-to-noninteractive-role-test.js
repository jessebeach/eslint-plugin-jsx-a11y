/* eslint-env jest */
/**
 * @fileoverview Disallow inherently interactive elements to be assigned
 * non-interactive roles.
 * @author Jesse Beach
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/no-interactive-element-to-noninteractive-role';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------
const ruleTester = new RuleTester();

const errorMessage =
  'Interactive elements should not be assigned non-interactive roles';

const expectedError = {
  message: errorMessage,
  type: 'JSXOpeningElement',
};

ruleTester.run('no-interactive-element-to-noninteractive-role', rule, {
  valid: [
    { code: '<TestComponent onClick={doFoo} />' },
    { code: '<Button onClick={doFoo} />' },
    /* Interactive elements */
    { code: '<a tabIndex="0" role="button" />' },
    { code: '<a href="http://x.y.z" role="button" />' },
    { code: '<a href="http://x.y.z" tabIndex="0" role="button" />' },
    { code: '<button className="foo" role="button" />' },
    /* All flavors of input */
    { code: '<input role="button" />' },
    { code: '<input type="button" role="button" />' },
    { code: '<input type="checkbox" role="button" />' },
    { code: '<input type="color" role="button" />' },
    { code: '<input type="date" role="button" />' },
    { code: '<input type="datetime" role="button" />' },
    { code: '<input type="datetime-local" role="button" />' },
    { code: '<input type="email" role="button" />' },
    { code: '<input type="file" role="button" />' },
    { code: '<input type="image" role="button" />' },
    { code: '<input type="month" role="button" />' },
    { code: '<input type="number" role="button" />' },
    { code: '<input type="password" role="button" />' },
    { code: '<input type="radio" role="button" />' },
    { code: '<input type="range" role="button" />' },
    { code: '<input type="reset" role="button" />' },
    { code: '<input type="search" role="button" />' },
    { code: '<input type="submit" role="button" />' },
    { code: '<input type="tel" role="button" />' },
    { code: '<input type="text" role="button" />' },
    { code: '<input type="time" role="button" />' },
    { code: '<input type="url" role="button" />' },
    { code: '<input type="week" role="button" />' },
    { code: '<input type="hidden" role="button" />' },
    { code: '<input type="hidden" role="img" />' },
    /* End all flavors of input */
    { code: '<menuitem role="button" />;' },
    { code: '<option className="foo" role="button" />' },
    { code: '<select className="foo" role="button" />' },
    { code: '<textarea className="foo" role="button" />' },
    { code: '<tr role="button" />;' },
    /* HTML elements with neither an interactive or non-interactive valence (static) */
    { code: '<acronym role="button" />;' },
    { code: '<address role="button" />;' },
    { code: '<applet role="button" />;' },
    { code: '<aside role="button" />;' },
    { code: '<audio role="button" />;' },
    { code: '<b role="button" />;' },
    { code: '<base role="button" />;' },
    { code: '<bdi role="button" />;' },
    { code: '<bdo role="button" />;' },
    { code: '<big role="button" />;' },
    { code: '<blink role="button" />;' },
    { code: '<blockquote role="button" />;' },
    { code: '<body role="button" />;' },
    { code: '<br role="button" />;' },
    { code: '<canvas role="button" />;' },
    { code: '<caption role="button" />;' },
    { code: '<center role="button" />;' },
    { code: '<cite role="button" />;' },
    { code: '<code role="button" />;' },
    { code: '<col role="button" />;' },
    { code: '<colgroup role="button" />;' },
    { code: '<content role="button" />;' },
    { code: '<data role="button" />;' },
    { code: '<datalist role="button" />;' },
    { code: '<del role="button" />;' },
    { code: '<details role="button" />;' },
    { code: '<dir role="button" />;' },
    { code: '<div role="button" />;' },
    { code: '<div className="foo" role="button" />;' },
    { code: '<div className="foo" {...props} role="button" />;' },
    { code: '<div aria-hidden role="button" />;' },
    { code: '<div aria-hidden={true} role="button" />;' },
    { code: '<div role="button" />;' },
    { code: '<div role={undefined} role="button" />;' },
    { code: '<div {...props} role="button" />;' },
    { code: '<div onKeyUp={() => void 0} aria-hidden={false} role="button" />;' },
    { code: '<dl role="button" />;' },
    { code: '<em role="button" />;' },
    { code: '<embed role="button" />;' },
    { code: '<figcaption role="button" />;' },
    { code: '<font role="button" />;' },
    { code: '<footer role="button" />;' },
    { code: '<frameset role="button" />;' },
    { code: '<head role="button" />;' },
    { code: '<header role="button" />;' },
    { code: '<hgroup role="button" />;' },
    { code: '<html role="button" />;' },
    { code: '<i role="button" />;' },
    { code: '<iframe role="button" />;' },
    { code: '<ins role="button" />;' },
    { code: '<kbd role="button" />;' },
    { code: '<keygen role="button" />;' },
    { code: '<label role="button" />;' },
    { code: '<legend role="button" />;' },
    { code: '<link role="button" />;' },
    { code: '<map role="button" />;' },
    { code: '<mark role="button" />;' },
    { code: '<marquee role="button" />;' },
    { code: '<menu role="button" />;' },
    { code: '<meta role="button" />;' },
    { code: '<meter role="button" />;' },
    { code: '<noembed role="button" />;' },
    { code: '<noscript role="button" />;' },
    { code: '<object role="button" />;' },
    { code: '<optgroup role="button" />;' },
    { code: '<output role="button" />;' },
    { code: '<p role="button" />;' },
    { code: '<param role="button" />;' },
    { code: '<picture role="button" />;' },
    { code: '<pre role="button" />;' },
    { code: '<progress role="button" />;' },
    { code: '<q role="button" />;' },
    { code: '<rp role="button" />;' },
    { code: '<rt role="button" />;' },
    { code: '<rtc role="button" />;' },
    { code: '<ruby role="button" />;' },
    { code: '<s role="button" />;' },
    { code: '<samp role="button" />;' },
    { code: '<script role="button" />;' },
    { code: '<section role="button" />;' },
    { code: '<small role="button" />;' },
    { code: '<source role="button" />;' },
    { code: '<spacer role="button" />;' },
    { code: '<span role="button" />;' },
    { code: '<strike role="button" />;' },
    { code: '<strong role="button" />;' },
    { code: '<style role="button" />;' },
    { code: '<sub role="button" />;' },
    { code: '<summary role="button" />;' },
    { code: '<sup role="button" />;' },
    { code: '<th role="button" />;' },
    { code: '<time role="button" />;' },
    { code: '<title role="button" />;' },
    { code: '<track role="button" />;' },
    { code: '<tt role="button" />;' },
    { code: '<u role="button" />;' },
    { code: '<var role="button" />;' },
    { code: '<video role="button" />;' },
    { code: '<wbr role="button" />;' },
    { code: '<xmp role="button" />;' },
    /* HTML elements attributed with an interactive role */
    { code: '<div role="button" />;' },
    { code: '<div role="checkbox" />;' },
    { code: '<div role="columnheader" />;' },
    { code: '<div role="combobox" />;' },
    { code: '<div role="grid" />;' },
    { code: '<div role="gridcell" />;' },
    { code: '<div role="link" />;' },
    { code: '<div role="listbox" />;' },
    { code: '<div role="menu" />;' },
    { code: '<div role="menubar" />;' },
    { code: '<div role="menuitem" />;' },
    { code: '<div role="menuitemcheckbox" />;' },
    { code: '<div role="menuitemradio" />;' },
    { code: '<div role="option" />;' },
    { code: '<div role="progressbar" />;' },
    { code: '<div role="radio" />;' },
    { code: '<div role="radiogroup" />;' },
    { code: '<div role="row" />;' },
    { code: '<div role="rowheader" />;' },
    { code: '<div role="searchbox" />;' },
    { code: '<div role="slider" />;' },
    { code: '<div role="spinbutton" />;' },
    { code: '<div role="switch" />;' },
    { code: '<div role="tab" />;' },
    { code: '<div role="textbox" />;' },
    { code: '<div role="treeitem" />;' },
    /* Presentation is a special case role that indicates intentional static semantics */
    { code: '<div role="presentation" />;' },
    /* HTML elements attributed with an abstract role */
    { code: '<div role="command" />;' },
    { code: '<div role="composite" />;' },
    { code: '<div role="input" />;' },
    { code: '<div role="landmark" />;' },
    { code: '<div role="range" />;' },
    { code: '<div role="roletype" />;' },
    { code: '<div role="section" />;' },
    { code: '<div role="sectionhead" />;' },
    { code: '<div role="select" />;' },
    { code: '<div role="structure" />;' },
    { code: '<div role="tablist" />;' },
    { code: '<div role="toolbar" />;' },
    { code: '<div role="tree" />;' },
    { code: '<div role="treegrid" />;' },
    { code: '<div role="widget" />;' },
    { code: '<div role="window" />;' },
    /* HTML elements with an inherent, non-interactive role, assigned an
     * interactive role. */
    { code: '<main role="button" />;' },
    { code: '<a role="button" />' },
    { code: '<a role="button" />;' },
    { code: '<area role="button" />;' },
    { code: '<article role="button" />;' },
    { code: '<article role="button" />;' },
    { code: '<dd role="button" />;' },
    { code: '<dfn role="button" />;' },
    { code: '<dt role="button" />;' },
    { code: '<fieldset role="button" />;' },
    { code: '<figure role="button" />;' },
    { code: '<form role="button" />;' },
    { code: '<frame role="button" />;' },
    { code: '<h1 role="button" />;' },
    { code: '<h2 role="button" />;' },
    { code: '<h3 role="button" />;' },
    { code: '<h4 role="button" />;' },
    { code: '<h5 role="button" />;' },
    { code: '<h6 role="button" />;' },
    { code: '<hr role="button" />;' },
    { code: '<img role="button" />;' },
    { code: '<li role="button" />;' },
    { code: '<nav role="button" />;' },
    { code: '<ol role="button" />;' },
    { code: '<table role="button" />;' },
    { code: '<tbody role="button" />;' },
    { code: '<td role="button" />;' },
    { code: '<tfoot role="button" />;' },
    { code: '<thead role="button" />;' },
    { code: '<ul role="button" />;' },
    /* HTML elements attributed with a non-interactive role */
    { code: '<div role="alert" />;' },
    { code: '<div role="alertdialog" />;' },
    { code: '<div role="application" />;' },
    { code: '<div role="article" />;' },
    { code: '<div role="banner" />;' },
    { code: '<div role="cell" />;' },
    { code: '<div role="complementary" />;' },
    { code: '<div role="contentinfo" />;' },
    { code: '<div role="definition" />;' },
    { code: '<div role="dialog" />;' },
    { code: '<div role="directory" />;' },
    { code: '<div role="document" />;' },
    { code: '<div role="feed" />;' },
    { code: '<div role="figure" />;' },
    { code: '<div role="form" />;' },
    { code: '<div role="group" />;' },
    { code: '<div role="heading" />;' },
    { code: '<div role="img" />;' },
    { code: '<div role="list" />;' },
    { code: '<div role="listitem" />;' },
    { code: '<div role="log" />;' },
    { code: '<div role="main" />;' },
    { code: '<div role="marquee" />;' },
    { code: '<div role="math" />;' },
    { code: '<div role="navigation" />;' },
    { code: '<div role="note" />;' },
    { code: '<div role="region" />;' },
    { code: '<div role="rowgroup" />;' },
    { code: '<div role="search" />;' },
    { code: '<div role="separator" />;' },
    { code: '<div role="scrollbar" />;' },
    { code: '<div role="status" />;' },
    { code: '<div role="table" />;' },
    { code: '<div role="tabpanel" />;' },
    { code: '<div role="term" />;' },
    { code: '<div role="timer" />;' },
    { code: '<div role="tooltip" />;' },
  ].map(parserOptionsMapper),
  invalid: [
    /* Interactive elements */
    { code: '<a tabIndex="0" role="img" />', errors: [expectedError] },
    { code: '<a href="http://x.y.z" role="img" />', errors: [expectedError] },
    { code: '<a href="http://x.y.z" tabIndex="0" role="img" />', errors: [expectedError] },
    /* All flavors of input */
    { code: '<input role="img" />', errors: [expectedError] },
    { code: '<input type="img" role="img" />', errors: [expectedError] },
    { code: '<input type="checkbox" role="img" />', errors: [expectedError] },
    { code: '<input type="color" role="img" />', errors: [expectedError] },
    { code: '<input type="date" role="img" />', errors: [expectedError] },
    { code: '<input type="datetime" role="img" />', errors: [expectedError] },
    { code: '<input type="datetime-local" role="img" />', errors: [expectedError] },
    { code: '<input type="email" role="img" />', errors: [expectedError] },
    { code: '<input type="file" role="img" />', errors: [expectedError] },
    { code: '<input type="image" role="img" />', errors: [expectedError] },
    { code: '<input type="month" role="img" />', errors: [expectedError] },
    { code: '<input type="number" role="img" />', errors: [expectedError] },
    { code: '<input type="password" role="img" />', errors: [expectedError] },
    { code: '<input type="radio" role="img" />', errors: [expectedError] },
    { code: '<input type="range" role="img" />', errors: [expectedError] },
    { code: '<input type="reset" role="img" />', errors: [expectedError] },
    { code: '<input type="search" role="img" />', errors: [expectedError] },
    { code: '<input type="submit" role="img" />', errors: [expectedError] },
    { code: '<input type="tel" role="img" />', errors: [expectedError] },
    { code: '<input type="text" role="img" />', errors: [expectedError] },
    { code: '<input type="time" role="img" />', errors: [expectedError] },
    { code: '<input type="url" role="img" />', errors: [expectedError] },
    { code: '<input type="week" role="img" />', errors: [expectedError] },
    /* End all flavors of input */
    { code: '<menuitem role="img" />;', errors: [expectedError] },
    { code: '<option className="foo" role="img" />', errors: [expectedError] },
    { code: '<select className="foo" role="img" />', errors: [expectedError] },
    { code: '<textarea className="foo" role="img" />', errors: [expectedError] },
    { code: '<tr role="img" />;', errors: [expectedError] },
    /* Interactive elements */
    { code: '<a tabIndex="0" role="listitem" />', errors: [expectedError] },
    { code: '<a href="http://x.y.z" role="listitem" />', errors: [expectedError] },
    { code: '<a href="http://x.y.z" tabIndex="0" role="listitem" />', errors: [expectedError] },
    /* All flavors of input */
    { code: '<input role="listitem" />', errors: [expectedError] },
    { code: '<input type="listitem" role="listitem" />', errors: [expectedError] },
    { code: '<input type="checkbox" role="listitem" />', errors: [expectedError] },
    { code: '<input type="color" role="listitem" />', errors: [expectedError] },
    { code: '<input type="date" role="listitem" />', errors: [expectedError] },
    { code: '<input type="datetime" role="listitem" />', errors: [expectedError] },
    { code: '<input type="datetime-local" role="listitem" />', errors: [expectedError] },
    { code: '<input type="email" role="listitem" />', errors: [expectedError] },
    { code: '<input type="file" role="listitem" />', errors: [expectedError] },
    { code: '<input type="image" role="listitem" />', errors: [expectedError] },
    { code: '<input type="month" role="listitem" />', errors: [expectedError] },
    { code: '<input type="number" role="listitem" />', errors: [expectedError] },
    { code: '<input type="password" role="listitem" />', errors: [expectedError] },
    { code: '<input type="radio" role="listitem" />', errors: [expectedError] },
    { code: '<input type="range" role="listitem" />', errors: [expectedError] },
    { code: '<input type="reset" role="listitem" />', errors: [expectedError] },
    { code: '<input type="search" role="listitem" />', errors: [expectedError] },
    { code: '<input type="submit" role="listitem" />', errors: [expectedError] },
    { code: '<input type="tel" role="listitem" />', errors: [expectedError] },
    { code: '<input type="text" role="listitem" />', errors: [expectedError] },
    { code: '<input type="time" role="listitem" />', errors: [expectedError] },
    { code: '<input type="url" role="listitem" />', errors: [expectedError] },
    { code: '<input type="week" role="listitem" />', errors: [expectedError] },
    /* End all flavors of input */
    { code: '<menuitem role="listitem" />;', errors: [expectedError] },
    { code: '<option className="foo" role="listitem" />', errors: [expectedError] },
    { code: '<select className="foo" role="listitem" />', errors: [expectedError] },
    { code: '<textarea className="foo" role="listitem" />', errors: [expectedError] },
    { code: '<tr role="listitem" />;', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
