const pluginTester = require('babel-plugin-tester');
const transImport = require('../lib/index.js');

pluginTester({
  plugin: transImport,
  pluginName: 'trans-import',
  title: 'test different import transformation',
  tests: [
    {
      title: 'transform import declaration to defualt import declaration',
      code: `import { method_a, method_b } from 'library';`,
      output: `import method_a from 'library/dir/method_a';\nimport method_b from 'library/dir/method_b';`,
      pluginOptions: {
        lib: 'library',
        dir: 'dir',
      },
    },
    {
      title: 'transform mixed import declaration to defualt import declaration',
      code: `import method_c, { method_a, method_b } from 'library';`,
      output: `import method_c from 'library';\nimport method_a from 'library/dir/method_a';\nimport method_b from 'library/dir/method_b';`,
      pluginOptions: {
        lib: 'library',
        dir: 'dir',
      },
    },
    {
      title: 'when no plugin option \'lib\'',
      code: `import { method_a, method_b } from 'library';`,
      output: `import { method_a, method_b } from 'library';`,
      pluginOptions: {
        dir: 'dir',
      },
    },
    {
      title: 'when no plugin option \'dir\'',
      code: `import { method_a, method_b } from 'library';`,
      output: `import method_a from 'library/method_a';\nimport method_b from 'library/method_b';`,
      pluginOptions: {
        lib: 'library',
      },
    },
  ],
});
