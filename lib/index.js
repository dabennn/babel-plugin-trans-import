const t = require('@babel/types');

const DEFAULT_LIB_DIR = 'lib';

const visitor = {
  ImportDeclaration(path, pass){
    const opt = pass.opts; // 配置项
    const libName = opt.lib;
    const libDir = opt.dir || DEFAULT_LIB_DIR;
    const node = path.node;
    const specifiers = node.specifiers;
    const source = node.source.value;
    let defSpecifier = null;

    if (libName !== source) return;

    if (t.isImportDefaultSpecifier(specifiers[0]) && specifiers[1] && t.isImportSpecifier(specifiers[1])) { // 处理import a, { b, c } from '..'
      defSpecifier = specifiers.splice(0, 1)[0];
      defSpecifier = t.importDeclaration(
        [t.importDefaultSpecifier(defSpecifier.local)],
        t.StringLiteral(source)
      );
    }

    if (t.isImportSpecifier(specifiers[0])) { // 处理解构 import { a, b } from '..'
      const nodes = specifiers.map((specifier) => {
        return t.importDeclaration(
          [t.importDefaultSpecifier(specifier.local)],
          t.StringLiteral(`${source}${libDir ? '/' + libDir : ''}/${specifier.local.name}`)
        );
      });

      if (defSpecifier !== null) {
        nodes.unshift(defSpecifier);
      }

      path.replaceWithMultiple(nodes);
    }
  }
};

module.exports = function () {
  return { visitor };
};
