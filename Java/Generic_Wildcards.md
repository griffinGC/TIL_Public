# Generic

- generic 타입은 타입들에 대해 parameterized(매개변수화)한 generic 클래스나 인터페이스
- 하나의 코드를 다양한 데이터 타입에 대해 사용할 수 있도록 하는 기능
  - generic 없이 그냥 Object 로만 표현을 하게 된다면 아무거나 넘겨 줄 수 있지만, 컴파일할때 어떤걸로 사용할지 알 수 없음
  - 어떻게 사용될 지 알 수 없음
  - 캐스팅은 좋지 않은 방식임
- java7부터는 인스턴스 생성할 때 타입 인자 2번 주지 않아도 됨
  - 컴파일러가 context보고 결정 함
  - List<Integer> list = new ArrayList<>();

- 예시 코드

  - 클래스 이름 옆에 `<T>` 를 붙여서 클래스 내부에서 타입변수 `T` 이용해서 사용 가능

  - Before

    ```java
    public class Box{
      private Object object;
      
      public void set(Object object) {this.object = object;}
      public Object get(){return object;}
    }
    ```

  - After

    ```java
    public class Box<T>{
      // T는 "Type"을 지칭함
      private T t;
      
      public void set(T t){ this.t = t;}
      public T get(return t;)
    }
    ```

    - `Object` 들이 `T` 로 대체 가능함
    - 타입 변수가 내가 명시한 원시타입이아닌 어떤 클래스 타입, 어떤 인터페이스 타입, 배열 타입, 어떠한 타입이든 올 수 있음



### Generic type 초기화 및 호출

- 코드 내부에서 generic 클래스를 참조할때는 구체적인 타입을 지정해 주어야 함

  ```java
  // Integer 형태의 Box 선언 (객체 초기화 한 것 아님!)
  Box<Integer> integerBox;
  ```

- 일반 메소드 호출과 비슷하게 generic type 호출을 하면 됨. 메소드에 인자를 넘기는 대신, type 인자를 넘겨야 함

   

### Multiple type parameter

- Generic class는 여러개의 타입 파라미터를 가질 수 있음

  ```java
  public interface Pair<K, V>{
    public K getKey();
    public V getValue();
  }
  public class OrderedPair<K, V> implements Pair<K,V> {
    private K key;
    private V value;
    
  }
  ```

  



### 장점

- 컴파일 시 오류가 체크되는 장점이 있음
- 컬렉션에 넣을 타입을 지정하고 사용하면 캐스팅이 필요 없음
- 프로그래머가 generic 알고리즘을 작성할 수 있게 해줌
  - generic 알고리즘 
    - 여러가지 타입에 대해서 동작
    - 커스텀 가능
    - type safe
    - 읽기 쉬움



- 메소드 레벨 제너릭
  - public <T extends Number> void Method (Collection <T> parameter)



# WildCard

- generics의 하부 주제
- ? (물음표) 로 표시됨
- 파라미터, 필드, 지역 변수의 타입 또는 반환 타입 같은 다양한 상황에서 사용 가능
- 제네릭 메소드 호출에 대한 형식 인수, 제네릭 클래스 인스턴스 생성, 슈퍼타입으로 사용될 수 없음

### Upper Bounded Wildcards

- 변수의 제한을 완화하기 위해 사용하는 방법

- List<Integer>, List<Double>, List<Number> 를 인자로 받는 메소드를 만들기 위해 아래와 같이 사용 가능

  ```java
  public static void process(List<? extends Number> list){
    ///
  }
  ```

### Unbounded Wildcards

- 모든 타입을 인자로 받을 수 있음
  - List<?> 와 같이 물음표 만으로 정의 되어지는 것
- 2가지 유효한 사용법 존재
  1. Object 클래스에서 제공되는 기능만을 사용할 경우
  2. 제너릭 클래스의 메소드들중에 List.size, List.clear 처럼 타입 파라미터에 의존하지 않는 메소드들만 사용할 경우

### Lower Bounded Wildcards

- <? super A>

- upper bounded Wildcards와 반대의미

  - 지정된 타입과 그 상위 타입만 사용 가능

  - 예를 들면

    ```java
    List<? super Integer>
      // Integer의 상위 클래스인 Number 와 Object 만 가능
    ```

---

### Wildcards 캡쳐





### Generic에서 T와 E의 차이

> https://lng1982.tistory.com/70
>
> https://docs.oracle.com/javase/tutorial/java/generics/types.html

- <T> : type 을 나타냄
- <E> : element 를 나타냄
  - 요소로 해석
  - ArrayList는 요소(오브젝트)들을 저장하기 때문에 E로 선언
  - 리스트에서는 E(element)가 어울림
- <N> : number
- <V> : value
- <S>, <U>, <V> etc : 2nd, 3rd, 4th types
- 기능적으로는 크게 차이 없음
- 컬렉션 클래스와 같이 배열 기반으로 되어 있는 곳에서는 **E** 가 어울리고 그 외에는 **T** 가 어울린다.
- T, E, ? 세가지의 차이는 무엇?





---

### Type Parameter & Type Argument

- 서로 같다고 많이들 사용하지만 실제로는 다름
- parameterized type을 만들기 위해서 type argument를 넘겨줄때
  - Foo<T> : type Parameter
  - Foo<String> : type Argument
- 





## 참고자료

> https://offbyone.tistory.com/327

> https://stackoverflow.com/questions/40972444/java-generics-at-method-level
>
> https://docs.oracle.com/javase/tutorial/java/generics/why.html
