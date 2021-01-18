# Spring Boot Session

- 데이터베이스를 세션 저장소로 활용하는 방식
  - 가장 쉬운 방식
  - **단, 로그인마다 DB IO가 발생하여 성능상 이슈 발생 가능성 있음**
    - 성능상 이슈 발생할 정도로 사용자가 많다면 메모리 DB를 사용해야 함

1. `build.gradle`에 의존성 추가

   ```groovy
   compile('org.springframework.session:spring-session-jdbc')
   ```

2. `application.properties`에 세션 저장소 추가

   ```properties
   spring.session.store-type=jdbc
   ```

3. h2-console에 세션을 위한 테이블 생성 되었는지 확인

   - SPRING_SESSION, SPRING_SESSION_ATTRIBUTES
   - JPA로 인해 세션 테이블 자동 생성

4. 재시작했을경우 마찬가지로 세션이 풀리지만, AWS같은 서비스를 이용하게 되면 AWS의 RDS를 사용하게 되니 세션 풀리지 않음