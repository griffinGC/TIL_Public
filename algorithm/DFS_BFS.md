# DFS_BFS



## DFS (Depth First Search)

#### 깊이 우선 탐색

- 하나의 경로로부터 도달 할 수 있는 모든 노드를 방문한 이후 다른 경로를 조회하는 방식

- 한 노드로부터 도달 할 수 있는 모든 경로를 탐색할때까지 해당 노드 정보를 유지

  - 모든 경우의 수, 규칙이 복잡한 경로를 탐색할 때 유리

- 한번에 하나의 경로만을 조회

  - 각 경로의 고유 정보를 저장하기에 유리

- 각 노드는 DFS방문 순서에 따라 다양한 성질을 가짐

- 탐색의 우선순위를 제어하기 쉬움

- 각 정점에 다양한 기준으로 번호를 부여 가능

  - In-order, Pre-order, Post-order Numbering

- 탐색 기준에 따라 트리 모양으로 전개 가능

- Stack 이나 재귀 함수를 이용하여 구현

  - `#include <stack>`

- C++ 구현 코드

  ```c++
  // dfs를 통해 넣기 위한 스택
  stack<State> dfsStack;
  // 처음 값 초기화 (1과 첫번째 depth 1을 지정)
  State firstState(1,1);
  // 초기값 스택에 넣기
  dfsStack.push(firstState);
  // 방문여부를 확인하는 vector 배열
  vector<boolean> visited(N+1, false);
  // dfs를 수행하였을때 나오는 결과물
  vector<int> visitedNode;

  // dfs수행을 위한 스택이 빌때까지 수행
  while(dfsStack.empty == false){
    // dfs스택에서 가장 위에있는 것을 가져옴
    State current = dfsStack.top();
  	dfsStack.pop();
    // 가져온 node가 이미 방문한 node일 경우 생략
    if(visited[current.nodeIndex] == true){
      continue;
    }
    // 방문 안한 node일 경우 방문한것으로 상태 값 변경
    visited[current.nodeIndex] = true;
    // node를 배열에 추가
    visitedNode.push_back(current.nodeIndex);
    // 그 node가 가진 인접리스트중에 가장 뒤에있는 것부터 실행
    // 오름차순으로 인접리스트가 정렬된 상태이기 때문에 인접리스트의 뒤에서부터 실행해서 
    // 스택에 넣어야, 스택에서 값을 뽑아서 dfs에 넣을때는 앞에서부터 나오게 됨
    for(int i = adj[current.nodeIndex].size() -1 ; i >=0; i--){
      int next = adj[current.nodeIndex][i];
      // 방문하지 않은 node일 경우에만 실행
      if(visited[next] == false){
        State nextState(next, current.depth+1);
        // stack에 node들이 하나둘씩 들어감
        // 결과적으로 그 node에 있는 depth를 계속 타고 들어가게 됨
        dfsStack.push(nextState);
      }
    }
  }
  ```
  
  
  
  

## BFS (Breadth First Search)

#### 넓이 우선 탐색

- 출발 노드로부터 가까운 노드들부터 차례대로 탐색

- 같은 깊이를 가진 모든 노드들을 조회한 이후에 다음 깊이를 조회

- 탐색순서가 일관되게 유지됨

- 최대한 낮은 깊이의 탐색 경로를 탐색할때 유리 (= 최단경로)

- 동시에 여러 경로를 탐색

- Queue를 이용하여 구현

  - `#include <queue>`

- C++ 구현 코드

  ```c++
  // bfs를 위한 queue
  queue<State> bfsQueue;
  // 처음값 초기화 (시작 번호가 1, depth가 1)
  State firstState(1,1);
  // 방문여부를 확인하는 배열
  vector<boolean> visited(N+1, false);
  // bfs를 수행하였을때 나오는 결과물
  vector<int> visitedNode;
  // 초기값 큐에 처음 넣기
  bfsQueue.push(firstState);
  // 큐가 빌때까지 계속 수행
  while(bfsQueue.empty() == false){
    // 제일 앞에 있는 node 정보 가져오고 뽑기
    State current = bfsQueue.front();
    bfsQueue.pop();
    
    // 이미 방문한 node일 경우, 생략
    if(visited[current.nodeIndex] == true){
      continue
    }
    
    // 방문하지 않은 node 일경우, 방문여부 변경 및 bfs결과에 추가
    visited[current.nodeIndex] = true;
    visitedNode.push_back(current.nodeIndx);
    
    // bfs이므로 인접리스트에 가장 앞에 있는 것부터 실행
    // 그럼 인접리스트가 오름 차순이기 때문에 가장 작은 인접한 인덱스의 node부터 들어감
    // 큐에 들어가기 때문에 인접한 것들 순서대로 들어가게 됨
    // 결과값으로 가장 인접한 것을 가장 단시간에 찾을 수 있도록 됨
    for(int i = 0; i< adj[current.nodeIndex].size(); i++){
  		int next = adj[current.nodeIndex][i];
      if(visited[next] == false){
        State nextState(next, current.depth+1);
        bfsQueue.push(nextState);
      }
    }
  }
  ```

## 참고자료
> https://twpower.github.io/73-how-to-implement-dfs-and-bfs-in-cpp

  
