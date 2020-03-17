# C++ vs Java 비교

> C++ 과 Java의 특징을 서로 비교하기 위한 글



## C++

- Compile 언어
  - 고급 명령어를 기계 명령어로 바꾸는 compile 작업이 필요함
- 명시적으로 메모리 관리 필요
  - 개발자가 항상 메모리 할당과 해제를 해주어야함
- Call by Reference, Call by Value 두가지 모두 지원
  - Call by Reference를 사용할 경우 C에서 Swap 함수를 구현할때 포인터를 이용해서 Swap
- C 언어와 호환 가능
- 저수준 시스템 접근 가능

- 포인터 사용
  - 메모리 주소 값으로 직접 조작 가능
  - 포인터에 대한 포인터 생성 가능
  - 함수나 메소드를 가리킬 수 있음
- 클래스의 다중 상속 지원

- 멀티스레드에 대한 일반적인 메모리 모델이 없으므로 라이브러리 이용해서 구현





## Java

- Interpreter 언어
  - 바이트 코드로 컴파일 됨
  - JVM (Java Virtual Machine)이 인터프리터가 되어 코드 해석방식을 실행함
  - 같은 바이트 코드로 여러가지의 CPU에서 실행이 가능함
- Java GC (Garbage Collector)에 의해 항상 자동으로 Garbage Collection 수행
  
- 시스템에서 자동으로 사용하지 않는 메모리를 해제하여 메모리 누수를 막아줌	
  
- Call by Value 만 지원

  - 항상 값에 의한 매개변수를 전달
  - 함수가 끝나면 값 존재하지 않음
  - Call by Value에 의해 함수에서 인자로 객체 값을 전달할때 reference도 전달함!
    - 그로인해 객체의 내용이 변경 가능!
  - 매개변수로 객체에 의한 참조값을 사용할 수는 있음
    - 참조 대상의 내용을 변경할 수는 있지만, 참조 값 자체를 변경할 수는 없음
      - 예를 들면 매개변수로 A라는 객체를 넣었다면, A의 내용을 변경 할 수는 있어도, A 말고 B로 변경한다거나 하는 일은 안됨
      - Swap 함수를 정의할때,  Call by Value 이므로 직접 값을 변경할 수는 없고, 객체로 보내서 객체 내부의 변수를 접근하는 방식으로 변경 가능하다.

  ```java
  package classTest;
  
  public class CallTest {
      public static void main(String[] args) {
          Person p = new Person("Griffin");
          // p.name : Griffin
          System.out.println("p.name : " + p.name);
  
          // java는 Call By Value 방식이기때문에 인자로 들어간 객체의 내용(name)이라는 값이 변경 가능
          CallByValue(p);
          // p.name : Choi
          System.out.println("p.name : " + p.name);
  
          // 하지만 인자로 들어간 객체에 새로운 객체를 넣는 것은 불가능!! Call By Value 이기 때문!!
          // p.name이 Young으로 변경되지 않음
          CallByReference(p);
          // p.name : Choi
          System.out.println("p.name : " + p.name);
      }
  
      // Call By Value를 구현하기 때문에 p라는 객체의 name을 변경
      public static void CallByValue(Person p){
          p.name = "Choi";
      }
      // Call By Reference를 구현하기 때문에 p라는 객체에 다른 객체를 넣어서 name을 변경
      public static void CallByReference(Person p){
          p = new Person("Young");
      }
  }
  
  class Person{
      String name;
      Person(String name){
          this.name = name;
      }
  }
  ```

  ```c++
  // Call By Reference일 경우 새로운 p에 새로운 객체를 넣어서 객체를 변경하는것이 가능함
  void callByReference(Person *p)
  {
      *p = Person("kevin");
  }
  ```

  

- 가상 머신 위에서 실행됨
- 포인터가 존재하지 않음
  - 객체에 대한 참조와 배열 참조가 있지만 메모리주소에 직접적인 참조는 불가능
  - 참조는 객체에 대한 접근 기능만 제공
- 한 클래스는 오직 하나의 클래스만 상속 가능
  
  - 하지만 복수의 인터페이스를 구현 가능
- 라이브러리를 이용해서 멀티스레드 구현





### 참고자료

- 비교자료

	> https://fromleaf.tistory.com/102

- Call by Value

  > http://wonwoo.ml/index.php/post/1679
  > https://re-build.tistory.com/3
  >
  > https://stackoverflow.com/questions/40480/is-java-pass-by-reference-or-pass-by-value