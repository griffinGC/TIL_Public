# SpringBoot와 MySQL 연결 (JPA)

1. 의존성 추가

   1. jpa

      ```xml
      <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-data-jpa</artifactId>
          <version>2.3.0.RELEASE</version>
      </dependency>
      ```

   2. mysql-connector

      ```xml
      <dependency>
          <groupId>mysql</groupId>
          <artifactId>mysql-connector-java</artifactId>
          <version>8.0.20</version>
      </dependency>
      ```

2. application.properties 혹은 application.yml 작성

   - jpa 설정과 datasource 설정을 둘다 해야 함
     - `.properties` 파일에서 `.yml` 로 바뀌면 camel-case 가 kebab-case로 변경됨

   ```yml
   spring:
     jpa:
       hibernate:
         ddl-auto: update
     datasource:
       url: jdbc:mysql://localhost:3306/arx?serverTimezone=Asia/Seoul
       username: root
       password: 비밀번호
       driver-class-name: com.mysql.cj.jdbc.Driver
   ```

3. Entity 작성

   - `@Entity` 어노테이션 반드시 작성해야함
   - `@Id` 는 엔티티의 기본키를 나타냄 (반드시 필요)
   - `@GeneratedValue` 를 이용하여 **값이 자동 증가**되도록 만들어야 함
     - `@GeneratedValue(strategy = GenerationType.IDENTITY)`

4. 인터페이스 작성

   - `@Repository` annotation 붙이기
   - `JpaRepository<객체, 키값자료형>` 또는 `CrudRepository<객체, 키값자료형>` 을 상속받아야 함
  - CrudRepository <- PagingAndSortingRepository <- JpaRepository
       - 왼쪽에 있는 것일수록 상위 클래스
   - 서비스 클래스에서 사용