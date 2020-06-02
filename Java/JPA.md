# JPA

- JPA (Java Persistence API)
- MyBatis 보다 좀 더 쉽게 DB에 접근 할 수 있도록 도와줌
- ORM (Object Relational Mapping)을 위한 자바 표준
- 객체와 릴레이션을 맵핑할때 발생하는 불일치를 해결시켜줌



## 사용하기위해 필요한 조건

- 의존성 필요

  - spring-boot-starter-data-jpa

    - jpa를 쉽게 사용하게끔 만들어주는 프레임워크

    - Repository Bean을 자동으로 생성해줌

    - 쿼리  메소드 자동 구현

    - @EnableJpaRepositories

      - 스프링 부트가 자동으로 설정해줌

      - 여러개의 JPA를 사용할때 주입할 Repository Bean을 직접 지정할 수 있음

        ```java
        @EnableJpaRepositories(basePackageClasses = ResultLogRepo.class)
        ```

- 인터페이스 정의 필요

  - 쿼리문과 같은 역할을 수행함
  - 객체의 Repository 인터페이스를 작성해야함
  - 인터페이스에서 기본으로 지정된 함수 말고 사용자 정의 함수를 지정할 수 있음



- application.properties 또는 application.yml 파일 작성해야 함
  - ddl-auto 값으로 4가지중 한가지 지정 가능
    - create 
    - update
    - create-drop 
    - validate

```yml
spring:
	jpa:
    hibernate:
      ddl-auto: update
```





## @Entity

- 테이블과 객체를 맵핑해주는 annotation
- 객체를 맵핑해주기 위해서는 반드시 사용할 객체 이름 위에 붙여야 함
- @Data는 lombok의 library일 뿐 @Entity를 대신할 수는 없음



## @Id

- 엔티티의 클래스임을 지정하여 DB 테이블과 매핑하는 객체
- import 할때 반드시 `import javax.persistence.Id;` 맞는지 확인



## @GeneratedValue

- primary key 값을 자동 생성하기 위해 명시할때 사용하는 어노테이션
- 자동 생성 전략으로는 4가지 존재
  - AUTO
  - IDENTITY
  - SEQUENCE
  - TABLE

```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```



## @Column

- 컬럼에 속성을 지정 할 수 있음
- @Column(nullable = false) -> null값 불가능 하도록 하는 것