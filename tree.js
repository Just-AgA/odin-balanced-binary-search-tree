import { buildTree } from './balanced_binary_search.js';

function Tree(arr) {
  let root = buildTree(arr);

  const prettyPrint = (node = root, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  const insert = (value) => {
    const insertRecursive = (node, value) => {
      if (node === null) return new Node(value);

      // Duplicates not allowed
      if (node.data === value) return node;

      if (value < node.data) {
        node.left = insertRecursive(node.left, value);
      } else {
        node.right = insertRecursive(node.right, value);
      }

      return node;
    };
    root = insertRecursive(root, value);
  };
}
