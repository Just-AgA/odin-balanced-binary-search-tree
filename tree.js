import { buildTree } from './balanced_binary_search.js';
import { Node } from './node.js';

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

  const postOrder = (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    const result = [];

    const traverse = (node) => {
      if (node === null) return;

      traverse(node.left);
      traverse(node.right);
      callback(node);
      result.push(node.data);
    };

    traverse(root);
    return result;
  };

  const height = (value) => {
    // Helper function that find the node with the specfied value
    function findNode(node, value) {
      if (node === null) return null;

      if (value < node.value) return findNode(node.left, value);
      if (value > node.value) return findNode(node.right, value);

      return node;
    }

    // Compute height of the subtree rooted at given node
    function computeHeight(node) {
      if (node === null) return -1;

      const leftHeight = computeHeight(node.left);
      const rightHeight = computeHeight(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }

    const targetNode = findNode(root, value);
    if (targetNode === null) return null;

    return computeHeight(targetNode);
  };

  const depth = (value) => {
    function computeDepth(node, value, depth = 0) {
      if (node === null) return null;

      if (node.data === value) return depth;

      if (value < node.data) {
        return computeDepth(node.left, value, depth + 1);
      } else {
        return computeDepth(node.right, value, depth + 1);
      }
    }

    return computeDepth(root, value);
  };

  const isBalanced = () => {
    if (root === null) return true;

    const checkHeight = (node) => {
      if (node === null) return 0;

      const leftHeight = checkHeight(node.left);
      const rightHeight = checkHeight(node.right);

      if (
        leftHeight === -1 ||
        rightHeight === -1 ||
        Math.abs(leftHeight - rightHeight) > 1
      )
        return -1;

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkHeight(root) !== -1;
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
    rebalance,
  };
}

const newTree = Tree([23, 7, 1, 4, 9, 4, 67, 8, 3, 63, 7, 5, 95, 9]);
newTree.prettyPrint();
console.log(newTree.isBalanced());
newTree.levelOrder((node) => console.log(node.data * 2));
newTree.inOrder((node) => console.log(node.data * 2));
newTree.preOrder((node) => console.log(node.data * 2));
newTree.postOrder((node) => console.log(node.data * 2));
newTree.insert('134');
newTree.insert('234');
newTree.insert('147');
newTree.insert('764');
console.log(newTree.isBalanced());
newTree.rebalance();
console.log('After rebalancing');
console.log(newTree.isBalanced());
newTree.inOrder((node) => console.log(node.data * 2));
newTree.preOrder((node) => console.log(node.data * 2));
newTree.postOrder((node) => console.log(node.data * 2));
