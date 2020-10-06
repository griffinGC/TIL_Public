# Gradle

- Ant와 Maven의 장점을 합쳐서 만든 것
- Android OS의 빌드 도구로 채택 됨
- Maven을 이용하여 XML로 정의하게 되면 설정 내용이 길어지고 가독성이 떨어짐
  - 의존 관계가 복잡한 프로젝트 설정하기에 부적절함
- Groovy를 사용하기 때문에, 동적인 빌드는 Groovy 스크립트로 플러그인을 호출하거나 직접코드를 짜면 됨
  - Congifuration Injection방식을 사용해서 공통 모듈을 상속해서 사용하는 단점을 커버
  - 설정 주입 시 프로젝트의 조건을 체크할 수 있어 프로젝트 별로 주입되는 설정을 다르게 할 수 있음
- Maven보다 빌드 속도가 빠름

## Gradle 버전 변경

- 특정 버전으로 버전 변경 방식
    - `graldew wrapper --gradle-version 버전명`
    





## 참고 자료

> https://bkim.tistory.com/13

