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
}