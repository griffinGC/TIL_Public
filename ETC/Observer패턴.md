# Observer 패턴

> [ObserverPattern](https://ko.wikipedia.org/wiki/옵서버_패턴)

- 옵저버들의 목록을 객체에 등록하여 상태변화가 있을때마다 메서드등을 통해 객체가 직접 목록의 각 옵저버에게 통지하도록 하는 디자인 패턴
- 분산 이벤트 시스템을 구현하는데 사용
  - [발행/구독 모델](https://ko.wikipedia.org/wiki/발행/구독_모델) 로도 알려져 있음
- 옵저버 혹은 리스너라고 불리는 하나 이상의 객체를 관찰 대상이 되는 객체에 등록 시킴
  - 각각의 옵저버들은 관찰대상인 객체가 발생시키는 이벤트를 받아서 처리



## 예시

- 구조

  ![observer_example](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Observer.svg/1708px-Observer.svg.png)

- Subject (주체)

  - 이벤트를 발생시킴

- 이벤트가 발생하면 각 옵저버는 콜백을 받음

  - `notify()` 함수는 관찰 대상이 발생한 메시지 이외에, 옵저버 자신이 생성한 인자값 전달 가능

- 옵저버 패턴이 많이 쓰이는 곳에서는 순환실행을 막는 매커니즘이 필요함

  - 이벤트 X가 옵저버 A와 옵저버 B를 갱신하고, 옵저버 B가 옵저버 A를 갱신할때, 옵저버 A가 이벤트 X를 발생시키지 않도록 만들어야 함

- 사례

  - 외부에서 발생한 이벤트에 대한 응답 (이벤트 기반 프로그래밍)
    - java swing
  - MVC패턴

- 예제 코드

  ```java
  
  ```

  