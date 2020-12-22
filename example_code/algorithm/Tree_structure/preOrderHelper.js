const preOrderHelper = node => {
    // 배열의 FIRST에 값을 삽입
    treeValues.push(node.value);
    // 모든 자식 노드에 대해 재귀적으로 함수 호출
    if (node.children.length !== 0) {
        node.children.forEach(child => {
            preOrderHelper(child);
        });
    }
    return true;
}