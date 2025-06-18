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

  const find = (value) => {
    const findRecursive = (node, value) => {
      if (node === null) return null;

      if (node.data === value) return node;

      if (value < node.data) {
        return findRecursive(node.left, value);
      } else {
        return findRecursive(node.right, value);
      }
    };
    return findRecursive(root, value);
  };

  const levelOrder = (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    const result = [];

    if (root === null) return result;
    const queue = [root];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback(currentNode);
      result.push(currentNode.data);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return result;
  };

  const inOrder = (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    const result = [];

    const traverse = (node) => {
      if (node === null) return;

      traverse(node.left);
      callback(node);
      result.push(node.data);
      traverse(node.right);
    };

    traverse(root);
    return result;
  };

  const preOrder = (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    const result = [];

    const traverse = (node) => {
      if (node === null) return;

      callback(node);
      result.push(node.data);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(root);
    return result;
  };

  return {
    prettyPrint,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
  };
}

const newTree = Tree([23, 7, 1, 4, 9, 4, 67, 8, 3, 6345, 7, 5, 324, 9]);
newTree.prettyPrint();
console.log(newTree.find(4));
newTree.levelOrder((node) => console.log(node.data * 2));
newTree.inOrder((node) => console.log(node.data * 2));
newTree.preOrder((node) => console.log(node.data * 2));
newTree.postOrder((node) => console.log(node.data * 2));
