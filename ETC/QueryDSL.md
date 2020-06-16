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