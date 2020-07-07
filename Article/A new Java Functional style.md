# [번역] A new Java functional style

> 원본
>
> https://medium.com/swlh/a-new-java-functional-style-f522dad40d32

JDK8이 출시되고 꽤 시간이 지났다. JDK8은 많은 새로운 특징들을 Java로 가지고 왔는데 그것들 중에 가장 눈에 띄는 특징은 의심의 여지 없이 Lambda 표현식의 소개 이다.

Lambda의 출시는 자바 언어의 역사에서 가장 큰 질적 향상 중 하나이다. 언어로 넓고 새로운 가능성의 범위를 열었기 때문이다. 이것이 없었다면 요즈음 우리가 즐기는 더 유연하거나, 표현적이고 간단한 언어는 불가능 했을 것이다.

그러나 최근 몇년 동안 이것이 가능했음에도 불구하고, 나는 아직까지 많은 개발자들이 이것을 어려워하는 것을 많이 보았다. 이것이 내가 Lambda와 개발자로써 매일 Lambda를 사용할때의 이점들에대해 철저히 설명을 하는 이유이다.

## 소개

### functional programming 이란 무엇인가?

Functional Programming은 lambda 계산에 기초를 둔 프로그래밍 패러다임이다. 이것은 일반적으로 잘 알려진 명령형(imperative) 패러다임 대신에 선언적인(declarative) 접근을 사용한다.

이것이 의미하는 것은 **어떻게 이것이 되어야 하는지 그리고 어떤 순서로 해야하는지 정의하는게 아니라 우리가 무엇을 해야하는지 정의한다는 것이다.**

우리는 어플리케이션이 실행하려고 의도하는 것을 선언하기 위해 함수를 사용한다.

![intend](https://miro.medium.com/max/700/0*jirB0FYSnp01oq50)

함수를 이용하여 명령형(imperative) 프로그래밍 접근과 선언형(declarative) 프로그래밍 접근이 무엇인지 여러 예제를 통해 알아보자

배열의 원소중에 주어진 숫자보다 더 큰 원소를 리턴하는 "**greaterThan**" 기능을 구현할 것이다. 먼저 imperative 접근에서는 어떻게 나타나는지 보자

![greaterThanImperative](https://miro.medium.com/max/567/0*yyMe9xqI-vpActMo)

이 메소드에서 우리는 스텝들을 구체화 시킨다. 무엇이 실행되고 어떤 순서로 실행되는지 구체화시키면서 이것들이 "**thresshold**" 보다 큰 숫자들을 가져오기 위해서 수행되도록 한다. 

만약 우리의 배열에서 10보다 큰 숫자들을 얻기 위해 이 함수를 사용했다면,

![imperative](https://miro.medium.com/max/518/0*47fo3BTNWwYogVlP)

결과는 아마도 **[23, 13, 26, 90]** 일 것이다.

우리의 imperative 구현에서는 틀린게 없다. 단지 너무 장황하고 어떤 연산에 대해서 많은 코드를 복사 해야 할 수 있다. 그래서 이제 자바에서 functional 접근을 이용하면 무엇이 다른지 한번 보자

![functional](https://miro.medium.com/max/394/0*J5ZskbidqBPWpfIy)

이 예제에서 우리는 배열에서 원소들을 처리하기위해서 Java [Stream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)을 사용했다. 이후 우리는 스트림에게 어떻게 원소들을 필더링하는지 알려주기 위해서 [Predicate](https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html) 을 사용했다. 

**Predicate** 는 기본적으로 함수이다. 인자를 받고 predicate에서 구체적인 기준을 기반으로 boolean 값을 리턴하는 함수이다.

이게 JDK8이후 자바의  [java.util.function](https://docs.oracle.com/javase/8/docs/api/java/util/function/package-summary.html) 패키지에서 가능한 많은 함수들중 하나이다.

결과는 마찬가지로 **[23,13,26,90]** 이지만, 이것을 얻는 방식은 다르다.



그럼 이 접근에서 무엇이 다른가?

- 우리는 무엇을 해야할지는 구체화 시켰지만, 어떻게 해야할지는 하지 않았다.
- 덜 장황하다
- 코드의 중복을 제거했다.
- 내재적으로 불변하다.
  - 동시 연산에서 매우 중요하다.
- 람다를 사용해서 상태를 변경하는게 불가능하다
  - 역시 동시 연산에서 매우 중요하다. 이것에 대해서는 "[A new concurrency model in Java](https://medium.com/dev-genius/a-new-concurrency-model-in-java-975d597dd5e4)" 에서 설명했다.
- 더 이상 인자로써 **passed by reference로 객체들을 변경하는것이 불가능**하다.
- 느긋한 계산법 (**Lazy evaluation**)
  - 계산의 결과값이 필요할 때까지 계산을 늦추는 기법
  - 지연 계산법과 최소 계산법이 존재
  - 우리는 무엇을 해야할지 선언할 수 있다. 하지만 우리의 함수에서 코드는 스트림이 materialised 되거나 함수가 불려질때까지 계산 될 수 없다.



## Functions 

첫번째로, functional 프로그래밍에대해 이해하기 위해서 중요한 함수들에 관한 몇몇 개념들이있다.

- **Pure functions**
  - pure function은 정해진 입력값에 대해 언제나 같은 결과값을 리턴하는 것이다. 또한 어떠한 side effects도 없다.
- **Impure functions **
  - 반대로 impure function은 주어진 입력값데 대해 언제나 같은 출력값을 가지지 않는다. 그리고 side effects를 가질 수도 있다.
- **Higher-order functions**
  - higher-order function은 기본적으로 한개 혹은 더 많은 함수들을 인자로써 받아들이고 함수를 리턴할 수도 있는 함수이다.



**impure function** 의 예제는 아래와 같다.

![impure function](https://miro.medium.com/max/583/0*l42ud1RxnjddZBDu)

이 함수가 **impure** 이다. 왜냐하면 이것은 외부의 변수에 의존하고있다. 그러므로 결과 값은 언제나 주어진 입력값에 대해 같지 않을 수 있다. 예를 들어, 만약 외부 변수의 값이 8로 변경 된다면 결과 값은 아마 18이 아니라 16이 될것이다. 우리는 함수의 입력값을 바꾸지 않았지만 다른 결과를 얻었다. 



그럼 **pure function** 은 무엇인가? 우리는 같은 함수를 pure하게 만들 것이다. 그 결과는 아래와 같다.

![convertPure](https://miro.medium.com/max/700/0*KTq8vFRUbNgVWOye)

이 함수는 인자를 한개 더 받는다. 그리고 외부 변수에 의존하지 않는다. 그러므로 **함수의 결과는 항상 주어진 입력에 대해 같다!** 우리의 예제에서 입력값은 (9,2)이다. 입력값이 같다면 우리는 결과값은 언제나 18이라는 것을 보장할 수 있다. side-effects 없이, 정확하게 pure function이다.

그래서 **pure functions** 에서 진짜로 중요한 것은 무엇일까? 우리가 **non-sharing state and immutability(불변)** 에 대해서 얘기하고 있다는 것을 기억해라. Pure function은 그것에 대해 기본적으로 지원한다!

이것을 쉽게 시각화하기 위해서는, **우리는 pure functions을 pipes로 생각해야 한다.** 완벽하게 고립되고 안전한 방법으로 우리의 데이터가 이동하는 Pipes는 **어떤 thread도 파이프를 건드릴 수 없다.**

이는 concurrent program을 더 안전하고 더 간단한 방식으로 작성하는데 있어서 매우 중요한 개념이다.

어떻게 자바가 이러한 개념들을 통합하고 JDK8이후로 우리에게 무엇을 가져왔는지에 대해 얘기해 보자



## 자바에서 Functional programming

### Main interfaces

자바에는 functional code를 작성하기 위해서 알아야 하는 3가지 메인 인터페이스가 있다.

- Supplier
  - Supplier는 인자를 가지지 않고 값을 리턴하는 함수이다.
- Consumer
  - Consumer는 인자를 가지고 있으나 값을 리턴하지 않는 함수이다.
- Function
  - Java Function은 값을 가지고 값을 리턴하는 함수이다.

3가지 개념에 대한 다양한 변형들이 있다. 그러나 이러한 3가지 인터페이스를 안다면 거의 모든것을 이해할 수 있고 할 수 있을 것이다.

**[java.util.function](https://docs.oracle.com/javase/8/docs/api/java/util/function/package-summary.html)** 패키지에서 가능한 인터페이스를 가진 리스트를 찾을 수 있다.

이제 이러한 인터페이스들이 자바에서 어떻게 사용되는지 보자

### Lambda 표현식과 anonymous classes (익명 클래스)

우리는 람다 표현식을 이용하여 이러한 인터페이스를 표현할 수 있다. 람다 표현식은 클래스의 부분으로써 존재할 필요 없이 함수를 정의 하는데 사용할 수 있다. 함수 그 자체는 객체로써 취급 될 수 있다. 그리고 함수는 인자로써 저장되고 넘겨질 수 있다.

람다 표현식들은 기본적으로 다음과 같은 구조를 따른다.

```java
(argument1, argument2) -> expression
```

예제들로 넘어가기 전에, anonymous classes에 대해서 얘기해야 한다. **anonymous class** 는 기본적으로 인터페이스의 구현을 선언할 필요 없이 주어진 인터페이스의 인스턴스를 만들기 위한 방식이다. 그러므로 우리는 정의를 inlining하고 이름없이 할당하는 클래스의 인스턴스화를 한다.

우리는 익명 객체나 람다 표현식을 사용하여 Supplier 예제를 인스턴스화 할 수 있다. 익명객체를 사용하면 어떻게 보이는지 한번 보자

![supplier](https://miro.medium.com/max/442/0*qTisnaSNT-4TorC4)

이건 가능하지만, **꽤 장황하다.** 람다 표현식은 우리를 도와줄 수 있다. 우리가 람다 표현식을 이용하여 어떻게 정확하게 같은 것을 만들 수 있는지 한번 보자

![supplier](https://miro.medium.com/max/399/0*fjXkt67EaZ0J5w_Q)

보시다시피, 람다 표현식을 사용하면 우리는 boilerplate 코드를 줄이고 **함수를 좀 더 간결한 방식으로 표현할 수 있다.**

어떻게 람다를 이용해서 모든 인터페이스를 표현하는지 알아보자

![all_interface](https://miro.medium.com/max/700/0*oQjYStclfSHgZTs2)

마지막 줄을 본다면, "**::**"연산자의 사용을 발견할 수 있다. 이것은 자바에서 [method reference](https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html)를 넘겨주는 방식이다. **이 함수가 하는 것은 다른 메소드를 부를때 우리는 method reference를 함수에 할당할수 있다.**



### Functional interfaces

이미 존재하는 인터페이스와는 별도로, **자바에서 어떤 싱글 메소드 인터페이스는 functional interface로 여겨질 수 있다.** 우리는 그것들을 [@FunctionalInterface](https://docs.oracle.com/javase/8/docs/api/java/lang/FunctionalInterface.html) 어노테이션으로 표시할 수 있다. **이 어노테이션이 유익할 지라도**, 이것은 우리의 인터페이스에 어떠한 영향도 미치지 못한다.

같은 인자의 수와 같은 리턴을 가진다면 자바 컴파일러는 functional interface의 타입을 추론할수 있다. 

그러므로, 우리는 우리의 인터페이스를 만들 수 있고 기존에 존재하는 자바 메소드에 그것들을 적용할 수 있다.

우리는 우리의 "greater than ten" 예제를 새로운 인터페이스를 사용하여 변경할 것이다.

이게 새로 만든 "**GreaterThan**" 인터페이스다.

![greaterThan](https://miro.medium.com/max/226/0*pHz64unuM1irwMyd)

 이 함수는 **int**를 인자로 받고 **boolean** 을 리턴하기 때문에, 우리는 predicate을 대신할 수 있고 자바 컴파일러는 타입을 추론할 것이다.

우리는 우리의 이전코드를 "**elementsGreaterThan**" 메소드로 추출 할 수 있다. 이건 **GreaterThan** 인터페이스를 받을 수 있다.

![interface](https://miro.medium.com/max/604/0*w_r5N6k2EccMLSCI)

stream에서 **filter** 메소드는 **Predicate** 를 가리킨다. 그러나 **같은 인자와 리턴 타입을 가지기 때문에**, 컴파일러는 문제 없이 타입을 추론한다.

그 다음 우리는 이 메소드를 우리가 원하는 함수로 넘겨줄 것이다. 그리고 결과는 완벽하게 동일할 것이다.

![](https://miro.medium.com/max/580/0*fu9LygpDm6FZaJfs)

나는 이런 간단한 예제가 너가 자바에서 functional interface가 무엇인지 명확하게 하는지 도움이 되길 바란다.

JDK8의 매우 중요한 부분인 Java Streams에 대해 살펴보자

### Java Streams

JDK8에서 소개된 주요 특징중 하나는 Java [Stream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html) 인터페이스이다. 이것은 우리가 **원소의 순서를 수행하기위한 연산들의 파이프라인**을 정의할 수 있도록 해준다.

Java streams의 가장 중요한 측면중 하나는 **이것이 Lazily evaluated**라는 것이다. 이것은 **우리의 연산이 우리가 terminal operation을 수행할때까지 실행되지 않는다는 것이다.**  [terminal operation](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html#StreamOps)은 결과를 얻기위해 의도된 어떤 연산이다. (forEach, collect, sum 등..)

다른 기억해야할 것은 **stream은 오직 한번만 사용될 수 있다는 것** 이다. 만약 우리가 연산의 같은 파이프 라인을 다시 적용하려한다면, 우리는 stream을 다시 생성해야 한다.

![](https://miro.medium.com/max/700/0*i8b1pDZxC_aWYFm5)

우리는 각 **String** 원소들을 **Integer** 로 변경하는 stream을 정의 했다. 이때 우리는 실행되어야하는 스텝들을 정의했다. 그러나 그것들은 termainal operaion을 부를때까지 수행되지 않을 것이다.

이제 우리의 stream을 이용해서 제공받은 모든 결과 Integer 원소들을 더하는 것을 해보자

![](https://miro.medium.com/max/700/0*6dt3K6QjmK3T6xHG)

**스트림은 우리가 terminal operaion인 sum을 부를 때까지, 배열에서 원소들을 수행하는 것을 시작하지 않을 것이다.**



보시다시피, 자바 스트림은 우리가 declarative 패러다임에 따라서 우리의 데이터를 처리하기 위해 필요한 스텝들을 선언하는 것을 가능하도록 해준다. **이 결과는 operations의 파이프 라인을 정의하는 간결하고, 표현적이고(expressive) 우아한 방식이다.**

이것이 없었다면 너의 코드는 더 장황하고 반복적이고 읽기 어려울 것이다. Java streams는 우리가 쉽게 원소들의 순서에 적용할 수 있는 스텝들을 작성할 수 있게 해준다. 



### 가장 인기있는 Java stream 메소드들

- filter
  - Predicate을 구체화함으로써 collection을 filter 할 수 있다. 우리는 predicate을 수행하는 원소들을 포함하는 collections을 받을 것이다.
- map
  - 우리가 필요한 다른 형식으로 우리의 collection의 모든 원소들은 변경하는데 map을 쓸 수 있다.
- flatMap
  - flatMap은 우리가 collections의 스트림을 가지고 있고 우리가 그것들을 하나의 collection으로 합치는 경우에 사용 될 수 있다.
- reduce
  - 이것은 이해하기 어려울 수 있다. 그러나 가장 강력하고 유연한 방법중 하나이다. 이것은 모든 원소들을 하나의 원소로 합치는데 사용될 수 있다.



## 추가적으로 지원된 기능

### CompletableFuture

CompletableFuture에 관해서는 최근 2개의 포스트에서 다뤘다. ("[A new concurrency model in java](https://medium.com/dev-genius/a-new-concurrency-model-in-java-975d597dd5e4)” and “ [Combining multiple API calls with CompletableFuture](https://medium.com/swlh/combining-multiple-api-calls-with-completablefuture-1d9d27e03bec)”) 이것은 함수들을 광범위하게 사용한다. 이것들 없이 **callback들과 chain completable futures를  간결하고 유창한 방식으로 정의하는 것은 불가능하다.** 이게 자바에서 함수들이 더 중요해 지는 이유이다.



### Optional

Java Optional에 대해서는 “ [Please stop the Java Optional mess!](https://medium.com/dev-genius/please-stop-the-java-optional-mess-2889dc4f5f27) "에서 얘기해 보았다. 그리고 이것은 함수들은 광범위하게 optional의 상태에 의존하는 정확하고 다양한 행동들을 정의하는데 사용한다.

![](https://miro.medium.com/max/603/0*UOam2SdXn8E_zQqG)

함수들은 우리가 if 조건문을 가지고 상태를 확인하고 몇줄에 걸쳐 작성하는 것을 한줄로 정의하는 것을 가능하게 해준다.



### Collection.forEach 와 다른 collection 향상

이제 우리는 forEach를 이용하여 손쉽게 operation을 각각의 원소에 적용할 수 있다.

```java
collection.forEach(element -> System.out.println(element));
```

함수를 이용하는 다른 메소드는 [**Iterator.forEachRemaining**](https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html#forEachRemaining-java.util.function.Consumer-) 혹은 [**Collection.removeIf**](https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html#removeIf-java.util.function.Predicate-) 를 쓸 수 있다.

저기에는 최근에 함수가 어떻게 자바를 발전시켜왔는지에 대한 예제가 많이 있다. 자바에서 이것들이 얼마나 중요한지 이해하기 위해 스스로 그것들을 찾고 경험할 수 있을 것이다.



## 결론

지난 수십년간 함수와 스트림의 도입은 자바에서 큰 발전을 가져왔다.

**자바는 우리의 시대에 적응하며 현대 언어를 따라잡고 되어야 할 필요가 있었다.** 자바 스크립트의 ES6 같은 언어에서 사용되는 expressveness의 레벨과 비교하여 자바는 뒤쳐져 있다. 개발자의 새로운 요구에 적응하고 발전하지 않는다면 2번째 언어로 강등될 위험에 처해진다.

모두에게 더 나은 언어로 되면서, 천천히 우리의 손을 묶는 불필요한 것들을 삭제하면서, 우리의 생상성에 큰 영향을 끼치면서 자바는 지금 올바른 길로 가고있다고 생각한다.

확실히 함수의 도입은 자바에서 [fluent interfaces](https://en.wikipedia.org/wiki/Fluent_interface#:~:text=In software engineering%2C a fluent,Eric Evans and Martin Fowler.) 설계의 새로운 방식을 열었다. fluent interface는 우리가 영어 같이 공통된 언어에서 생각하는 방식과 같이 코드를 유창하게 작성하는 것을 가능하게 해준다. 이것은 우리의 생산성과 코드의 가독성에 중요한 향상을 가져왔다.



## 요약

- 함수와 스트림의 도입은 자바에 큰 영향을 끼쳤다.
- Lambda를 이용하면 좀 더 간결하고 쉽게 코드를 작성할 수 있다.
  - 간결한 코드
  - 중복을 제거
  - 내재적으로 불변
    - 동시 연산에서 매우 중요
  - 상태 변경 불가능
  - 객체들을 변경하는것이 불가능
  - 느긋한 계산법 (**Lazy evaluation**)
- Stream을 이용하면 코드의 가독성이 올라갈 수 있다.
