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