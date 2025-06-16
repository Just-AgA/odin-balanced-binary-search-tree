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

  const deleteItem = (value) => {
    const deleteRecursive = (node, value) => {
      if (node === null) return null;

      if (value < node.data) {
        node.left = deleteRecursive(node.left, value);
      } else if (value > node.data) {
        node.right = deleteRecursive(node.right, value);
      } else {
        if (node.left === null && node.right === null) {
          return null;
        }
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }

        let successor = node.right;
        while (successor.left !== null) {
          successor = successor.left;
        }
        node.data = successor.data; // Replace with in-order successor
        node.right = deleteRecursive(node.right, successor.data); // Delete successor
      }

      return node;
    };

    root = deleteRecursive(root, value);
  };
}
