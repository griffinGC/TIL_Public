# [번역] SOLID Principles — Simplified with Illustrations

> 원본
>
> https://levelup.gitconnected.com/solid-principles-simplified-with-illustrations-fe5265f68ec6
>
> 요약은 가장 아래에 있습니다.

#### S.O.L.I.D 원칙들의 중요성

## 소개

개발자로써 우리는 항상 legacy codebase들을 다룬다. legacy codebases의 대부분은 밀접하게 결합된 클래스들, 불필요한 코드들, 적은 테스트 coverage를 가지고 있다.이것은 코드를 빠르게 보게 하였을때 개발자들에게 코드베이스의 기능들을 이해하는것을 어렵게 만든다. 



오직 버그를 고치기위해 클래스에서 끝없는 코드를 통해 겼는 고통을 상상해봐라. 개발자들은 결국 적는것보다 더 많은 코드의 라인을 읽게 될 것이다. 나아가 한 흐름을 고치는 것은 다른것을 부수는 결과를 가져올 수 있다. 이것은 나에게 아래 유명한 밈을 떠오르게 했다.

![meme](https://miro.medium.com/max/1400/1*DCzEkGFZApLwZLmGuIDAOw.png)

 legacy software에서 적극적인 개발이 일어나지 않기 때문에, 개발자들과 매니저들을 딜레마에 빠지게 한다. 그 다음 팀은 전체 서비스를 다시 작성하는것과 옛날 것을 삭제하는 것에 대해 고려한다.

![no_bugs](https://miro.medium.com/max/1400/1*PQ2-pQabm1QglrUgqOXiPg.png)



## 왜 소프트웨어 설계 원칙인가?

오늘날의 발전하는 세계에서, 소비자의 요구사항들은 전래없는 속도로 변화를 이어나가고 있다. 소프트웨어 팀들에게 새로운 요구사항에 적응하는것과 빠르게 변화를 운반하는것은 필수가 되어가고 있다. 이것을 이루기 위해서는, 소프트웨어 개발과 테스트 시간을 줄이는것이 필수적이다.

동시에 새로운 기술들은 매년 소개되고 있다. 기존의 존재하는 기술들을 대체해서 더 최적의 효과적인 기술을 가진 실험을 하는 것은 흔하다. 따라서 작성된 코드가 어떤 변화를 소개하기 위해서는 유연해야 하고 덜 coupled(결합) 되어야만 한다.

잘 작성된 코드는 이해하기 쉽다. 새로운 개발자들은 코드의 부분을 수정하는 것보다 코드를 읽는데 많은 시간을 쓸 필요가 없다. 따라서 잘 유지된 소프트웨어는 개발자와 팀의 생산성을 높인다. 추가적으로 높은 테스트 coverage는 새로운 변경사항을 배포하기위한 신뢰성을 높인다.

S.O.L.I.D 는 Micheal Feathers에 의해 두문자어 이다. Robert Martin (Uncle Bob)에 의해 출판된 원칙들의 부분집합이다. 우리는 각각의 일러스트를 통해 5가지 원칙을 알아볼 것이다. 



## S - Single Responsibility Principle

> 단일 책임 원칙

가장 이해하기 쉬운 원칙중 하나이다. 'A class는 바꾸기 위한 오직 하나의 이유만을 가지고 있어햐 한다.' 라는것을 설명한다. 여러번 당신은 함수가 의도한것보다 여러 기능들을 수행하는 함수들을 발견한 적이 있을 것이다.

당신이 은행 소프트웨어에 대해 코드를 작성한다고 가정해보자. 기능은 주어진 유저에게 상태를 보여주는 것이다. 그 코드는 데이터베이스로부터 데이터를 가져온다. 그리고 유저가 선택한 포맷에 맞춰 데이터를 보여준다. 당신은 아래와 같은 코드를 짜게 될 것이다.

![뱅킹](https://miro.medium.com/max/1400/1*z4B2GPDeg5JPGR5pzJhc-A.png)

위의 코드에서 볼수 있듯이, ***'BankingStatementMgr'*** 는 한번에 여러 기능들을 수행한다. 이건 데이터 베이스로부터 데이터를 가져오고, 결과를 변환하고, 유저가 선택한 포맷에 맞춰 보여준다.

당신은 아래와 같은 문제점을 발견할 수 있다.

- 책임이 분리되어있지 않다. 이 클래스는 새로운 포맷이 추가되거나 데이터베이스에 새로운 컬럼이 추가되었을 경우 변경이 필요하다.
- 이 클래스는 데이터베이스 드라이버와 밀접하게 결합되어있다. DB드라이버나 SQL 쿼리에 어떤 변화가 있다면 클래스에 변화를 가져올 것이다.
- 트랜잭션의 포맷팅은 *BankingStatementMgr*에 의해 노출될 수 없기 때문에 독립적으로 테스트 될 수 없다.
- 코드는 여러 함수들이 서로 엮여있기 때문에 모듈화 할 수 없다.

위의 단점들은 아래의 접근들을 이용해 극복 할 수 있다.

- 트랜잭션들을 포맷하는 것을 책임지는 분리된 포맷터들을 정의해라 
- 데이터 접근 객체 혹은 DAO를 추가해라, DAO는 데이터베이스 드라이버를 은닉화 할 것이다. 그리고 모든 쿼리 헤비 리프팅을 수행한다.
- ***BankStatementMgr*** 은 데이터를 가져오기 위해 DAO에게 요청을 위임할 것이다. 그리고 깔끔하게 하기 위해 포매터에게 응답을 넘길 것이다.
- 이러한 방법으로, 우리는 DAO와 포매터를 독립적으로 테스트 할 수 있다. 그리고 느슨한 결합을 달성할수 있다. 따라서, 책임을 분리함으로써 코드 모듈러를 만들 수 있다.



수정된 코드는 아래와 같다.

![수정된코드](https://miro.medium.com/max/1400/1*mGHNqYlujjdYlC0l_E2m3g.png)

![statementformatter](https://miro.medium.com/max/1400/1*rM6WvUJhVaTFbsYgohI3Zw.png)

![transactionDAO](https://miro.medium.com/max/1400/1*4hrQ9oPFfOnbEoNIoY3dHg.png)

아직 개선사항이 많지만 다음 섹션에서 어떻게 우리가 이것을 리팩토링하고 더 낫게 만들지 볼 것이다.



## O - Open-Closed Principle

> 개방 폐쇄 원칙

이 원칙은 코드는 확장에 대해 열려 있어야 하고 수정에 대해 닫혀 있어야 한다는 것을 설명한다. 새로운 기능이 추가되어야 하는 경우에, 클래스는 확장 되어야만 한다. 게다가 시스템이 시스템의 행동을 확장시키도록 만들기 위해서는 분리되어야만 한다.

우리는 이 원칙을 예제를 통해 이해할 것이다. 당신이 다양한 모드를 통해 결제를 받는 eCommerce 구매자라고 가정하자. 당신은 Paypal, Wepay, Google Pay 등등 다양한 모드들을 통합했다. 그리고 결제 프로세스를 개발했다. 당신은 아래의 코드를 생각할 것이다.

![paymentprocessor](https://miro.medium.com/max/1400/1*K0mADKGNwWMQTL9cr1H8nQ.png)

![paymentHandler](https://miro.medium.com/max/1400/1*qz63vgbX5syK216XxfBa4w.png)

***PaymentHandler*** 는 결제 요청을 관리한다. ***PaymentProcessor*** 는 모드를 결정하고 올바른 액션으로 그것을 위임한다. 이 코드는 open-closed priciple을 위반하고 있다. 왜냐하면 어떤 기능은 *PaymentProcessor* 와 *PaymentHandler* 두기능 모두 변경을 요구할 수 있기 때문이다. 이 설계는 매번 각각 모든 새로운 결제 모드는 스위치 구문에서 새로운 케이스 블록을 가져올 것이기 때문에 확장성 있지 않다.

코드를 확장성 있게 만들기 위해서는, 우리는 추상 *PaymentHandler* 를 만들고 Payment를 다루기 위해 메소드를 정의 해야 한다. 새로운 결제 모드를 다루기 위해서, 우리는 이 기본 코드를 확장 시키고 이것의 handlePayment 메소드를 오버라이드 할 수 있다. 아래에 있는 것이 새로운 코드다.

![abstractPaymentHandler](https://miro.medium.com/max/1400/1*06hlzBZyy12m2pUVCMYibQ.png)

![googlePayHandler](https://miro.medium.com/max/1400/1*e2B0EjspTxJUDlyw5tqOqg.png)

![cardPaymentHandler](https://miro.medium.com/max/1400/1*hYDg7bS5f8u2I_-Iy_Xp2Q.png)

이제 우리는 구체적인 핸들러들을 저장하는것과 모드에 의존하면서 이것을 반환하는 책임을 가진 factory class를 만들 것이다.

![paymentHandlerFactory](https://miro.medium.com/max/1400/1*08unVCi61YMjnLFTRtUPwg.png)

![paymentProcessor](https://miro.medium.com/max/1400/1*XxXYboveAL3NMlIO2GyuYg.png)

우리의 새로운 코드는 이제 open-closed principle을 따른다. 새로운 행동을 추가하기 위해서, 우리는 단지 우리의 추상클래스인 *PaymentHandler* 를 확장시키고 factory에 같은 설정을 하면 된다. PaymentProcessor를 변경할 필요는 없다.



## L - Liskov Substitution Principle

> 리스코프 치환 원칙

처음 봤을때, 이름이 위협적이게 들린다. 이 원칙은 같은 superclass의 객체는 기존의 코드를 부수는것 없이 각각 서로를 대체할 수 있어야 한다는 것을 말한다.

우리는 영화에 대한 스크래퍼를 개발하는 예제를 볼 것이다. 이 스크래퍼는 영화 이름이나 배우에 의해 영화를 검색하기 위한 인터페이스를 제공한다.

![movieSearch](https://miro.medium.com/max/1400/1*7KSnIrsCPgLHJGaytBZSBQ.png)

![imdbSearch](https://miro.medium.com/max/1400/1*LiCJ6lSPT_7ot_9Ns895Yw.png)

![rottentomatoSearch](https://miro.medium.com/max/1400/1*-GfI3gpx8PRnlgDrvjFt8w.png)

![clientcodeusingtheMovieSearchInterface](https://miro.medium.com/max/1400/1*tsroqTpS6adtmluGw8cBPQ.png)

우리는 2개의 다른 구현체를 가지고 있다. 하나는 Rotten Tomato이고 다른 것은 IMDB이다. 두 개 모두 대체 가능하고 같은 인터페이스를 사용하는 것에 접근 할 수 있다.

만약 클래스로부터 나온 메소드가 구현되지 않았다면 원칙은 위반된다. 아래 예제는 Liskov principle의 위반 예제 이다.

![AllMovieSearch](https://miro.medium.com/max/1400/1*d0XFSx7vgWj7EflFHQ59pA.png)

이 경우에 우리는 All Movies 를 가진 IMDB나 Rotten Tomato 같은 다른 파생된 클래스들을 대체할 수 없다. *searchByMovieName* 클래스는 구현되지 않았다. 그리고 클라이언트 코드에서 변함없는 행동을 가져올 수 없다.



## I - Interface Segregation Principle

> 인터페이스 분리 원칙

원칙에 따르면 클아이언트는 필요없는 메소드를 구현하지 않는다고 여겨진다. 만약 당신이 클라이언트가 사용하지 않는 메소드를 정의한다면 인터페이스는 너무 커지고 오염되게 된다.

만약 인터페이스가 섞인 기능을 가지며 너무 크게 된다면, 인터페이스를 여러개의 작은 인터페이스로 나누는 것이 타당하다.  클라이언트가 주식, ETFs, 선물 등을 거래할 수 있는 Portfolio 서비스 예제를 살펴보자

![interface](https://miro.medium.com/max/1400/1*hWpJchGmcTGODDXzCisLlw.png)

우리는 클라이언트가 주식, ETFs, 두가지의 결합을 주문할 수 있는 ***Porfolio*** 인터페이스를 정의했다.

![ETForderService](https://miro.medium.com/max/1400/1*9SwRiXaTGVw-RR3sFDew-Q.png)

![StockorderService](https://miro.medium.com/max/1400/1*AhrPD32DH9N4_601SS0Z2w.png)

우리는 ***Portfolio*** 서비스의 2가지 다른 구현체를 만들었다. ***StockOrderService*** 는 *orderETF* 와 *orderStockAndETFs* 를 구현하지 않은 것으로 보인다. 마찬가지로 ***ETFOrderService*** 는 *orderETF* 만을 구현했다.

만약 우리가 주식을 주문하는 동안 파라미터로써 금액을 추가하는것을 결정한다면, 우리는 파라미터로써 금액을 받는 *orderStocks* 메소드를 구현해야 한다. 게다가 이러한 변경은 ***ETFOrderService*** 가 *orderStocks* 메소드를 지원하지 않더라도 포함되어야 한다.

이것을 극복하기 위해서 우리는 인터페이스를 2개로 나누어야 한다. a) StockPortfolio b) ETFPortfolio

![stockPortfolio](https://miro.medium.com/max/1400/1*eLF7eC5nx6U9v3GKWgYteg.png)

![ETFPortfolio](https://miro.medium.com/max/1400/1*UOkZn0ReeDXdb3AoYfLVoA.png)

새로운 인터페이스로 *StockOrderService* 는 ETFs를 주문하는것을 다루지 않는다. *ETFOrderService* 에도 같은 것이 적용 가능하다.

![etforderservice](https://miro.medium.com/max/1400/1*thSJDyjrtxJk13tly7gEzA.png)

![stockorderservice](https://miro.medium.com/max/1400/1*m8as1nQtsz6gATJoXmqGdw.png)

인터페이스 분리는 Single Responsibility와 Liskov Substitution Principle과 여러 유사점을 공유한다.

위의 부피가 큰 인터페이스 예제에서 우리는 StockOrderService에서 예외를 던졌다. 이것은 Liskov Substitution Principle 위반이다. 이 경우에 파생된 클래스는 기능을 확장하지 않는다.

만약 관계없는 메소드들이 인터페이스에서 정의 된다면, 클래스들은 변경하기 위한 여러가지 이유들을 가질 것이다. 이것은 Single Responsibility Principle을 위반한다.

 

## D- Dependency Inversion Principle

> 의존관계 역전 원칙

Dependency Inversion에 따르면, 프로그램에서 높은 레벨의 모듈들은 낮은 레벨의 모듈과 밀접하게 결합되어서는 안된다. 모듈들 모두 추상화에 의존해야 한다. 이 원칙은 느슨하게 결합된 소프트웨어 모듈들을 만들기 위한 메커니즘을 제공한다.

아래 예제들을 한번 살펴 보자. 이 예제에서 *OrderHistory* 클래스는 PostgreSQL 데이터 저장소로부터 데이터를 가져온다.

![orderHistory](https://miro.medium.com/max/1400/1*3DLLxmldatpcBT5cNMFEGA.png)

***OrderHistory*** 클래스는 PostgresDB 의존성의 구현 세부사항을 알아야만 한다. 만약 우리가 다른 데이터베이스 드라이버를 사용하기로 결정했다면, 우리는 새로운 의존성을 가지고 ***PostgresDB*** 의 모든 인스턴스를 대체할 수 있어야 한다.

게다가, DB 드라이버 변경의 한 기능은 무엇인가? DB 드라이버의 메소드를 부르는 ***OrderHistory*** 클래스에서 변경할 필요가 있을 것이다.

이 결합은 ***DataStore*** 인터페이스를 선언하는 것에 의해서 사라질 수 있다. 이 인터페이스는 consumer를 호출하는 API들을 노출시킬 것이다. 우리는 ***DataStore*** 의 여러 구현을 가질 수 있다. a) Postgres DataStore b) MySQL DataStore c) S3, etc

![DataStore](https://miro.medium.com/max/1400/1*7j9r-WrHfCp0fLfNgKroxQ.png)

![PostgresDataStore](https://miro.medium.com/max/1400/1*8vW-JwwgPmzg5b3ugXbqeA.png)

![orderHistory](https://miro.medium.com/max/1400/1*v73kFdpAzVHH34bj5i0pEw.png)

이제 우리의 consumer 클래스는 데이터 저장소가 사용되는 곳의 low level 세부사항을 다룰 필요가 없다. high-level 모듈 ***OrderHistory*** 는 데이터에 접근하기 위해 DataStore 인터페이스에 의존해야 한다. lower level **DataStore** 에서의 변화는 ***OrderHistory*** 에 어떠한 영향도 주지 않는다.

나아가, 모듈들이 느슨하게 결합되어있기 때문에, 그것들은 독립적으로 테스트 될 수 있다. 새로운 구현은 Dependency Injection(의존성 주입)을 이용해 High-level 모듈에 쉽게 삽입 될 수 있다.



## 결론

위의 5가지 원칙은 소프트웨어 엔지니어링에서 따르는 최상의 모범사례를 위한 초석을 구성한다. 매일 작업에서 위의 원칙들을 연습하는 것은 소프트웨어의 가독성, 모듈성, 확장성, 테스트능력을 향상시키는 것을 도와준다.

결국, 이것은 이해하기 쉽고 잘 관리되는 소프트웨어를 짓는데 도움을 준다. 위의 원칙들을 따르는 것은 개발자 생산성과 엔지니어링 팀의 agility를 향상시키는것을 도와준다.



## 참고자료

- [Solid Principles in Android](https://proandroiddev.com/exploring-s-o-l-i-d-principle-in-android-a90947f57cf0)
- [Solid Principles Simplified](https://itnext.io/solid-principles-explanation-and-examples-715b975dcad4)
- [Liskov Substitution Principle](https://dev.to/erikwhiting88/liskov-substitution-principle-in-3-minutes-2dc6)
- [Become a better developer by applying SOLID principles](https://www.youtube.com/watch?v=rtmFCcjEgEw)
- [SOLID principles in five minutes](https://medium.com/swlh/s-o-l-i-d-principles-explained-in-five-minutes-8d36b1da4f6b)
- [Cover photo](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F393220611216597358%2F&psig=AOvVaw1wiqQHCovfFQCcWfgVQYc1&ust=1591728875201000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNiTpO7z8ukCFQAAAAAdAAAAABAF)



## 요약

- 잘못 설계된 legacy 코드를 수정하는 것은 어렵다.

- 처음에 설계할때 잘 설계하는 것이 중요하다. 이를 위해 5가지 원칙이 존재한다.

- 5가지 원칙

  - Single Responsibility Principle

    - 한번에 한가지 책임

  - Open Closed Principle

    - 확장에 열려있고 수정에 닫혀있어야 함
    - 새로운 기능이 추가될 경우 클래스는 **확장** 되어야 함
    - 시스템의 행동을 확장시키도록 만들기 위해서는 **분리** 되어야 함
    - Switch 문을 하나의 인터페이스 혹은 추상 클래스와 그것을 구현 혹은 상속받는 여러개의 클래스를 이용하여 구현
      - 이를 이용하여 새로운 조건에 대해 클래스를 생성하고 기존의 클래스는 수정안해도 됨

  - Liskov Substitution Principle

    > https://vandbt.tistory.com/41

    - 같은 클래스를 상속받는 객체는 기존의 코드에 영향을 주지 않고 서로를 대체할 수 있어야 함

  - Interface Segregation Principle

    - 사용하지 않는 메소드는 인터페이스 내에 정의하지 않도록 함
    - 인터페이스가 너무 클 경우 여러개의 작은 인터페이스로 나누는 방식 추천

  - Dependency Inversion Principle

    - low-level module과 high-level module이 밀접하게 결합되지 않도록 해야 함
    - low-level module이 변경 되어도 high-level module이 영향을 받지 않도록 low-level에 대한 인터페이스를 정의해주는것도 하나의 방식이 될 수 있음
    - 느슨하게 결합 되어 있으면 독립적으로 테스트 가능

























