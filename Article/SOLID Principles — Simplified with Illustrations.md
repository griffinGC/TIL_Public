# [번역] SOLID Principles — Simplified with Illustrations

#### S.O.L.I.D 원칙들의 중요성

## 소개

개발자로써 우리는 항상 legacy codebase들을 다룬다. legacy codebases의 대부분은 매우 coupled된 클래스들, 불필요한 코드들, 적은 테스트 coverage를 가지고 있다.이것은 코드를 빠르게 보게 하였을때 개발자들에게 코드베이스의 기능들을 이해하는것을 어렵게 만든다. 



오직 버그를 고치기위해 클래스에서 끝없는 코드를 통해 겼는 고통을 상상해봐라. 개발자들은 결국 적는것보다 코드의 라인을 읽게 될 것이다. 나아가 한 흐름을 고치는 것은 다른것을 부수는 결과를 가져올 수 있다. 이것은 나에게 아래 유명한 밈을 떠오르게 했다.

![meme](https://miro.medium.com/max/1400/1*DCzEkGFZApLwZLmGuIDAOw.png)

 legacy software에서 적극적인 개발이 일어나지 않기 때문에, 개발자들과 매니저들은 딜레마에 빠진다. 그 다음 팀은 전체 서비스를 다시 작성하는것과 옛날 것을 삭제하는 것을 심사숙고한다.

![no_bugs](https://miro.medium.com/max/1400/1*PQ2-pQabm1QglrUgqOXiPg.png)



## 왜 소프트웨어 디자인 원칙인가?

발전한 오늘날의 세계에서, 소비자의 요구사항들은 은 전래없는 속도로 변화를 이어나가고 있다. 이것은 소프트웨어 팀들에게 새로운 요구사항에 적응하는것과 빠르게 변화를 운반하는것은 필수가 되어가고 있다. 이것을 이루기 위해서는, 소프트웨어 개발과 테스트 시간을 줄이는것이 필수적이다.

동시에 새로운 기술들은 매년 소개되고 있다. 이것은 기존의 존재하는 기술들을 교체해서 더 최적의 효과적인 기술을 가진 실험을 하는 것은 흔하다. 따라서 작성된 코드가 어떤 변화를 소개하기 위해서는 유연해야 하고 덜 coupled(결합) 되어야만 한다.

잘 작성된 코드는 이해하기 쉽다. 새로운 개발자들은 코드의 부분을 수정하는 것보다 코드를 읽는데 많은 시간을 쓸 필요가 없다. 따라서 잘 유지된 소프트웨어는 개발자와 팀의 생산성을 높인다. 추가적으로 높은 테스트 coverage는 새로운 변경사항을 배포하기위한 신뢰성을 높인다.

S.O.L.I.D 는 Micheal Feathers에 의해 두문자어 이다. Robert Martin (Uncle Bob)에 의해 출판된 원칙의 부분집함이다. 우리는 각각의 일러스트를 통해 5가지 원칙을 알아볼 것이다. 



## S - Single Responsibility Principle

> 단일 책임 원칙

가장 이해하기 쉬운 원칙중 하나이다. 'A class는 바꾸기 위한 오직 하나의 이유만을 가지고 있다' 라는것을 설명한다. 여러번 당신은 함수가 의도한것보다 여리 기능들을 수행하는 함수들을 발견한 적이 있을 것이다.

당신이 은행 소프트웨어에 대해 코드를 작성한다고 가정해보자. 기능은 주어진 유저에게 상태를 보여주는 것이다. 그 코드는 데이터베이스로부터 보드를 가져온다. 그리고 유저간 선택한 포맷에 맞춰 데이터를 보여준다. 당신은 아래와 같은 코드를 짜게 될 것이다.

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
- ***BankStatementMgr*** 은 데이터를 가져오기 위해 DAO에게 요청을 위임한다.
- 이러한 방법으로, 우리는 DAO와 포매터를 독립적으로 테스트 할 수 있다. 그리고 약한 결합을 달성할수 있다. 따라서, 책임을 분리함으로써 코드 모듈러를 만들 수 있다.



수정된 코드는 아래와 같다.

![수정된코드](https://miro.medium.com/max/1400/1*mGHNqYlujjdYlC0l_E2m3g.png)

![statementformatter](https://miro.medium.com/max/1400/1*rM6WvUJhVaTFbsYgohI3Zw.png)

![transactionDAO](https://miro.medium.com/max/1400/1*4hrQ9oPFfOnbEoNIoY3dHg.png)

아직 개선사항이 많지만 다음 섹션에서 어떻게 우리가 이것을 리팩토링하고 더 낫게 만들지 볼 것이다.



## O - Open-Closed principle

> 개방 폐쇄 원칙

이 원칙은 코드는 확장에 대해 열려 있어야 하고 수정에 대해 닫혀 있어야 한다는 것을 설명한다. 새로운 기능이 추가되어야 하는 경우에, 클래스는 확장 되어야만 한다. 게다가 시스템이 시스템의 행동을 확장시키도록 만들기 위해서는 분리되어야만 한다.

우리는 이 원칙을 예제를 통해 이해할 것이다. 당신이 다양한 모드를 통해 결제를 받는 eCommerce 구매자라고 가정하자. 당신은 Paypal, Wepay, Google Pay 등등 다양한 모드들을 통합했다. 그리고 결제 프로세스를 개발했다. 당신은 아래의 코드를 생각할 것이다.

![paymentprocessor](https://miro.medium.com/max/1400/1*K0mADKGNwWMQTL9cr1H8nQ.png)

![paymentHandler](https://miro.medium.com/max/1400/1*qz63vgbX5syK216XxfBa4w.png)

***PaymentHandler*** 는 결제 요청을 관리한다. ***PaymentProcessor*** 는 모드를 결정하고 올바른 액션으로 그것을 위임한다. 이 코드는 open-closed priciple을 위반하고 있다. 왜냐하면 어떤 기능은 *PaymentProcessor* 와 *PaymentHandler* 두기능 모두 변경을 요구할 수 있기 때문이다. 이 설계는 매번 각각 모든 새로운 결제 모드는 스위치 구문에서 새로운 케이스 블록을 가져올 것이기 때문에 확장성 있지 않다.

코드를 확장성 있게 만들기 위해서는, 우리는 추상*PaymentHandler* 를 만들고 Payment를 다루기 위해 메소드를 정의 해야 한다. 새로운 결제 모드를 다루기 위해서, 우리는 이 기본 코드를 확장 시키고 이것의 handlePayment 메소드를 오버라이드 할 수 있다. 아래에 있는 것이 새로운 코드다.

![abstractPaymentHandler](https://miro.medium.com/max/1400/1*06hlzBZyy12m2pUVCMYibQ.png)

![googlePayHandler](https://miro.medium.com/max/1400/1*e2B0EjspTxJUDlyw5tqOqg.png)

![cardPaymentHandler](https://miro.medium.com/max/1400/1*hYDg7bS5f8u2I_-Iy_Xp2Q.png)

이제 우리는 구체적인 핸들러들을 저장하는것과 모드에 의존하면서 이것을 반환하는 책임을 가진 factory class를 만들 것이다.

![paymentHandlerFactory](https://miro.medium.com/max/1400/1*08unVCi61YMjnLFTRtUPwg.png)

![paymentProcessor](https://miro.medium.com/max/1400/1*XxXYboveAL3NMlIO2GyuYg.png)

우리의 새로운 코드는 이제 open-closed principle을 



## L - Liskov Substitution principle

> 리스코프 치환 원칙

## I - Interface Segregation

> 인터페이스 분리 원칙

## D- Dependency Inversion

> 의존관계 역전 원칙





























