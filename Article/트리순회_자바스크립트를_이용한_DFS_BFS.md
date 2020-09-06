# 트리 순회 : 자바스크립트를 이용한 넓이우선탐색, 깊이우선탐색

> https://medium.com/swlh/traversing-trees-breadth-first-and-depth-first-searches-with-javascript-316f23c9fe8f
> 

![firstTree](https://miro.medium.com/max/562/1*yv20NoCVYhsLbNAHOMGflQ.png)

내가 젋었을때, 가지고 있는 파일이나 폴더들을 무작위로 내 컴퓨터나 외부 하드 드라이브에 흩뿌려 놓곤 했다. 컴퓨터로 대부분의 작업을 하는 고등학생이 되었을때, 파일 구성이 섞여있기 때문에 컴퓨터에서 무언가를 찾기에는 너무 어렵다는 것을 깨달았다.

모든 파일을 완전히 재정렬하기위해서 주말을 모두 사용했다(USB 3.0이 나오기 전에 일이었다.). 대학에서 몇 번 바쁜 시간을 제외하고는 파일과 폴더가 매우 깨끗하게 유지되었다. 그리고 그랬기 때문에 클라우드 저장소를 사용하기 시작했을때 도움이 되었다.



## 트리

![tree](https://miro.medium.com/max/201/1*EDljI717AUw03zyjkYX9bg.png)

컴퓨터에 있는 파일과 폴더들은 **트리** 라고 불리는 자료구조로 구성되어 있다. 트리는 아래의 간단한 규칙을 따르는 토드들의 계층적인 콜렉션이다.

1. 트리는 루트 라는 하나의 노드를 가지고 있다. 루트 노드는 직접적으로 혹은 후손 노드의 자식 (이것은 루트에 참조를 가지는 노드가 없다는 것을 의미한다.) 으로써 모든 노드로 줄기를 뻗어나간다.
2. 노드는 오직 하나의 참조만을 가질 수 있다. (노드는 그것을 가리키는 여러개의 다른 노드들을 가질 수 없다.)

나는 이전에  [이진 탐색 트리](https://medium.com/@gianfranconuschese/binary-search-trees-in-javascript-d35965762dbd) 라는 특별한 트리의 종류에 대해 다루었지만, 이 글에서는 트리의 기본 구현을 다룰 것이다.

```javascript
class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}

class Tree {
    constructor(){
        this.root = null;
    }
}
```



## 너비 우선 탐색

컴퓨터에는 파일 트리를 탐색하는 간편한 인터페이스가 있지만, 우리는 프로그래밍적으로 트리를 탐색하기위한 방법이 필요하다. 이러한 방법중 하나는 **너비 우선 탐색**이다. (BFS라고 불리는) 너비 우선 탐색은 노드의 각각의 행을 읽는 것처럼, 트리를 왼쪽에서 오른쪽으로, 그리고 위에서 아래로 순회한다. 

![BFS](https://miro.medium.com/max/700/1*3B5cxVm4BhUOIv0r81MzEw.png)

위의 예시를 BFS를 이용한다면, 아래와 같은 답을 얻을 수 있다.

첫번째 행 : `H` + 두번째 행 : `el` + 세번째 행 : `loWorld` = `HelloWorld`

프로그래밍적으로 이렇게 하기 위해서는, [큐](https://medium.com/swlh/stacks-and-queues-simplified-ef0f838fc534?source=your_stories_page---------------------------) 라고 부르는 다른 자료구조가 필요할 것이다. 큐는 처음들어온게 처음으로 나가는 방식을 따르는 데이터를 처리하는 방법이다. 새로운 데이터는 큐의 마지막에 추가되고, 데이터들은 큐의 첫번째부터 처리된다. 구현을 살펴보자.

```javascript
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
            // 현재의 first 포인터를 새로운 first(새 노드)에 넣고, 그 새 노드를 새로운 first노드로 만든다.
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
}
```

큐의 맨 앞에서부터 노드를 처리할때, 노드가 자식을 가지고 있는지 확인해봐야 한다. 만약 가지고 있다면, 자식들을 큐의 뒤에 추가해야 한다. 또한 배열에 각 노드의 값을 더함으로써 계속해서 추적해야 한다. 구현을 살펴 보자.

```javascript
traverseBFS() {
    // root 가 없다면, false 리턴
    if (!this.root) {
        return false;
    }
    // 새로운 Queue 생성
    const queue = new Queue();
    // 트리에 있는 모든 값을 계속 기록
    const treeValues = [];
    // 큐에 root 삽입
    queue.enqueue(this.root);
    // 큐가 비어있지 않은 동안 실행
    while(queue.size !== 0) {
        // TreeNode 자식 가져오기
        const nodeChildren = queue.first.value.children;
        // 노드가 자식을 가지고 있을 경우, 루프를 돌려서 큐에 추가
        if (nodeChildren.length !== 0) {
            nodeChildren.forEach(child => queue.enqueue(child));
        }
        // 큐에 있는 첫번째 아이템을 트리 값들에 넣음
        treeValues.push(queue.first.value);
        // 큐에서 첫번째 노드 삭제
        queue.dequeue();
    }
    // 값 리턴, 모두 TreeNodes
    return treeValues;
}
```

위에 포스팅한 트리 예제를 사용하여 동작하는 코드를 보고 싶다면 이 포스트의 맨 밑을 보면 된다.



## 깊이 우선 탐색

(DFS라고 불리우는)깊이 우선 탐색은 트리를 탐색하는 다른 방법이다. 이것은 재귀를 사용한다. DFS를 사용하면, 우리가 원하는 순서대로 다양한 방식으로 트리를 순회할 수 있다. 각각의 구현에서, 이 숫자 트리를 참조할 것이다.

![number_tree](https://miro.medium.com/max/523/1*OStQR2Q2-uJzmm3SSWs2XA.png)

또한, 각 순서를 위해 헬퍼 메서드를 사용할 것이다. 그리고 사용할 순서를 규정하기 위해 스위치 문을 사용할 것이다. 외부 함수를 살펴보자

```javascript
traverseDFS(type) {
    // root 가 없다면, false 리턴
    if (!this.root) {
        return false;
    }
    // tree 값에 대한 변수 생성
    const treeValues = [];
    // 현재 값들은 항상 root에서 시작
    let current = this.root;
    
    // 헬퍼 메서드 위치

    // 적절한 순서 결정을 위한 스위치문과 재귀 함수 호출 시작
    switch (type) {
        case "pre" :
            preOrderHelper(current);
            break;
        case "post":
            postOrderHelper(current);
            break;
        case "in":
            inOrderHelper(current);
            break;
    }
    // 배열 리턴
    return treeValues;
}
```

### 전위 (Pre-Order)

전위는 트리를 수직적으로 위에서 아래로, 왼쪽에서 위로 순회한다. 첫번째로 반환되는 값은 **항상** 루트 값 이다. 위에 있는 숫자 트리에 대해서, [10, 6, 3, 8, 7, 15, 20]의 리턴을 얻게 된다.

```javascript
const preOrderHelper = node => {
    // 배열에 값 먼저 삽입
    treeValues.push(node.value);
    // 모든 자식 노드에 대해 재귀적으로 함수 호출
    if (node.children.length !== 0) {
        node.children.forEach(child => {
            preOrderHelper(child);
        });
    }
    return true;
}
```

현재 노드의 값을 먼저 넣어야 한다. 그리고 그 다음에 현재 노드의 각각의 자식노드에 대해 재귀적으로 함수를 호출한다.

### 후위 (Post-Order)

후위는 한가지만 빼놓고 전위와 비슷하다. 후위는 트리를 수평적으로 **아래에서 위로**, 왼쪽에서 오른쪽으로 순회한다. 루트 값은 항상 **마지막**에 반환되야 한다. 위에 있는 트리는 [3, 8, 7, 6, 20, 15, 10]을 반환할 것이다.

```javascript
const postOrderHelper = node => {
    // 모든 자식 노드에 대해 재귀적으로 함수 호출 먼저
    if (node.children.length !== 0) {
        node.children.forEach(child => {
            postOrderHelper(child);
        });
    }
    // 배열에 값 삽입
    treeValues.push(node.value);
    return true;
}
```

간단하게 전위 함수에서 발생하는 액션 순서를 거꾸로 했다. 배열에 어떤 노드를 삽입하기 전에 함수를 재귀적으로 호출한다.

### 중위

중위는 다른 2개 순서와 약간 다르다. 중위는 트리구조의 모습을 재생성한다. 그렇게 함으로써 아래에서 위로 왼쪽에서 오른쪽으로 후위와 비슷하게 순회한다. 그러나 이것은 모든 노드의 자식노드를 2개로 나누고, 왼쪽 절반을 먼저 수행하고, 그 다음 부모 노드, 그리고 오른쪽 절반을 수행한다. 위의 숫자 트리에서는 [3, 6, 8, 7, 10, 15, 20]을 반환할 것이다.

```javascript
const inOrderHelper = node => {
    // 노드가 자식이 있다면, 트리가 이진트리가 아닐 경우 노드들을 왼쪽 절반과 오른쪽 절반으로 나눔
    if (node.children.length !== 0) {
        // 반쪽 지점 
        const halfway = Math.floor(node.children.length / 2);
        // 반쪽 지점의 왼쪽에 있는 모든 자식 노드들을 재귀적으로 호출
        for (let i = 0; i < halfway; i++) {
            inOrderHelper(node.children[i]);
        }
        // 부모 노드 값을 배열에 삽입
        treeValues.push(node.value);
        // 반쪽 지점의 오른쪽에 있는 모든 자식 노드들을 재귀적으로 호출
        for (let i = halfway; i < node.children.length; i++) {
            inOrderHelper(node.children[i]);
        }
    // 자식이 없는 경우, 배열에 값을 삽입
    } else {
        treeValues.push(node.value);
    }
    return true;
};
```

각각의 자식 노드가 가질 수 있는 수에 대해서 제한이 없기 때문에, 노드를 쪼개야 한다. 중위 DFS는 이진 탐색 트리를 이용하여 쉽게 구현될 수 있다. 이진탐색트리는 각각의 노드가 오직 최대 2개의 자식 노드만을 가질 수 있으며, 왼쪽과 오른쪽 노드가 구체적으로 정의 된다. 사실, 이진 탐색 트리는 정렬되어 있기 때문에, DFS가 이진 탐색트리를 사용할때, DFS는 모든 노드 값의 정렬된 배열을 반환한다.



## BFS와 DFS를 사용하는 시점

BFS와 DFS 모두 최악의 경우 O(n) 의 시간 복잡도를 가지고 있다. BFS는 넓은 트리에서 수행하기 위해 더 많은 메모리를 사용하기 때문에 깊은 트리에서 더 좋다. 반대로 DFS는 깊은 트리를 순회하기 위해 많은 메모리를 사용하기 때문에, 넓은 트리에서 잘 동작한다. 2개 모두 탐색기 위한 것이기 때문에, 탐색하는것의 결과 역시 고려해야한다. 보충 설명에 대해서는 출처 섹션에 링크 시켜놓은 [스택오버플로우](https://stackoverflow.com/questions/3332947/when-is-it-practical-to-use-depth-first-search-dfs-vs-breadth-first-search-bf)를 살펴 보아라.



## 탐색 전체 코드

```javascript
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

// 중위 탐색
console.log(testTree2.traverseDFS("in"));
```

