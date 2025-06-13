import { Node } from './node.js';

function buildRecursive(arr) {
  if (arr.length === 0) return null;

  const midIndex = Math.floor(arr.length / 2);
  const root = Node(arr[midIndex]);

  root.left = buildRecursive(arr.slice(0, midIndex));
  root.right = buildRecursive(arr.slice(midIndex + 1));

  return root;
}

export { buildTree };
