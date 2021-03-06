# DFS_BFS

- 깊이 우선 탐색 & 넓이 우선 탐색

## DFS (Depth First Search)

#### 깊이 우선 탐색

- 하나의 경로로부터 도달 할 수 있는 모든 노드를 방문한 이후 다른 경로를 조회하는 방식

  - 해당 분기를 **완전 탐색!**
  - 최대한 한 방향으로 쭈욱 가다가, 더 이상 갈 수 없다면 **다시 가장 가까운 길로 돌아와서** 그 갈림길부터 다시 다른 방향 탐색하는 방식

- 한 노드로부터 도달 할 수 있는 모든 경로를 탐색할때까지 해당 노드 정보를 유지

  - 모든 경우의 수, 규칙이 복잡한 경로를 탐색할 때 유리

- 한번에 하나의 경로만을 조회

  - 각 경로의 고유 정보를 저장하기에 유리

- 각 노드는 DFS방문 순서에 따라 다양한 성질을 가짐

- 탐색의 우선순위를 제어하기 쉬움

- 각 정점에 다양한 기준으로 번호를 부여 가능

  - In-order, Pre-order, Post-order Numbering

- 탐색 기준에 따라 트리 모양으로 전개 가능

- **Stack** 이나 **재귀 함수**를 이용하여 구현

  - 재귀도 결국 함수가 계속 쌓이므로 Stack과 동일한 방식으로 운영 됨

- 구현은 BFS 보다 간단하나 **수행 시간이 더 오래 걸림**

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
  
- Java 구현코드
  ```java
  package DFSandBFS;

  import java.lang.reflect.Array;
  import java.util.*;

  public class DFS {

      public static void printDFSArray(ArrayList<Integer> arrayList){
          System.out.print("start - " );
          for(int ele : arrayList){
              System.out.print(ele + " - ");
          }
          System.out.println("end");
      }

      public static ArrayList<Integer> dfsOrderNormal(ArrayList<ArrayList<Integer>> adj, int n, int start){
          ArrayList<Integer> dfsVisitList = new ArrayList<Integer>();
          Stack<Integer> dfsStack = new Stack<Integer>();
    
          // 방문 리스트를 false로 초기화
          ArrayList<Boolean> visited = new ArrayList<Boolean>(Arrays.asList(new Boolean[n+1]));
          Collections.fill(visited, Boolean.FALSE);
    
          dfsStack.push(start);
    
          while(!dfsStack.empty()){
              Integer current = dfsStack.pop();
              if(visited.get(current) == true){
                  continue;
              }
              // 방문했을 경우 값을 true로 바꿈
              visited.set(current, true);
              // dfs출력을 위한 리스트에 추가
              dfsVisitList.add(current);
              for(int i = adj.get(current).size() - 1; i>=0; i--){
                  int next = adj.get(current).get(i);
                  if(visited.get(next) == false){
                      dfsStack.push(next);
                  }
              }
          }
          // 방문한 리스트 리턴
          return dfsVisitList;
      }

      public static void main(String[] args) {
          int N, M, start;
          Scanner sc = new Scanner(System.in);
          N = sc.nextInt();
          M = sc.nextInt();
          start = sc.nextInt();
    
          ArrayList<ArrayList<Integer>> adj = new ArrayList<ArrayList<Integer>>();
    
          // 개수를 N개가 아닌 N+1로 만드는 이유는 u,v를 0부터가 아닌 1부터
          // 즉, 본래의 숫자에 맞게 넣기 때문
          for(int i = 0; i<=N; i++){
              adj.add(new ArrayList<Integer>());
          }

  //        System.out.println("adj size is node + 1 : "  + adj.size());
          for(int i = 0; i<M; i++){
              int u, v;
              u = sc.nextInt();
              v = sc.nextInt();
              adj.get(u).add(v);
              adj.get(v).add(u);
          }

          // ArrayList를 일단 정렬 시켜야 함
          for(int i = 0; i<=N; i++){
              Collections.sort(adj.get(i));
          }
    
          ArrayList<Integer> result = dfsOrderNormal(adj, N, start);
          System.out.println("result size : " + result.size());
          printDFSArray(result);
      }
  }
  ```

- Python

  - 재귀 이용한 방식의 DFS

  ```python
  def dfs_recursive(v, discovered=[]):
    discovered.append(v)
    for w in graph[v]:
      if not w in discovered:
        discovered = dfs_recursive(w, discovered)
    return discovered
  ```

  

## BFS (Breadth First Search)

#### 넓이 우선 탐색

- 출발 노드로부터 **가까운 노드**들부터 차례대로 탐색

- 같은 깊이를 가진 모든 노드들을 조회한 이후에 다음 깊이를 조회

  - 최대한 가까이에 있는 노드들로 넓게 이동한 다음, 더 이상 갈 수 없을때 아래로 이동

- 탐색순서가 일관되게 유지됨

- **최단경로 탐색시 유리

  - DFS 같은 경우, 모든 관계를 다 탐색해야 할 수도 있지만, BFS는 가까운 것부터 탐색하기 때문에 최단 거리 탐색시 유리

- **Queue**를 이용하여 구현

- 정점의 weight을 가지고 비교하는 것이 아니라 오직 **최단 노드의 갯수**를 가지고 비교하는 것임
  - 노드의 갯수가 많아도 적은 weight을 가지고 비교하려면 다익스트라 알고리즘 사용
  - 다익스트라역시 음수 weight은 계산 불가. 음수일 경우에는 벨만-포드 알고리즘 사용

  - `#include <queue>`

- 구현이 DFS 보다 어렵지만 **시간은 더 적게 걸림**

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

- Java 구현코드
  ```java
  package DFSandBFS;

  import java.lang.reflect.Array;
  import java.util.*;

  public class BFS {

      public static void printBFSArray(ArrayList<Integer> array){
          System.out.print("start - ");
          for(int ele : array){
              System.out.print(ele + " - ");
          }
          System.out.println("end");
      }

      public static ArrayList<Integer> bfsOrderNormal(ArrayList<ArrayList<Integer>> adj, int n, int start){
          ArrayList<Integer> bfsVisitList = new ArrayList<Integer>();
          Queue<Integer> bfsQueue = new LinkedList<Integer>();

          ArrayList<Boolean> visited = new ArrayList<Boolean>(Arrays.asList(new Boolean[n+1]));
          Collections.fill(visited, Boolean.FALSE);

          bfsQueue.add(start);

          while(!bfsQueue.isEmpty()){
              int first = bfsQueue.poll();
    
              if(visited.get(first) == true){
                  continue;
              }
              visited.set(first, true);
              bfsVisitList.add(first);
    
              for(int i = 0; i<adj.get(first).size(); i++){
                  int next = adj.get(first).get(i);
                  if(visited.get(next) == false){
                      bfsQueue.add(next);
                  }
              }
          }
    
          return bfsVisitList;
      }
    
      public static void main(String[] args) {
          int N, M, start;
          Scanner sc = new Scanner(System.in);
          N = sc.nextInt();
          M = sc.nextInt();
          start = sc.nextInt();
    
          ArrayList<ArrayList<Integer>> adj = new ArrayList<ArrayList<Integer>>();
    
          for(int i = 0; i<=N; i++){
              adj.add(new ArrayList<Integer>());
          }
    
          for(int i = 0; i<M; i++){
              int u, v;
              u = sc.nextInt();
              v = sc.nextInt();
              adj.get(u).add(v);
              adj.get(v).add(u);
          }
    
          for(int i = 0; i<=N; i++){
              Collections.sort(adj.get(i));
          }
    
          ArrayList<Integer> result = bfsOrderNormal(adj, N, start);
    
          printBFSArray(result);
      }
  }

  ```



## DFS & BFS 비교

- DFS
  - 현재 노드에서 **갈 수 있는 노드까지** 들어가며 탐색
  - 검색 대상이 클 경우 유리
  - **스택** 혹은 **재귀**로 구현
- BFS
  - 현재 노드에서 연결된 **가까운 노드들**부터 탐색
  - 최단 거리 구하는 문제시 유리
    - DFS는 나온 답이 무조건 최단거리가 아닐 수 있음
    - BFS는 노드에서 가까운 것부터 찾기 때문에 무조건 최단 경로가 됨
  - **큐**로 구현

- 시간 복잡도

  - 인접 리스트 O(N + E)
    - 2중 for문 필요 없음
  - 인접 행렬 O(N^2)
    - 2중 for문을 돌려야 하기 때문에 O(N^2) 걸림
  - 인접리스트 방식이 좀 더 효율적

  

## 참고자료

> https://twpower.github.io/73-how-to-implement-dfs-and-bfs-in-cpp
>
> https://devuna.tistory.com/32

  