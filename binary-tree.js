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

  depth(node) {
    if (node === this.root) return 0;
    let current = this.root;
    let depth = 0;
    while (current) {
      if (node.data < current.data) {
        current = current.left;
        depth++;
      } else if (node.data > current.data) {
        current = current.right;
        depth++;
      } else {
        return depth;
      }
    }
    return -1;
  }

  _height(node) {
    if (!node) {
      return -1;
    }
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  isBalanced(node = this.root) {
    if (!node) {
      return true;
    }
    const heightDiff = Math.abs(
      this._height(node.left) - this._height(node.right)
    );
    if (heightDiff > 1) {
      return false;
    }
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    this.values = [...new Set(this.values)].sort((a, b) => a - b);
    this.root = this._buildTree(0, this.values.length - 1);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "???   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "????????? " : "????????? "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "???   "}`, true);
  }
};

const arr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
const tree = new Tree(arr);
tree.buildTree();

console.log("Is balanced: ", tree.isBalanced());
console.log("Level order: ", tree.levelOrder());
console.log("Pre order: ", tree.preorder());
console.log("Post order: ", tree.postorder());
console.log("In order: ", tree.inorder());

for (let i = 0; i < 5; i++) {
  tree.insert(Math.floor(Math.random() * 200) + 100);
}

console.log("Is balanced: ", tree.isBalanced());

tree.rebalance();

console.log("Is balanced: ", tree.isBalanced());
console.log("Level order: ", tree.levelOrder());
console.log("Pre order: ", tree.preorder());
console.log("Post order: ", tree.postorder());
console.log("In order: ", tree.inorder());
