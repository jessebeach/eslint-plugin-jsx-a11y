import RuleContext from 'eslint/lib/rule-context';
import assign from 'object-assign';
import defaultGlobalSettings from '../../defaultGlobalSettings.json';

export default function createRule(rule, meta = {}) {
  return {
    meta,

    create: (context) => {
      const settings = assign({}, defaultGlobalSettings, context.settings);
      const ctx = new RuleContext(
        context.id,
        context.eslint,
        context.severity,
        context.options,
        settings,
        context.parserOptions,
        context.parserPath,
        context.meta
      );

      return rule(ctx);
    },
  };
}
