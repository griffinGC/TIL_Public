# [프로그래머스 level3] 여행경로

> https://programmers.co.kr/learn/courses/30/lessons/43164

#### 해결방안

- DFS를 이용한 방식 사용
  - 재귀를 이용한 백트래킹 방식 사용
- 처음에는 BFS를 이용하려 했었으나, 이전에 풀었던 방식을 사용해서 풀 수 있다는 생각이 들어 DFS 사용



#### 알고리즘

1. 경로를 위한 딕셔너리, 방문 여부 파악을 위한 딕셔너리 생성 및 초기화
   - 방문한 경우 1로 변경
   - 초기화 한 것을 알파벳순으로 정렬해줌
2. dfs함수 생성
   1. 만약 값이 경로의 딕셔너리에 없다면 return으로 함수 종료
   2. 반복문을 이용해서 딕셔너리에 있는 리스트를 순회
      1. 만약 방문하지 않았다면 방문한것으로 체크
      2. 결과 값에 노드 추가
      3. dfs 재귀를 이용하여 리턴된 결과 값을 받음
         - 결과 값의 길이가 티켓의 길이 +1과 동일할 경우 함수 종료
           - 제대로 모든 경로를 방문했다는 의미
      4. 결과 값을 노드에서 삭제 및 방문여부 취소 (백트래킹)
3. 최종 결과 값에 dfs시작하기 전에 "ICN" 추가



#### 핵심 팁

- 처음에 BFS를 이용하여 구현을 했었지만 계속해서 1번 테스트 케이스 실패하여 방문 여부를 확인하는 것을 추가하여 DFS로 구현하여 성공
- 맨 처음 시작은 무조건 "ICN" (TC4)
- 모든 티켓을 사용
  - 즉, 모든 곳을 다 방문해야 함. 다르게 말하면 마지막에 방문하는 곳은 딕셔너리에 없는 곳임
  - 그렇기 때문에 수열과 조합을 사용했던 방식을 이용
    - 유사한 문제로는 백준의 [N과 M](https://www.acmicpc.net/problem/15649) 
- 동일한 경로가 있을 경우 알파벳 순으로 방문
  - 미리 리스트를 정렬해 놓아야 함



```python
def solution(tickets):
    answer = []
    # 경로 설정을 위한 딕셔너리
    route = dict()
    # 방문 여부 확인을 위한 딕셔너리
    visited = dict()
    # 초기화
    for i,j in tickets:
        if i in route:
            route[i].append(j)
            visited[i].append(0)
        else:
            route[i] = [j]
            visited[i] = [0]
    # 알파벳 순서대로 방문하기 위한 정렬
    for i in route:
        route[i] = sorted(route[i])
    # dfs 재귀 & 백트래킹
    def dfs(v, answer):
        if v not in route:
            return answer
        # 어차피 함수가 종료되면 밑에서 확인하기 때문
        # if len(answer) == len(tickets) + 1:
        #     return answer
        for index, val in enumerate(route[v]):
            # 방문하지 않았을 경우에만 수행
            if visited[v][index] == 0:
                visited[v][index] = 1
                answer.append(val)
                tmp = dfs(val, answer)
                # 완성되었을 경우 바로 종료 => 계속 종료해서 최종 종료까지 감
                if len(tmp) == len(tickets) + 1:
                    return tmp
                # (백트래킹) 실패했기 때문에 다시 방문할 수 있도록 만들기 위해 방문여부 초기화 및 추가했던것 삭제
                visited[v][index] = 0
                answer.pop()
        return answer
    answer.append("ICN")
    final_result = dfs("ICN", answer)
    return final_result
```

