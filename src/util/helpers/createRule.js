import assign from 'object-assign';
import defaultGlobalSettings from '../../defaultGlobalSettings.json';

const DEFAULT_META = {
  docs: {},

  schema: [
    { type: 'object' },
  ],
};

export default function createRule(rule, meta = {}) {
  return {
    meta: assign({}, DEFAULT_META, meta),

    create: context => {
      const settings = assign({}, defaultGlobalSettings, context.settings);
      const ctx = assign({}, context, { settings });
      ctx.prototype = assign({}, context.prototype);

      return rule(context);
    },
  };
}
