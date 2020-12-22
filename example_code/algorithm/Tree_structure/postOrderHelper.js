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