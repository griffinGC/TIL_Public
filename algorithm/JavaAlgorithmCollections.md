# Java Algorithm Collections

> 자바기반 알고리즘 문제해결을 하기 위한 라이브러리 정리



## Collections 구조

- 크게 **List**, **Set**, **Map** 3개의 인터페이스로 구성되어 있음
  - 하위에 그 각각의 인터페이스를 구현하는 함수로 이루어져 있음
  - **LIst** : 순서유지 & 저장, 중복 저장 가능
    - ArrayList, Vector, LinkedLIst
  - **Set** : 순서 유지 안하고 저장, 중복 저장 불가 
    - HashSet, TreeSet
  - **Map** : 키와 값을 쌍으로 저장, 키는 중복 저장 불가
    - HashMap, HashTable, TreeMap, Properties



## 1. List

- `E` 는 타입 파라미터

- List는 제네릭 타입 

- Iterator 사용가능

- List의 공통 메소드

  - 객체추가

    - `boolean add(E element)` : 객체를 맨 끝에 추가
    - `void add(int index, E element)` : index에 객체 추가
    - `E set(int index, E element)` : 주어진 index의 저장된 객체를 `element` 로 바꾸고 위치의 이전 객체 리턴

  - 객체 검색

    - `boolean contains(Object o)` : 객체 저장 여부 판단
    - `E get(int index)` : 주어진 인덱스에 저장된 객체 리턴
    - `boolean isEmpty()` : 컬렉션이 비었는지 조사
    - `int size()` : 저장되어 있는 객체 수 리턴

  - 객체 삭제

    - `void clear()` : 저장되어 있는 모든 객체 삭제

    - `E remove(int index)` : 주어진 인덱스에 저장된 객체 삭제
    - `boolean remove(Object o)` : 주어진 객체 삭제

  - `List<E> subList(int fromIndex, int toIndex)`
    - `fromIndex` 에 위치한 객체부터  `toIndex` 의 **바로 앞 객체**까지를 `List<E>`에 저장
  - `boolean retainAll(Collection<?> c)`
    - Collection c에 있는 원소와 같은 원소만을 담는다. 나머지는 삭제
  - `boolean removeAll(Collection<?> c)`
    - Collection c에 있는 원소와 동일한 원소들을 모두 지운다.

  

- List 구현 클래스

  - ArrayList, Vector, LinkedList

  - List가 인터페이스 이기 때문에 구현 객체를 생성해서 인터페이스 변수에 대입해야함

  - `List<E> 변수명 = new ArrayList<E>(사이즈);`

    `List<E> 변수명 = new ArrayList<E>(30);`

  ### ArrayList

  - 시간 복잡도는 O(n)
  - 배열이 다 차면 배열의 크기를 2배로 늘려줌. 계속 O(n) 유지 가능
  - 인덱스로 객체 관리, 배열과 다른점은 배열은 사용 중 크기 변경 못하지만, 

    ArrayList는 저장용량을 초과한 객체들이 들어오면 자동적으로 저장용량이 늘어난다.

  - 추가하면 index가 0부터 차례대로 추가되고, 삭제되면 index가 1씩 당겨짐
  
  - C++의 vector와 비슷
  
	- 빈번한 객체의 삽입과 삭제에서는 바람직하지 않음, 인덱스 검색과 마지막 객체 추가 용이
  
  - 빈번한 객체 삽입과 삭제에서는 `LinkedList` 이용하는게 바람직
  
  - 다차원 불가능
  
    - 대신, 자료형으로 배열을 넣어서 2차원 처럼 사용 가능!
    - 또는 아래와 같은 형식으로 자료형으로 ArrayList를 넣어서 사용!
      - `ArrayList<ArrayList<String>> doubleMatrix = new ArrayList<ArrayList<String>>();`
  
  - `indeoxOf(값)` : 값을 가지고 있는 인덱스를 리턴해 줌

  - `Iterator` 객체를 만들고 사용가능

  - 정렬을 위해서는 `Collctions.sort()` 사용 (오름차순). 내림차순의 경우 `Collections.reverse()`
    - `Collections.sort(Arraylist이름)`
    ```java
    // 오름차순으로 정렬됨
    Collecitons.sort(list);
    // 내림차순으로 정렬됨
    Collections.reverse(list);
    ```
  - ArrayList 특정 일관된 값 초기화 방법
    - 일일이 하나하나 초기화 하는 방법도 존재하지만, 그것 보다는 `Arrays.asList()` 메소드와 `Collections.fill()` 메소드를 이용해서 특정값으로 초기화 가능
    1. `Arrays.asList()` 에 `new` 메소드와 배열을 이용해서 객체를 할당
    2. 이를 이용해서 만든 리스트에 `Collections.fill()` 메소드를 이용해서 특정 값 지정
    ```java
    // n만큼의 크기를 가진 배열 객체를 Arrays.asList를 이용하여 ArrayList에 새로운 객체로 할당
    ArrayList<Boolean> list = new ArrayList(Arrays.asList(new Boolean[n]));
    // FALSE 값으로 지정해서 list에 저장
    Collections.fill(list, Boolean.FALSE);
    ``` 
  - ArrayList 특정 일관된 값 말고 여러 값으로 초기화 하는 방법
    - 그냥 배열 형태로 넣거나 `new` 연산자 이용해서 넣기
    ```java
    ArrayList<Integer> list = new ArrayList(Arrays.asList(new Integer[]{1, 2, 3}));
    ```
  

  ### Vector
  
  - `ArrayList` 와 비슷함
  - 다른점은 동기화(Synchronized) 된 메소드로 구성되어 있어서 멀티 스레드가 동시에 메소드 실행불가
  - 하나의 스레드가 실행을 완료 해야만 다른 스레드가 실행 가능
  
  
  
  ### 	LinkedList
  
  - 인접 참조를 링크해서 체인처럼 관리
  - 객체를 제거하면 앞뒤 링크만 변경되고 나머지 링크는 변경되지 않음
  - 빈번한 객체 삭제와 삽입에 유리



## 2. Set

- 순서 유지 불가, **중복 불가**, null도 한개만 사용 가능
  - 중복이 불가 하기 때문에 `contains()` 로 확인 안하고 넣을 수 있음!

- Set의 공통 메소드

  - 객체 추가
    - `boolean add(e)` : 주어진 객체 저장. 성공시 true 리턴 
  - 객체 검색
    - `boolean contains(Object o)` : 주어진 객체가 저장되어 있는지 여부 판단
    - `boolean isEmpty()` : 비어있는지 확인
    - `Iterator<E> iterator()` : 저장된 객체를 한번씩 가져오는 반복자 리턴. Iterator 인터페이스 타입을 리턴
    - `int size()` : 저장되어있는 전체 객체 수 리턴
  - 객체 삭제
    - `void clear()` : 저장된 모든 객체 삭제
    - `boolean remove(Object o)` : 주어진 객체 삭제
  
- Iterator 사용 안하고 반복 뽑아 내려면 향상된 for문 이용하면 됨

  ```java
  for(String str : set){
  	// 주어진 객체 수 만큼 루핑  
  }
  ```

- Set 구현 클래스 

  - HashSet, TreeSet

  - `Set<E> 변수명 = new HashSet<E>(사이즈);`

    `Set<E> 변수명 = new TreeSet<E>(사이즈);`

  ### HashSet

  - `Set` 의 구현 클래스
  - 객체 순서 없이 저장하고, 동일한 객체는 저장하지 않음

  - 객체 저장 전에 먼저 객체의 `hashCode()` 메소드를 호출해서 해시코드를 얻음

    그리고 이미 저장된 객체들과 비교. 같으면 `equals()` 로 다시 비교 후, 

    True 나오면 동일로 판단하고 저장 안함. False 나올 경우에만 저장
  
  
  
  ### TreeSet
  
    - 이진트리 기반으로 한 `Set` 컬렉션
    - 부모 값 비교해서 낮은건 왼쪽 자식노드, 큰 건 오른쪽 자식 노드에 저장
  
  - `Set<E> 변수명 = new TreeSet<E>();`
  
    `TreeSet<E> 변수명 = new TreeSet<E>();`
  
  - `TreeSet` 객체를 `TreeSet` 클래스를 타입으로 넣은 이유는 객체를 찾거나 범위 검색과 관련된 메소드를 사용하기 위해서임
  
  - TreeSet 메소드
  
    - `E first()` : 제일 낮은 객체 리턴
  
    - `E last()` : 제일 높은 객체 리턴
  
    - `E lower(E e)` : 주어진 객체 바로 아래 리턴
  
    - `E higher(E e)` : 주어진 객체 바로 위 리턴
  
    - `E floor(E e)`
  
       : 주어진 객체와 동등한 객체 있다면 그것 리턴. 없으면 객체의 바로 아래의 객체 리턴
  
    - `E ceiling()` 
  
      : 주어진 객체와 동일한 객체 있으면 리턴. 없으면 바로 위 객체 리턴
  
    - `E pollFirst()` : 제일 낮은 객체 꺼내오고 컬렉션에서 제거
  
    - `E pollLast()` : 제일 높은 객체 꺼내오고 컬렉션에거 제거
  
  - 정렬관련 메소드
  
    - `Iterator<E> descendingIterator()`
      - 내림차순으로 정렬된 Iterator 리턴
    - `NavigableSet<E> descendingSet()`
      - 내림차순으로 정렬된 NavigableSet 반환
    - `descendingSet()` 을 두번쓰면 오름차순으로 바뀜
  
  - 범위 관련 메소드
  
    - `NavigableSet<E> headSet(E toElement, boolean inclusive)`
  
      : 주어진 객체보다 낮은 객체들을 `NavigableSet` 으로 리턴
  
       주어진 객체포함 여부는 두번째 매개 값에 따라 달라짐
  
    - `NavigableSet<E> tailSet(E fromElement, boolean inclusive)`
  
      : 주어진 객체보다 높은 객체들을 `NavigableSet` 으로 리턴
  
      주어진 객체 포함 여부는 두번째 매개 값에 따라 달라짐
  
    - `NavigableSet<E> subSet(E 시작, boolean 시작포함여부, E 끝, boolean 끝포함여부)`
  
      : 주어진 객체들 사이값 `NavigableSet` 으로 리턴
  
      시작과 끝 객체는 2,4번째 매개값에 따라 달라짐



## 2. Map

- key 와 value 로 구성된 **Entry 객체**를 저장하는 구조
  
- Map.Entry에 Key와 Value가 존재
  
- Map.Entry
  - Map 인터페이스의 내부 인터페이스
  - Map에 저장되는 Key-Value쌍을 다루기위해 내부적으로 Entry 인터페이스 구현
  - getKey(), getValue(), setValue(), equals() 등이 존재

- key 와 value 모두 객체

- **key 는 중복 저장 불가. value 는 중복 저장 가능**

- 기존에 저장된 key와 동일한 key로 값을 저장하면, 기존의 값이 사라지고 새로운 값이 할당됨
- Map value에 의한 정렬의 경우 `Comparator` 인터페이스 이용
  > https://cornswrold.tistory.com/114
- Map의 공통 메소드

  - 객체 추가
    - `V put(K key, V value)` : 주어진 키와 값을 추가. 저장되면 값을 리턴
  - 객체 검색
    - `boolean containsKey(Object key)` : 주어진 키가 있는지 여부
    - `boolean containsValue(Object value)` : 주어진 값이 있는지 여부
    - `Set<Map.Entry<k, v>> entrySet()` : 키와 값으로 구성된 모든 Map.Entry객체를 Set에 담아서 리턴. (key와 value쌍을 이용한 set 리턴)
    - `V get(Object key)` : 주어진 키가 있는 값(Value)을 리턴
    - `boolean isEmpty()` : 비어있는지 여부 확인
    - `Set<K> keySet()` : 모든 key를 set 객체에 담아서 리턴
    - `int size()` : 저장된 키의 수 리턴
    - `Collection<V> values() ` : 저장된 모든 값을 Collection에 담아서 리턴
    - `Iterator<E> iterator()` : 저장된 객체를 한번씩 가져오는 반복자 리턴. Iterator 인터페이스 타입을 리턴
  - 객체 삭제
    - `void clear()` : 모든 Map.Entry(키와 값)을 삭제
    - `V remove(Object Key)` : 주어진 Key와 일치하는 Map.Entry를 삭제하고 값을 리턴
  - 성능은 HashMap이 `get()` 메서드의 성능이 O(1)의 시간 복잡도를 가지면서 가장 뛰어남
  - Map의 정렬의 경우 클래스를 생성해서 구현하는 것이 편리함
  - TreeMap을 이용해서 key의 순서를 보장할 수도 있음
  - 또는 아래와 같이 객체 배열로 변경해서 사용하는 것도 하나의 방법임
    ```java
    Map<Integer, Integer> score = new HashMap<>();
    // keySet()을 이용해서 키들을 가져오고, 배열로 변환
    Object[] mapKey = score.keySet().toArray();
    Arrays.sort(mapKey);
    ```
    

- Map 구현 클래스 

  - HashMap, Hashtable, TreeMap

  - `Map<K, V> 변수명 = new HashMap<K, V>();`

    `Map<K, V> map = new Hashtable<K, V>();`

    `Map<K, V> map = new TreeMap<K, V>();`

  ### HashMap

  - 가장 간단한 구조의 `Map` 의 구현 클래스

  - 키로 사용될 객체는 `hashCode()` 와 `equals()` 메소드를 재정의 해서 동등 객체가 될 조건 정의해야 함

  - 동일한 키 조건은 `hashCode()` 의 리턴 값이 동일해야 하고,  `equals()` 가 true를 리턴해야 함

  - 객체 저장 전에 먼저 객체의 `hashCode()` 메소드를 호출해서 해시코드를 얻음

    그리고 이미 저장된 객체들과 비교. 같으면 `equals()` 로 다시 비교 후, 

    True 나오면 동일로 판단하고 저장 안함. False 나올 경우에만 저장

  - **키(Key)와 값(Value)은 기본타입 사용불가!!**
    - 클래스 및 인터페이스 타입만 가능!!
    - Ex) String, Integer...
    - `Map<String, Integer> map = new HashMap<String, Integer>();`
    
  - Map과 ArrayList를 같이 사용 할 수 있음
    - `Map<String, Object> map = new HashMap<String, Object>();` 이런식으로 사용 가능
    - 여기서 나중에 ArrayList에 값을 추가하여도 Map에 반영되어 있음
  - **HashMap은 순서를 보장하지 않음**
  ### Hashtable
   - 중복을 허용하지 않음
   - HashMap 처럼 키로 사용할 객체는 hashCode()와 equals() 메소드를 재정의 해서 동등객체가 될 조건 정해야 함
  
      - 단, 동기화 된 메소드로 하나의 스레드가 실행을 완료해야함, 다음 스레드를 실행할 수 있음
  
        (Vector 처럼)
  
      - 멀티 스레드 환경에서 객체 안전하게 추가, 삭제 가능
  
        
  
  ### LinkedHashMap
  
  - 입력된 순서대로 데이터가 출력되는 특징을 가짐
  
  
  
  ### TreeMap
  
  - 입력된 Key의 소트순으로 데이터가 출력됨
  - 중복을 허용하지 않고, Key 값을 기준으로 정렬을 해주는 자료구조
  - Comparator를 구현해서 정렬 순서 변경 가능 (값에 의한 정렬 가능)
  - 내림차순으로 정렬할때는 `Collections.reverseOrder()` 이용
    - `TreeMap<String, Integer> reverseMap = new TreeMap<String, Integer>(Collections.reverseOrder());
  ```java
  // Key에 의한 정렬
  TreeMap<Integer, Integer> treeMap = new TreeMap<>;
  Iterator<Integer> iteratorKey  = treeMap.keySet().iterator();
  while(iteratorKey.hasNext()){
    // Iterator를 이용해서 key를 가져옴
    Integer key = iteratorKey.next();
    // key를 이용해서 값을 가져옴
    System.out.println(key + " , " + treeMap.get(key));
  }
  ```
  > https://jobc.tistory.com/176
  
  

## 3. Iterator

- 컬렉션에 저장되어 있는 요소들을 읽어오는 법

- Set, List, LinkedList, ArrayList 등에서 사용 가능

- List 와 Set 관련된 것에서 사용 가능!

- 사용 메소드

  - `boolean hasNext()`: 읽어 올 요소가 있는지 여부 확인
  - `Object next()` : 다음 요소 반환
  - `void remove()` : `next()` 로 읽어 온 요소 삭제. `next()` 호출 한 다음에 호출 가능

  



## 4. Queue

- FIFO 자료구조에서 사용되는 메소드를 정의함
- 구현한 클래스는 LinkedList, PriorityQueue
- PriorityQueue : 최대 값 또는 최소 값이 우선순위를 갖고 그것이 먼저 나오는 큐
- `Queue<E> 변수명 = new LinkedList<E>();`
- 메소드
  - `boolean offer(E e)` : 주어진 객체를 맨 뒤에 넣음
  - `E peek()` : 맨 앞 객체 하나를 가져옴. (큐에서 제거 하지 않음)
  - `E poll()` : 맨 앞 객체 하나를 가져오고 큐에서 제거
  - `E remove()` : 맨 앞에 있는 요소 삭제
  - `boolean isEmpty()` : 비어 있는지를 판별



## 5. Stack

- `Stack<E> 변수명 = new Stack<E> ();`
- FILO 자료구조에서 사용하는 클래스
- Stack 클래스를 이용
- `Stack<E> 변수명 = new Stack<E> ();`
- 메소드
  - `E pop()` : 데이터 마지막 뽑고, 그 data 리턴 (마지막 data를 Stack에서 제거)
  - `void push()` : 맨 뒤에 data 추가
  - `boolean empty()` :  Stack이 비어있는지 여부 확인
  - `E peek()` : 맨 뒤의 Object 리턴(삭제는 안하고 확인)
  - `void clear()` : Stack의 모든 원소 삭제

## 6. 배열
- 특정 값 초기화 `Arrays.fill(배열, 값)`
  ```java
  boolean[] bList = new boolean[10];
  Arrays.fill(bList, false);
  ```
- 배열 정렬 방법
  - `Arrays.sort(배열명)` 사용하여 배열 정렬 가능 (오름차순)
  - 내림 차순 정렬 방법
    -  compare 오버라이딩 해서 사용하는 방식 이용
    - 즉시 구현하는 방식 사용가능
    ```java
    // lambda 함수 이용해서 구현
    Arrays.sort(arrList, (a,b) -> {return b - a});
    ```

## 7. 자바에서 정렬 방법
- 객체의 값을 비교하기 위해서 사용
- `Arrays.sort` 나 `Collections.sort` 에서 간단히 내림차순으로 구현할때는 두번째 인자에 함수를 넣어서 처리 할 수도 있음
  - 2개의 값을 비교해서 음수를 리턴하면 앞에 있는 비교자가 앞으로 정렬되고, 0을 리턴하면 동등하게 생각하고, 양수를 리턴하면 뒤에 있는 비교자가 리턴 되는 방식을 적용할 수 있음
  - 위와 같은 방식은 자바 뿐만 아니라 자바스크립트 C# 등 대부분의 sort에서 통용됨
  ```java
  // 밑의 arrow function의 경우,
  // a와 b 는 arrList라는 배열 내부의 비교값 2개를 뜻함
  // 인자 2개가 있을때 리턴 값으로 b-a 를 하기때문에, a 가 더 클경우 리턴 값으로 음수가 나오게 되고, 그 결과 앞에 있는 a 가 먼저 정렬되게 된다. 
  Arrays.sort(arrList, (a, b) -> {return b - a;})
  ```
  > https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
- Comparable, Comparator

  - Comparable

    - **기본적으로 적용되는 정렬 기준이 되는 메서드를 정의하는 인터페이스**
    - 구현한 클래스에서 compare를 구현하고 바로 사용가능!!
    - Comparable을 상속해서 compareTo 오버라이드 하여 구현하면 Comparator를 따로 구현할 필요가 없음
    - 자기 자신을 비교값으로 넣을 때는 `this` 사용
    - `public class 클래스명 implements Comparable<클래스명>`
    - compareTo 메소드 작성법
      - 현재객체 < 파라미터로 들어온 객체 : 음수 리턴
      - 현재객체 == 파라미터로 들어온 객체 : 0 리턴
      - 현재객체 > 파라미터로 들어온 객체 : 양수 리턴
      - 즉, 리턴값이 음수이거나 0일 경우에는, 현재객체가 파라미터로 들어온 객체보다 순서상 **앞** 에 위치함
    - 사용법
      - Arrays.sort(배열);
      - Collections.sort(배열);

    ```java
    public class Student  implements Comparable<Student>{
        @Override
        public int compareTo(Student stu){
     		if(this.score > stu.score){
                return 1;
            }else if(this.score < stu.score){
                return -1;
            }else return 0;
        }
    }
    ```

    

    

  - Comparator

    - **기본정렬기준과 다르게 정렬하고 싶을때 사용하는 인터페이스**
    - 구현하려면 새로운 클래스로 구현하려는 클래스 Comparator 구현해서 compare 오버라이딩 
    - 객체간의 특별한 정렬이 필요할때 사용
    - 익명의 Comparator 객체를 만들어서 사용가능
    - `public class MyComparator implements Comparator<비교할클래스>`
    - 사용법
      - Arrays.sort(배열, new MyComparator);
      - Collections.sort(배열, myComparator); // myComparator가 미리 생성 되어야함

    ```java
    package com.example.day3;
    import com.example.day2.Student;
    import java.util.Comparator;
    
    // Comparator를 구현할 클래스
    public class MyComparator implements Comparator<Student> {
    
        // 누구를 정렬상태로 삼을것인가 결정을 해야함
        @Override
        public int compare(Student o1, Student o2) {
            if(o1.getSum() < o2.getSum()){
                return 1;
            }else if(o1.getSum() > o2.getSum()){
                return -1;
                //총점으로 1차정렬, 이름으로 2차정렬
            }else return o1.getName().compareTo(o2.getName());
        }
    }
    
    ```
    - 실제 사용 예제
      - 익명의 Comparator 객체를 만들어서 사용하는 경우
    ```java
    // 익명 Comparator 객체 정의
    Comparator<Bike> sizeComparator = new Comparator<Bike>(){
      @Override
      public int compare(Bike b1, Bike b2){
        // 내림차순 정렬
        // b1이 클 경우, 음수가 나오고 b1이 b2 보다 앞에 위치하기 때문
        return b2.getSize() - b1.getSize();
      }
    } 
    // 정의한 Comparator 사용
    // 객체를 위에서 정의해도 되지만, 직접 바로 만들어도 됨
    Collections.sort(bikeList, sizeComparator);
    Collections.sort(bikeList, new Comparator<Bike>(){
      @Override
      public int compare(Bike b1, Bike b2){
        return b2.getsize() - b1.getSize();
      }
    })
    ```
  ***Comparable 과 Comparator의 차이는 기본정렬 기준을 구현하느냐 아님 기본정렬 외에 다른 기준으로 정렬하고자 하느냐 이다.***
  #### Comparable의 compareTo의 경우 인자로 하나만 들어오지만, Comparator의 compare는 인자로 2개가 들어온다.
  



## 출처 정리

- 기본정리

  > https://velog.io/@jakeseo_me/Algorithm-Study-With-Java-2-JAVA-COLLECTIONS

- Map 정리

  > https://wikidocs.net/208
  - Map 비교
    > https://tomining.tistory.com/168

- ArrayList 값 초기화
  > https://stackoverflow.com/questions/20615448/set-all-values-of-arraylistboolean-to-false-on-instantiation
  > https://www.codota.com/code/java/methods/java.util.Collections/fill

- 정렬
  > https://gmlwjd9405.github.io/2018/09/06/java-comparable-and-comparator.html
  > https://cwondev.tistory.com/15