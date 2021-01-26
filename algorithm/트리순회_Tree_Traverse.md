# 트리순회

- 반복문으로도 구현 가능하지만 재귀로 구현하는게 직관적이고 편리함



## 전위 순회 (Pre-Order)

- root를 가장 먼저 방문
- root -> left -> right

```pseudocode
preOrder(node)
	if (node == null)
			return
  visit (node)
  preOrder(node.left)
  preOrder(node.right)
```



## 중위 순회 (In-Order)

- root를 중간으로 방문
- left -> root -> right

```pseudocode
inOrder(node)
	if (node == null)
			return
  inOrder(node.left)
  visit(node)
  inOrder(node.right)
```





## 후위 순회 (Post-Order)

- root를 마지막으로 방문
- left -> right -> root

```pseudocode
postOrder(node)
	if (node == null)
			return
	postOrder(node.left)
	postOrder(node.right)
	visit(node)
```

