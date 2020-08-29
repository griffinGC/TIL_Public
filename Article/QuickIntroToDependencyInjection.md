# 의존성 주입 빠른 입문 : 의존성 주입이란?, 언제 사용해야 하는지?

## 소개

> 소프트웨어 엔지니어링에서, **의존성 주입(Dependency Injection)**은 한 객체(혹은 정적 메소드)가 다른 객체의 의존성을 지원하는 기술이다. 의존성은 서비스에서 사용되는 객체이다.

위에서 말한 것은 위키피디아에 있는 정의 이다. 그러나, 저 말은 쉽게 이해할 수 없다. 그러니 저것에 대해 더 알아보자.

프로그래밍에서 의존성 주입이 무엇인지 이해하기 전에, 먼저 그 개념에 대한 이해를 돕기 위해 일반적으로 그것이 무엇을 뜻하는지 봐보자.

`의존성(Dependency)` 혹은 `의존하는 (dependent)` 은 지원하기위해 어떤 것에 의존하는 것을 의미한다. 이것은 마치 우리가 휴대폰에 너무 많이 의존한다고 말한다면 그것은 우리가 휴대폰에 의존하고 있다는것보다 더 하다는 것을 의미한다.

**의존성 주입**에대해 알아보기 전에, 우선 프로그래밍에서 이것이 무엇을 뜻하는지 이해해보자.

클래스 A가 클래스 B의 몇가지 기능을 사용할때, 클래스A가 클래스B의 의존성을 가지고 있다고 말할 수 있다.

![DEPENDENCY](https://miro.medium.com/max/700/1*0P-1JhnUaZeobDUAajIbhA.jpeg)

자바에서, 다른 클래스들의 메소드를 사용하기 전에, 먼저 그 클래스의 객체를 생성해야 한다. (예를 들면, 클래스A는 클래스B의 인스턴스를 생성해야 한다.)



***즉, 객체를 생성하는 업무를 다른사람에게 전달하고 즉시 의존성을 사용하는 것을 의존성 주입이라고 부른다.***

![CARTOON](https://miro.medium.com/max/1000/1*TF-VdAgPfcD497kAW77Ukg.png)



## 왜 의존성 주입을 사용해야 하는가?

바퀴, 엔진 등 다양한 객체를 가진 car라는 클래스를 가지고 있다고 해보자.

```java
class Car {
  private Wheels wheel = new MRFWheels();
  private Battery battery = new ExcideBattery();
  ...
  ...
}
```

여기 있는 Car 클래스는 모든 의존성 객체들을 생성할 책임이 있다. 이제, 만약 우리가 나중에 WRFWheels를 버리고, Yokohama 바퀴를 사용하기를 원한다면 어떻게 해야 하는가?

너는 새로운 Yokohama 의존성을 가진 car 객체를 새로 생성해야 한다. 그러나 의존성 주입 (DI) 를 사용한다면, 우리는 런타임에 바퀴들을 바꿀 수 있다. (왜냐하면 의존성들은 컴파일 타임이 아니라 런타임에 주입되기 때문이다.)

너는 DI 를 원하는 바퀴 객체들을 만들고 그것을 Car 클래스로 전달하는 모든 역할을 하는 우리 코드의 중간자로 생각할 수 있다.

이것은 우리의 Car 클래스가 바퀴, 배터리 등의 객체를 만드는 것으로부터 독립적이게 만들어 준다.



### 의존성 주입에는 기본적으로 3가지 형태가 있다.

1. **constructor injection** : 의존성들은 클래스 생성자를 통해 제공된다.
2. **setter injection** : 클라이언트는 injector가 의존성을 주입하는데 사용하는 setter 메소드를 노출한다.
3. **interface injection** : 의존성은 클라이언트로 의존성을 주입하는 injector 메소드를 제공한다. 클라이언트는 의존성을 받아들이는 setter 메소드를 노출시키는 인터페이스를 구현해야 한다.

```java
class Car{
  private Wheels wheel;
  private Battery battery;
  
  // Constructor Based
  Car(Wheel wh, Battery bt) {
    this.wh = wh;
    this.bt = bt;
  }
  
  // Setter Based
  void setWheel(Wheel wh){
    this.wh = wh;
  }
  ...  
  ...
  // Rest of code  
}
```



### 의존성 주입은 아래와 같은 책임이 있다.

1. 객체 생성
2. 객체들을 필요로하는 클래스들을 알아야 한다.
3. 모든 객체들을 제공한다.

만약, 객체에 변화가 생긴다면, DI는 그것을 살펴보고, 변화는 그러한 객체들을 사용하는 클래스들과 관련있어서는 안된다. 이러한 방식은 나중에 객체가 변경되더라도, DI는 책임지고 클래스에 적절한 객체들을 제공해야 한다.



### 제어의 역전 - DI 뒤의 개념

이것은 클래스는 정적으로 클래스의 의존성을 설정하는 것이 아니라 외부의 다른 클래스들에 의해 설정되어야 한다는 것을 말한다.

**S.O.L.I.D** 의 5번째 원칙은 클래스는 구체적 구현체가 아닌 추상적 개념에 의존해야 한다는 것을 말한다.

원칙들에 따르면, 클래스는 클래스들의 책임을 이행하기 위해 필요로 하는 객체들을 생성하는 것이 아닌, 클래스의 책임을 이행하는데 집중해야 한다. 

그리고, **의존성 주입** 이 작용하는 곳이다. 의존성 주입은 필요한 객체들을 가진 클래스들을 제공한다.



### DI 의 장점

1. 단위 테스트를 도와준다.
2. injector 컴포넌트에 의해 의존성의 초기화가 완료되기 때문에 Boiler plate 코드가 줄어든다.
3. 어플리케이션을 확장하는 것이 쉬워진다.
4. 어플리케이션 프로그래밍에서 중요한 loose coupling이 가능하도록 도와준다.



### DI 의 단점

1. 배우기에 약간 복잡하다. 과도한 사용은 관리 이슈와 다른 문제들을 가져올 수 있다.
2. 많은 컴파일 타임 에러가 런타임으로 넘겨진다.
3. 의존성 주입 프레임워크는 reflection이나 동적 프로그래밍으로 구현된다. 이것은 'reference 검색', 'call hierarchy 보기' 그리고 안전한 리팩토링 같은 IDE 자동화 의 사용을 숨길 수 있다.



너는 순전히 너의 힘으로 혹은 서드파티라이브러리나 프레임워크를 이용하여 의존성 주입을 구현할 수 있다.



### DI 를 구현하는 라이브러리와 프레임워크

- [Spring ](https://www.tutorialspoint.com/spring/spring_dependency_injection.htm)(Java)
- [Google Guice](https://github.com/google/guice) (Java)
- [Dagger ](http://square.github.io/dagger/)(Java and Android)
- [Castle Windsor](https://github.com/castleproject/Windsor) (.NET)
- [Unity](https://www.microsoft.com/en-us/download/details.aspx?id=39944)(.NET)

의존성 주입에 관해 더 배우기 위해서는 아래의 리소스들을 확인할 수 있다.

[**Java Dependency Injection — DI Design Pattern Example Tutorial — JournalDev**](https://www.journaldev.com/2394/java-dependency-injection-design-pattern-example-tutorial)

[**Using dependency injection in Java — Introduction — Tutorial — Vogella**](http://www.vogella.com/tutorials/DependencyInjection/article.html)

[**Inversion of Control Containers and the Dependency Injection pattern — Martin Fowler**](https://www.martinfowler.com/articles/injection.html)

도움이 되었길 바란다!



### 수정 1

**만약, Javascript로 DI를 적용해 보고 싶고 라이브러리를 찾는 중이라면 ** [**Jo Surikat**](https://medium.com/u/a198b70e4f9?source=post_page-----7578c84fa88f----------------------) **의 라이브러리를 사용해봐라.**

[Di-Ninja](https://di-ninja.github.io/di-ninja/)

**자바스크립트로된  [Nicolas Froidure ***](https://medium.com/u/e411f450bae?source=post_page-----7578c84fa88f----------------------)의 DI 라이브러리도 있다.**

[knifecycle](https://github.com/nfroidure/knifecycle)



### 수정 2

**만약 너가 PHP 개발자라면 걱정하지 말아라. [Gordon Forsythe](https://medium.com/u/30eab9d5b943?source=post_page-----7578c84fa88f----------------------) 는 아래의 너가 시도해 보고 싶은 모든 것을 가진 멋진 라이브러리를 추천한다.**

[auryn](https://github.com/rdlowrey/auryn)

