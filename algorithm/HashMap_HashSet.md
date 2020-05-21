# HashMap && HashSet

- C++ 에서는 hash_map, hash_set 이라고 부름

- hash_map보다는 unordered_map을 많이 사용함 (다른방식이므로 고려해볼것)

  

### 일반적인 map, set과의 차이

- map, set은 자료를 정렬하여 저장
  - 반복자로 저장된 데이터를 순회할때 넣은 순서가 아닌 정렬된 순서로 순회

- hash_map, hash_set은 정렬하지 않으며 저장
  - **검색속도**가 map, set보다 빠름



---

- Map, Set 사용하는 경우 
  - 정렬된 상태로 자료 저장을 하고 싶을 때!
- hash_map, hash_set 사용하는 경우
  - 정렬이 필요 없으며 빠른 검색을 원할 때!




### 사용법

```c++
#include <hash_map>
using namespace stdext;
hash_map<char, int> hash1
```

- 원형

  `hash_map<key자료형, value자료형> 변수이름`

- `hash_map`을 include해야함

- `namespace`로는 std가 아닌 `stdext`를 선언해야함

- 동적할당 사용가능

  ```c++
  hash_map<key 자료 type, value 자료 type>* 변수 이름 = new hash_map<key 자료 type, value 자료 type>;
  ```
- 주요 멤버함수

| 멤버        | 설명                                                       |
| ----------- | ---------------------------------------------------------- |
| begin       | 첫번째 원소의 랜덤 접근 반복자 반환                        |
| clear       | 저장한 모든 원소 삭제                                      |
| empty       | 저장한 원소 없으면 true 반환                               |
| end         | 마지막 원소 다음의 반복자를 반환                           |
| erase       | 특정 위치의 원소나 지정 범위의 원소들 삭제                 |
| find        | key와 연관된 원소의 반복자 반환                            |
| insert      | 원소 추가                                                  |
| lower_bound | 지정한 key의 요소가 있다면 해당 위치의 반복자를 반환       |
| rbegin      | 역방향으로 첫번째 원소의 반복자 반환                       |
| rend        | 역방향으로 마지막 원소 다음의 반복자 반환                  |
| size        | 원소의 개수를 반환                                         |
| upper_bound | 지정한 key 요소가 있다면 해당 위치 다음 위치의 반복자 반환 |



#### insert (값 삽입)

- 총 3가지 경우 존재

- pair insert(const value_type& val)

  - 값(key, value)을 삽입
  - hashmap이름.insert(키, value)
    - hashmap1.insert(**hash_map::value_type(10, 45.6f)**);

- iterator insert(iterator 위치, const value_type& val)

  - 특정 위치에 값을 삽입
  - hashmap이름.insert(위치, value);
    - hashmap1.insert(hashmap1.begin(), **hash_map::value_type(11, 50.2f)***);

- template void insert(inputIterator first, inputIterator last)

  - 지정한 반복자 구간에 있는 것들을 추가
  - 추가되는hashmap이름.insert(추가할hashmap의 시작위치, 추가할hashmap의 끝나는 위치)
    - hashmap2.insert(hashmap1.begin(), hashmap2.end())

  

#### erase (값 삭제)

- 총 3가지 경우 존재

- iterator erase(iterator _where)

  - 특정위치에 있는 요소를 삭제

  - 반환 값으로 삭제된 요소의 다음 것을 가리킴

  - hashmap이름.erase(iterator위치);
    - hashmap1.erase(hashmap1.begin());

- iterator erase(iterator first, iterator last);

  - 지정한 구간에 있는 모든 요소들을 삭제
  - 반환 값으로 삭제된 요소의 다음 것을 가리킴

  - hashmap이름.erase(처음위치, 마지막 위치);
    - hashmap1.erase(hashmap1.begin(), hashmap1.end())

- size_type erase(const key_type& key);
  - 지정한 키와 같은 요소 삭제
  - 반환 값으로 삭제된 개수를 반환
  - hashmap이름.erase(키 이름);
    - hashmap1.erase(11);



#### find (값 검색)

- 총 2가지 방식이 존재

- 검색은 Key를 사용하여 같은 Key를 가지고 있는 요소를 찾음

- Key와 같은 요소를 찾으면 그 요소의 반복자를 반환하고, 찾지 못한 경우에는 end()를 가리키는 반복자 반환

- iterator find(const Key& key);

  - 리턴값이 const가 아니므로 찾은 요소의 value를 변경할 수 있다. (key는 변경 불가)

- const_iterator find(const Key& key) const;

  - 리턴값이 const이므로 찾은 요소의 value변경 불가 (물론, key도 변경 불가)

  ```c++
  // Key가 10인 요소 찾기
  hashmap::iterator findIter = hashmap1.find(10);
  
  // 찾은 요소의 value를 209.44로 변경
  if(findIter != hashmap1.end()){
      // pointer를 반환하기 때문에 '->'를 이용해서 접근!!
      findIter->second = 209.44f;
  }
  ```

  







### 참고자료

> http://www.hanbit.co.kr/channel/category/category_view.html?cms_code=CMS4230438179
>
> https://stackoverflow.com/questions/3578083/what-is-the-best-way-to-use-a-hashmap-in-c

