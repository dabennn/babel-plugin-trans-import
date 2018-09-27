const t = require('@babel/types');
const LIB_NAME = 'zcos';
const LIB_DIR = 'zcos/lib';

const visitor = {
  ImportDeclaration(path, pass){
    const opt = pass.opts; // 配置项
    const libName = opt.lib || LIB_NAME;
    const libDir = opt.dir || LIB_DIR;
    const node = path.node;
    const specifiers = node.specifiers;
    const importName = node.source.value;

    if (libName == importName && t.isImportSpecifier(specifiers[0])) { // 仅当解构引入的时候生效 import { a, b } from '..'
      const nodes = specifiers.map((specifier) => {
        return t.importDeclaration(
          [t.importDefaultSpecifier(specifier.local)],
          t.StringLiteral(`${importName}/${libDir}/${specifier.local.name}`)
        );
      });
      path.replaceWithMultiple(nodes);
    }
  }
};

module.exports = function () {
  return { visitor };
};
