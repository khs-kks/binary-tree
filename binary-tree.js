class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(values) {
    if (!Array.isArray(values)) {
      throw new Error("Values must be an array");
    }

    this.root = null;
    this.values = values;
  }

  buildTree() {
    if (this.values.length === 0) {
      return null;
    }
    this.values = [...new Set(this.values)].sort((a, b) => a - b);
    this.root = this._buildTree(0, this.values.length - 1);
    return this.root;
  }

  _buildTree(start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let node = new Node(this.values[mid]);

    node.left = this._buildTree(start, mid - 1);
    node.right = this._buildTree(mid + 1, end);

    return node;
  }

  insert(value) {
    this._insert(this.root, value);
  }

  _insert(node, value) {
    if (!node) return new Node(value);

    if (value < node.data) {
      node.left = this._insert(node.left, value);
    } else {
      node.right = this._insert(node.right, value);
    }

    return node;
  }

  delete(value) {
    this.root = this._delete(this.root, value);
  }

  _delete(node, value) {
    if (!node) return null;

    if (value < node.data) {
      node.left = this._delete(node.left, value);
    } else if (value > node.data) {
      node.right = this._delete(node.right, value);
    } else {
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      } else {
        let minNode = this._findMinNode(node.right);
        node.data = minNode.data;
        node.right = this._delete(node.right, minNode.data);
      }
    }

    return node;
  }

  _findMinNode(node) {
    while (node.left) node = node.left;
    return node;
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.data === value) return currentNode;
      else if (currentNode.data < value) currentNode = currentNode.right;
      else currentNode = currentNode.left;
    }
    return null;
  }

  levelOrder(fn = null) {
    let result = [];
    let queue = [];
    if (this.root) queue.push(this.root);
    while (queue.length) {
      let node = queue.shift();
      if (fn) fn(node);
      result.push(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return fn ? null : result;
  }

  inorder(fn) {
    let result = [];
    this._inorder(this.root, fn, result);
    return result;
  }

  _inorder(node, fn, result) {
    if (!node) return;
    this._inorder(node.left, fn, result);
    result.push(node.data);
    if (fn) fn(node);
    this._inorder(node.right, fn, result);
  }

  preorder(fn) {
    let result = [];
    this._preorder(this.root, fn, result);
    return result;
  }

  _preorder(node, fn, result) {
    if (!node) return;
    result.push(node.data);
    if (fn) fn(node);
    this._preorder(node.left, fn, result);
    this._preorder(node.right, fn, result);
  }

  postorder(fn) {
    let result = [];
    this._postorder(this.root, fn, result);
    return result;
  }

  _postorder(node, fn, result) {
    if (!node) return;
    this._postorder(node.left, fn, result);
    this._postorder(node.right, fn, result);
    result.push(node.data);
    if (fn) fn(node);
  }

  height(node) {
    if (node === null) return 0;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
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

// tree.insert(24);
// tree.delete(67);
// prettyPrint(tree.root);
// console.log(tree.find(35));
console.log(tree.postorder());
