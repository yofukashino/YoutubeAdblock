
import { readFileSync } from 'fs';
import { resolve } from 'path';

const inlineTextPlugin = {
  name: 'inline-text',
  setup: (build) => {
    // Match imports with ?string suffix
    build.onResolve({ filter: /.*\.js\?string$/ }, (args) => {
      if (args.kind !== "import-statement") return undefined;
      const path = resolve(args.resolveDir, args.path.replace(/\?string$/, ''));
      return { path, namespace: 'inline-text' };
    });

    build.onLoad({ filter: /.*/, namespace: 'inline-text' }, (args) => {
      const contents = readFileSync(args.path, 'utf8');
      return {
        contents: `export default ${JSON.stringify(contents.trim())};`,
        loader: 'js',
      };
    });
  },
};



export default ({ external, plugins, ...buildInfo }) => {
  return {
    ...buildInfo,
    plugins: [inlineTextPlugin, ...(plugins ?? [])],
    external: ["electron", ...(external ?? [])],
  };
};
