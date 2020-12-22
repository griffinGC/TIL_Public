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