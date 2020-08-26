# JPA

- JPA (Java Persistence API)
  - 일종의 인터페이스
    - 구현은 존재하지 않음. 고로, spring-data-jpa, hibernate 같은 것을 사용해야 함
  - 관계형 데이터 베이스를 사용하는 방식을 정의한 인터페이스
- MyBatis 보다 좀 더 쉽게 DB에 접근 할 수 있도록 도와줌
- ORM (Object Relational Mapping)을 위한 자바 표준

  - ORM은 객체와 DB 데이터를 맵핑해줌
  
  - 즉, 객체와 테이블을 맵핑시켜줌
  
  - 직관적인 코드로 데이터 조작할 수 있음

- 객체와 릴레이션을 맵핑할때 발생하는 불일치를 해결시켜줌

- 개발자가 비지니스 로직에 집중할 수 있고, 객체지향적 개발 가능



## 사용하기위해 필요한 조건

- 의존성 필요

  - spring-boot-starter-data-jpa

    - 추상화 정도

      - `Spring-Data-JPA -> Hibernate -> JPA`
      
      ![hierarchyOfJPA](https://suhwan.dev/images/jpa_hibernate_repository/overall_design.png)
      
        - hibernate는 jpa의 구현체 중 하나 (jpa를 사용하기 위해 반드시 hibernate를 사용할 필요는 없음)
	

    - jpa를 쉽게 사용하게끔 만들어주는 프레임워크

    - Spring-data-jpa는 jpa를 한 단계 더 추상화 시킨 Repository 제공
    
      - Repository 인터페이스를 구현하고, Repository 인터페이스에 정해진 규칙대로 메소드를 입력하면 사용 
      
      - Repository의 구현에서 JPA 사용

    - 쿼리  메소드 자동 구현

    - @EnableJpaRepositories

      - 스프링 부트가 자동으로 설정해줌

      - 여러개의 JPA를 사용할때 주입할 Repository Bean을 직접 지정할 수 있음
    
        ```java
        @EnableJpaRepositories(basePackageClasses = ResultLogRepo.class)
        ```
    
    - hibernate
    
      > https://victorydntmd.tistory.com/195
      >
      > https://suhwan.dev/2019/02/24/jpa-vs-hibernate-vs-spring-data-jpa/
      >
      > https://velog.io/@adam2/JPA%EB%8A%94-%EB%8F%84%EB%8D%B0%EC%B2%B4-%EB%AD%98%EA%B9%8C-orm-%EC%98%81%EC%86%8D%EC%84%B1-hibernate-spring-data-jpa
    
      - ORM으로써 자바 언어를 위한 객체관계 매핑 프레임워크
      - hibernate를 사용하면 SQL을 직접 사용하지 않고, 메소드 호출만으로 작업 가능
      - JPA 구현체의 한 종류로 사용됨

- 인터페이스 정의 필요

  - 쿼리문과 같은 역할을 수행함
  - 객체의 Repository 인터페이스를 작성해야함
  - 인터페이스에서 기본으로 지정된 함수 말고 사용자 정의 함수를 지정할 수 있음
  
  - `@Repository` annotation 붙이기
  
- application.properties 또는 application.yml 파일 작성해야 함
  - ddl-auto 값으로 4가지중 한가지 지정 가능
    - create : 프로그램 실행할때마다 Table 생성
    - update : 기존 Table 설정값을 변경하고 update
    - create-drop : 프로그램 종료되면 Table 삭제됨
    - validate : 테이블과 매핑하려는 entity가 일치하지 않을 경우 에러 발생

```yml
spring:
	jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
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



## 다대다 관계

> https://victorydntmd.tistory.com/208

