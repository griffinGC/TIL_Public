class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    traverseBFS() {
        // 루트가 없으면, false 리턴
        if (!this.root) {
            return false;
        }
        // 새로운 큐 시작
        const queue = new Queue();
        // 트리에서 모든 값을 계속 기록
        const treeValues = [];
        // 큐에 루트 추가
        queue.enqueue(this.root);
        // 큐가 비어있지 않은 동안 수행
        while(queue.size() !== 0) {
            // TreeNode 자식
            const nodeChildren = queue.first.value.children;
            // 자식 노드가 있다면, 반복하여 큐에 각각을 더함
            if (nodeChildren.length !== 0) {
                nodeChildren.forEach(child => queue.enqueue(child));
            } 
            // 큐에 있는 첫번째 아이템을 TreeValue에 삽입
            threeValues.push(queue.first.value);
            // 큐에서 첫번째 노드 삭제
            queue.dequeue();
        }
        // 값 리턴, 모두 TreeNode
        return treeValues;
    }

    traverseDFS(type) {
        // 루트가 없을 경우, false 리턴
        if (!this.root) {
            return false;
        }
        // tree 값들에 대한 변수 생성
        const treeValues = [];
        // 현재 값은 항상 루트에서 시작
        let current = this.root;

        // 순서를 선택하기 위한 헬퍼 메서드
        const preOrderHelper = node => {
            // 배열에 값을 먼저 삽입
            treeValues.push(node.value);
            // 모든 자식노드 재귀적으로 함수 호출
            if (node.children.length !== 0){
                node.children.forEach(child => {
                    preOrderHelper(child);
                });
            }
            return true;
        }
    
        const postOrderHelper = node => {
            // 모든 자식노드 먼저 재귀적으로 함수 호출
            if (node.children.length !== 0) {
                node.children.forEach(child => {
                    postOrderHelper(child);
                });
            }
            // 값을 배열에 삽입
            treeValues.push(node.value);
            return true;
        };

        const inOrderHelper = node => {
            // 노드가 자식이 있다면, 트리가 이진트리가 아닐 경우 노드들을 왼쪽 절반과 오른쪽 절반으로 나눔
            if (node.children.length !== 0) {
                // 반쪽 지점
                const halfway = Math.floor(node.children.length / 2);
                // 반쪽 지점의 왼쪽에 있는 모든 자식 노드들을 재귀적으로 호출
                for (let i = 0; i < halfway; i++) {
                    inOrderHelper(node.children[i]);
                }
                // 배열에 부모 노드 값 삽입
                treeValues.push(node.value);
                // 반쪽 지점의 오른쪽에 있는 모든 자식 노드들을 재귀적으로 호출
                for (let i = halfway; i < node.children.length; i++) {
                    inOrderHelper(node.children[i]);
                }
                // 자식 노드가 없을때, 값을 배열에 삽입
            } else {
                treeValues.push(node.value);
            }
            return true;
        };
        // 적절한 순위방식을 선택하기 위한 스위치문. 그리고 재귀적인 함수 호출 시작
        switch (type) {
            case "pre":
                preOrderHelper(current);
                break;
            case "post":
                postOrderHelper(current);
                break;
            case "in":
                inOrderHelper(current);
                break;
        }
    // 배열 반환
    return treeValues;
    }   
}

class QueueNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    // 새로운 노드는 큐의 마지막으로 가게 된다.
    enqueue(value) {
        const newNode = new QueueNode(value);
        // 큐가 비어있다면
        if (this.size === 0) {
            this.first = newNode;
            this.last = newNode;
            // 현재의 first 포인터를 새로운 first(새 노드)에 넣고 그 새 노드를 새로운 first노드로 만든다.
            // last 노드의 next 포인터에 새 노드를 넣고, last에 새로 생성한 노드를 넣는다. 
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        // 사이즈에 1 추가
        this.size++;

        return this;
    }
    // 첫번째 노드를 가져온다.
    dequeue() {
        // 큐가 비어있다면 false 리턴
        if (this.size === 0) return false;
        // dequenedNode 가져오기
        const dequeuedNode = this.first;
        // 첫번째 가져오기 (stack이 길이 1 이라면 NULL 일 수 있음)
        const newFirst = this.first.next;
        // newFirst가 null이라면, last에 newFirst(null)에 재할당 한다.
        if (!newFirst) {
            this.last = newFirst;
        }
        // 새로운 first 할당
        this.first = newFirst;
        // 리스트에 대한 레퍼런스 삭제
        dequeuedNode.next = null;
        // 사이즈 1 줄이기
        this.size--;
        // dequeuedNode 리턴
        return dequeuedNode;
    }

    log() {
        let currnetNode = this.first;
        let i = 0;
        while(currentNode) {
            console.log(i, currentNode.value);
            i++;
            currentNode = currentNode.next;
        }
    }
}

const testTree = new Tree();

testTree.root = new TreeNode("H");
testTree.root.children.push(new TreeNode("e"));
testTree.root.children.push(new TreeNode("l"));
testTree.root.children[0].children.push(new TreeNode("l"));
testTree.root.children[0].children.push(new TreeNode("o"));
testTree.root.children[0].children.push(new TreeNode("W"));
testTree.root.children[1].children.push(new TreeNode("o"));
testTree.root.children[1].children.push(new TreeNode("r"));
testTree.root.children[1].children.push(new TreeNode("l"));
testTree.root.children[1].children.push(new TreeNode("d"));

const testTree2 = new Tree();

testTree2.root = new TreeNode(10);
testTree2.root.children.push(new TreeNode(6));
testTree2.root.children.push(new TreeNode(15));
testTree2.root.children[0].children.push(new TreeNode(3));
testTree2.root.children[0].children.push(new TreeNode(8));
testTree2.root.children[0].children.push(new TreeNode(7));
testTree2.root.children[1].children.push(new TreeNode(20));

console.log(testTree2.traverseDFS("in"));