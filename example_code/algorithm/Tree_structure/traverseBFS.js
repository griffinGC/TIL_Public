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
    // 값 리턴, 모두 TreeNode
    return treeValues;
}
