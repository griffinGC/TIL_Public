# Immutability

- 복제나 비교를 위한 조작 단순화 가능
- Immutable 객체는 좋은 Map 키, Set 원소
  - 생성되면 변경 안됨
- Immutability는 코드에 대해 쓰고, 사용하고, 판단하기 쉽게 함
  - 클래스 불변은 한번 만들어지면 변치 않음
- 객체들 간에 충돌을 일으키지 않기 때문에, 프로그램을 병렬화 시키기 쉬움
- Immutable Object를 변경하고 싶을때는 복사해서 사용해야 함
  - 성능이 신경 쓰일때는 mutable 사용
- 프로그램 내에서 고정된 부분이 많아지므로 프로그램 안정도 높일 수 있음



## 특징

> https://dzone.com/articles/immutability-in-java
>
> https://www.baeldung.com/java-immutable-object

> 단순, 간결, 에러가 덜 발생하는 경향이 있아.

- Thread safety
  - 하나의 스레드가 다른 스레드에서 쓰이는 값 변경 못함
  - synchronization 이슈 발생 안함
- Atomicity of failure
  - 예외가 던저진 이후에도 객체를 계속 사용할 수 있음
  - 예외가 있더라도 프로그램의 내부 상태는 변함 없음
- Absense of Hidden side-effects
  - immutable objects are side-effects free
  - 이 객체를 참조하는 어떠한 객체도 달라지지 않기 때문에 가능
- Protection against null reference errors
- Ease of Caching
  - 객체들이 변경되지 않기 때문에 불변 객체들의 reference 들이 캐싱 될 수 있음
- Prevention of identity mutation
- Avoidance of temporal coupling between methods
- Support for referential transparency
- Protection from instatiating logically-invalid objects



## 자바에서 final 사용법 및 구현

1. 클래스에 final
   - 클래스 상속 제한
2. 필드에 private & final
   - 필드 변경 제한
3. 메소드에 final
   - 메소드 오버라이드 제한
   - 메소드 인자 final
     - 메소드 안에서 변수값 변경 불가
4. setter 사용 x
5. 다른 메소드에서 변경 x

> https://advenoh.tistory.com/13



## Immutable Objects 정의 전략 (오라클)

> https://docs.oracle.com/javase/tutorial/essential/concurrency/imstrat.html

1. 'setter' 메소드를 사용하지 마라
2. 필드를 private & final로 선언해라
3. 하위 클래스가 메소드를 오버라이드 하지 못하게 해라
   - class에 final을 붙여서 구현 가능
   - 생성자에 private  & 팩토리 메서드 사용
4. 인스턴스 필드가 mutable 객체에 reference 가진다면, 객체들이 변경되지 않도록 하라
   - mutable 객체를 변경시키는 메소드를 만들지 마라
   - mutable 객체에 대한 reference를 공유하지 마라.
     - reference를 외부에 저장하지 말고, 생성자에 객체로 넘겨줘라
     - 필요하다면 복사하고, 복사본에 reference를 저장해라.
     - 메소드에서 원본 리턴을 하지 말아야 할 때, 내부 mutable object의 복사본을 생성하라
