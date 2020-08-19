# Proxy Pattern

## 정의

- 실제 기능을 수행하는 객체(Real Object) 대신 가상의 객체(Proxy Object)를 사용해 로직의 흐름을 제어하는 디자인 패턴



## 특징

- 원래 하려던 기능을 수행하며 그외의 부가적인 작업(로깅, 인증, 네트워크 통신 등)을 수행하기에 좋음
- 비용이 많이드는 연산(DB쿼리, 대용량 텍스트 파일)을 실제로 필요한 시점에 수행할 수 있음
- 사용자 입장에서는 프록시 객체나 실제 객체나 사용법은 유사하므로 사용성이 좋음

## 예시

- Real Object, Proxy Object는 동일한 인터페이스를 구현한다.
- Proxy Object는 메서드 수행시 실제 객체(Real Object)의 메서드에 위임한다.



## 프록시의 종류

- 종류는 다양하지만 가상 프록시(Virtual Proxy)와 보호 프록시(Protection Proxy)에 대해 살펴봄



## 가상 프록시

- 실제 객체의 사용 시점을 제어할 수 있음
  - Lazy Installation를 프록시를 사용해 구현할 예정
  - 



## 참고자료

> https://jdm.kr/blog/235
>
> 