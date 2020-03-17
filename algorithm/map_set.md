# Map & Set (Binary Search Tree)

- Map & Set 은 비교가능한 데이터를 빠르게 추가/삭제/접근 할 수 있다.
- Binary Search Tree를 이용하여 구현된다.
- 노드 우선순위
  - 왼쪽 자식 노드와 왼쪽의 모든 노드들은 부모보다 작은 우선순위를 가짐
  - 오른쪽 자식 노드와 오른쪽의 모든 노드들은 부모보다 큰 우선순위를 가짐

- 구현체 이용 (일반적으로 중복처리는 별도로 해주지 않음)
  - 중복 관리가 필요하다면 chaining 이용!



## Set 

##### 우선 순위를 기준으로 관리되는 일반적인 Binary Search Tree

- Java의 경우 TreeSet 이용 (add, remove, contains)

- C++의 경우 set 이용 (insert, erase, count(data)) 

  ```c++
  //find메소드를 이용해서 검색을 할 수 있음
  set<int> s;
  s.insert(1);
  s.insert(2);
  //find(data)의 data가 이미 존재하지 않는다면 end() iterator를 반환한다.
  //존재한다면 해당 번호에 해당하는 iterator를 반환한다.
  if(s.find(2) != s.end()){
      printf("already exists!");
  }
  ```




## Map

##### 데이터를 관리하되 우선순위를 별도의 키(Key) 데이터로 관리 <key, data> 형식

- Java의 경우 TreeMap이용 (put, remove, containsKey)

- C++의 경우 map이용 (insert, erase, count(이용해서 key값 있는지 체크)) 

  - pair (utility header) : 두 객체를 하나의 객체로 취급 할 수 있도록 묶어주는 클래서. 이를 이용해서 key, data를 묶어서 insert시킴

    ```c++
    map<string, int> tempSet;
    tempSet.insert(make_pair("key1", 1));
    tempSet.insert(make_pair("key2", 2));
    tempSet.erase("key2");
    tempSet.count("key1") == 1;
    //키로써 사용가능 마치 배열처럼
    tempSet["key1"]++;
    ```
    

  




