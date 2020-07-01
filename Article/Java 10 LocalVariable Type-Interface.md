# Java 10 LocalVariable Type-Interface

## 1. Overview

JDK10에서 가장 눈에 띄는 변화중 하나는 initializer를 가진 지역변수의 타입 추론 이다.



## 2. Introduction

자바9까지는 전역 변수의 타입을 우리가 명확하게 언급해야 했다. 그리고 알맞은 initializer를 사용해서 초기화를 해야 했다.

 ```java
String message = "Good bye, Java 9";
 ```

자바 10 에서는 아래의 방식과 같이 지역 변수를 선언할 수 있다.

```java
@Test
public void whenVarInitWithString_thenGetStringTypeVar(){
  var message = "Hello, Java 10";
  assertTrue(message instanceof String);
}
```

**우리는 *message*의 타입을 제공하지 않았다. 대신, *message*를 `var` 로 표시했다. 그리고 컴파일러는 오른쪽 항에서 나타내는 initializer의 타입으로부터 *message*의 타입을 추론했다.**

위에서 말한것 처럼, *message*의 타입은 *String* 이다.

**이러한 특징은 오직 initializer를 가진 지역 변수에서만 가능하다.** 멤버 변수, 메소드 파라미터, 리턴타입 등에서는 사용할 수 없다. 컴파일러에서 타입을 추론할 수 없기 때문에 initializer가 반드시 필요하다. 

이러한 기능은 boilerplate code를 줄이는데 도움이 된다. 예를 들면 아래의 코드를 다시 작성할 수 있다.

```java
Map<Integer, String> map = new HashMap<>();
```

아래와 같이 다시 작성 할 수 있다.

```java
var idToNameMap = new HashMap<Integer, String>();
```

또한 이러한 방식은 변수 타입보다는 변수에 이름에 집중 할 수 있도록 도와준다.

기억해야할 점은 ***var* 는 keyword가 아니라는 점이다.** 그렇기 때문에 변수 이름이나 함수로써 var를 사용하는 프로그램들에게 하위 호환성을 보장할 수 있다. *var*는 *int* 처럼 예약된 타입이름이다. 

마지막으로, *var*를 사용할때는 runtime 오버헤드가 없다는 것이다. 그리고 이점은 자바를 동적 타입 언어로 만들어 줄 수 없다. 변수의 타입은 아직까지 컴파일 시간에서 추론되고 나중에 변경될 수 없다.

## 3. *var*의 잘못된 사용

- 앞에서 언급한 것처럼, *var*는 initializer 없이는 사용할 수 없다.

  ```java
  var n; 
  ```

- null로 초기화 된다면 동작하지 않는다.

  ```java
  var emptyList = null; 
  ```

- 지역변수가 아닐때는 동작하지 않는다.

  ```java
  public var = "hello"; 
  ```

- 람다 표현식은 명확한 타겟 타입을 필요로 한다. 따라서 *var*를 사용 할 수 없다.

  ```java
  var p = (String s) -> s.length() > 10; 
  ```

- 배열도 initializer로 명확한 타겟 타입을 필요로 한다.

  ```java
  var arr = { 1, 2, 3 }
  ```

## 4. *var*를 사용한 가이드 라인









**Q. 예약어와 keyword의 차이는 무엇인가?**

A. 

> https://stackoverflow.com/questions/1078908/what-is-the-difference-between-keyword-and-reserved-word

**Q. 동적언어와 정적언어와 runtime 오버헤드의 관계는?**

A. 

> https://qastack.kr/programming/1517582/what-is-the-difference-between-statically-typed-and-dynamically-typed-languages







