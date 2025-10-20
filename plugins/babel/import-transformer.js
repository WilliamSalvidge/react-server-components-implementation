export default function importTransformer() {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value.endsWith('.jsx')) {
          path.node.source.value = path.node.source.value.replace(/\.jsx$/, '.js');
        }
      },
      CallExpression(path) {
        if (path.node.callee.type === 'Import' && path.node.arguments[0].value.endsWith('.jsx')) {
          path.node.arguments[0].value = path.node.arguments[0].value.replace(/\.jsx$/, '.js')
        }
      }
    }
  }
};
