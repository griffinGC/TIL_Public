# Backtracking 
> https://idea-sketch.tistory.com/29
> https://blog.encrypted.gg/732
- 노드의 유망성 점검 후, 유망하지 않으면 그 노드의 부모 노드로 돌아가서 다른 노드를 검색한다.
    - 즉, 유망하지 않으면 배제
    - ex. 4-Queens Problem
- DFS에서 Stack과 재귀를 사용하는 것과 비슷하게 구현 가능
- 스택을 사용하고 스택을 넣기 전에 유망한지 검사