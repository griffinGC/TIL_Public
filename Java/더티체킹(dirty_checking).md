# 더티 체킹 (dirty checking)

> https://jojoldu.tistory.com/415

- dirty
  - 상태의 변화
- dirty checking
  - 상태 변경 검사
- JPA에서는 트랜잭션이 끝나는 시점에 **변화가 있는 모든 엔티티 객체**를 데이터베이스에 자동으로 반영해줌
- 변화의 기준은 **최초 조회 상태**