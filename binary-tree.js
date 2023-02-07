
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(values) {
    this.root = null;
    this.values = values;
  }

  buildTree(arr) {
    const sortedAndUnique = [...new Set(arr)].sort((a, b) => a - b);

    const build = (start, end) => {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new Node(sortedAndUnique[mid]);
      node.left = build(start, mid - 1);
      node.right = build(mid + 1, end);
      return node;
    };

    this.root = build(0, sortedAndUnique.length - 1);
    return this.root;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const values = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 23, 324];
const tree = new Tree(values);
tree.buildTree(values);
prettyPrint(tree.root);
