# Binary Search Tree

A simple implementation of a binary search tree in JavaScript. 

## Class: Tree

### Methods

#### buildTree()
This method takes the array of values passed to the constructor and creates a binary search tree. It eliminates duplicate values and sorts the array in ascending order before building the tree. 

#### insert(value)
This method inserts a new node with the given value into the tree.

#### delete(value)
This method deletes the node with the given value from the tree.

#### find(value)
This method returns the node with the given value.

#### levelOrder(func)
This method traverses the tree in breadth-first level order and provides each node as the argument to the provided function. If no function is given, it returns an array of values.

#### inOrder(func)
This method traverses the tree in depth-first in-order and provides each node as the argument to the provided function. If no function is given, it returns an array of values.

#### preOrder(func)
This method traverses the tree in depth-first pre-order and provides each node as the argument to the provided function. If no function is given, it returns an array of values.

#### postOrder(func)
This method traverses the tree in depth-first post-order and provides each node as the argument to the provided function. If no function is given, it returns an array of values.

#### height(node)
This method takes a node as an argument and returns its height. Height is defined as the number of edges in the longest path from the given node to a leaf node.

#### depth(node)
This method takes a node as an argument and returns its depth. Depth is defined as the number of edges in the path from the given node to the tree's root node.

#### isBalanced()
This method checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and right subtree of every node is not more than 1.

#### rebalance()
This method rebalances an unbalanced tree.

