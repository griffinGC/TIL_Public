# Generic

- 하나의 코드를 다양한 데이터 타입에 대해 사용할 수 있도록 하는 기능
  - generic이 없다면 Object 객체를 자신의 객체로 캐스팅 해야했었음
  - 캐스팅은 좋지 않은 방식임
- 컬렉션에 넣을 타입을 지정하고 사용할때 캐스팅이 필요 없음
  - 컴파일 시 오류가 체크되는 장점이 있음



# WildCard

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

    





## 참고자료

> https://offbyone.tistory.com/327
