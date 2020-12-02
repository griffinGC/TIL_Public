# SOLID Principles

> https://levelup.gitconnected.com/solid-principles-simplified-with-illustrations-fe5265f68ec6

- 위의 아티클을 번역하고 요약한 글

## 요약

- 잘못 설계된 legacy 코드를 수정하는 것은 어렵다.

- 처음에 설계할때 잘 설계하는 것이 중요하다. 이를 위해 5가지 원칙이 존재한다.

- 5가지 원칙

  - Single Responsibility Principle (SRP)

    - 한번에 한가지 책임

  - Open Closed Principle (OCP)

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

