# QueryDSL

- JPA에서 힘든 복잡한 Query를 가능하도록 함
- 쿼리를 진짜 Java코드로 작성
- 동적 Query 문제 해결
- 메서드로 사용할 수 있음
- 실습 설정
  - lombok, web, Jpa, h2
  - build and run & test : intelliJ
  - querydsl 
    - plugins 추가
    - dependencies 추가
    - bundle.gradle에 querydsl 관련문 필요
- 먼저 큐(Q)타입 뽑아내고 그것을 가지고 쿼리를 함
  - 쿼리와 관련된 것 모두 Q 타입
- Test시 사용하는 Entity Manger는 `@PersistenceManager` 혹은 `@Autowired` 로 구현
- 쿼리 사용시 `JPAQueryFactory` 이용



## Projection

- select 절에 무엇을 가져올지 대상을 지정하는 것

- 프로젝션 대상의 갯수에 따라 처리하는 방식이 달라짐

  - 한개 : 대상이 하나이면 타입을 명확하게 지정 가능

  - 여러개 : 반환 타입을 **Tuple** 로 지정 (repository 계층에서만 사용)

    ```java
    tuple.get(객체이름.속성명)
    ```

  - 밖으로 나갈때는 DTO로 변환해서 나가는 것 권장

- Projection DTO 조회

  - 순수 JPA에서 DTO 조회
    - 순수 JPA에서 DTO 조회를 할때는 `new` 명령어 사용
    - DTO의 패키명 모두 적어야 해서 더러움
    - 생성자 방식만 지원
  - Querydsl 에서는 3가지 방식 지원
    - 프로퍼티 접근
    - 필드 직접 접근
    - 생성자 사용

### Querydsl DTO 접근 방식

1. 프로퍼티 접근

   - setter 통해 값 생성됨
   - 기본 생성자 필요

   ```java
   List<MemberDto> result = queryFactory
     											.select(Projections.bean(MemberDto.class, member.username, member.age))
     											.from(member)
     											.fetch();
   ```

   - Projections.bean(클래스명, 속성)

2. 필드 활용 

   - Getter, Setter 없어도 사용 가능

   ```java
   List<MemberDto> result = queryFactory
     											.select(Projections.fields(MemberDto.class, member.username, member.age))
     											.from(member)
     											.fetch();
   ```

3. 생성자 방식

   - 생성자 인자와 조회할 것의 data가 일치 해야 함
     - 생성자가 호출되기 때문

   ```java
   List<MemberDto> result = queryFactory
     											.select(Projections.constructor(MemberDto.class, member.username, member.age))
     											.from(member)
     											.fetch();
   ```

- ***속성 매칭 안될때는 `속성.as("객체의 속성명")` 으로 하면 잘됨***



### @QueryProjection

- 프로젝션과 결과 반환, 타입 같은 것을 맞춰주기 때문에 안정적으로 코드 가져갈 수 있음
- 생성자 위에 `@QueryProjection` 붙이기
- `gradle -> compile -> Querydsl` 하면 dto도 Q파일로 생성됨
- 단점
  - Q파일 생성됨
  - Dto는 querydsl 의존성이 기존에 없었으나 의존성을 가지게 됨

```java
List<MemberDto> result = queryFactory
  								.select(new QMemberDto(member.username, member.age))
  								.from(member)
  								.fetch();
```

- QMemberDto는 Q객체의 생성자
  - 찾고자 하는대로 생성자 있어야 함
  - 어노테이션 붙인 생성자와 동일한 인자 필요로함
- Projections.constructor 사용하면 실행은 되나 컴파일 오류 잡지 못함 Runtime 오류 발생함 (실행하는 순간 되어서야 에러 발견)
  - 고로 생성자 이용하는 것보다 `@QueryProjection` 이용하는것 추천