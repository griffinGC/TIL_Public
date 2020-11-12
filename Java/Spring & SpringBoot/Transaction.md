# Transaction

- 비지니스 로직에서 쪼개질 수 없는 하나의 단위 작업

- 한번에 이루어지는 작업단위

- `@Transactional`

  - Service layer에서 각각의 메서드 선언부 위에 사용

  - 이 어노테이션 붙이면 내부의 비지니스로직중 하나라도 에러나면 모두 rollback 처리되어서 DB에 반영 안됨

- ACID 충족 시켜야함

  - Atomicity
    - 한 트랙잭션 내에서 실행한 작업은 모두 하나로 간주
    - 모두 성공 or 실패
  - Consistency
    - 일관성 있는 DB 상태 유지
  - Isolation
    - 동시에 실행되는 트랙잭션들이 서로 영향을 미치지 않도록 격리
  - Durability
    - 성공적으로 마치면 결과가 항상 저장

- 클래스, 메서드 위에 어노테이션 추가되면 이 클래스에 트랜잭션 기능 적용된 **프록시 객체** 생성됨

- PlatformTransactionManager 사용하여 트랜잭션 시작하고 정상 여부에 따라 Commit 또는 Rollback

- `propagation` 옵션

  - 트랜잭션 도중 다른 트랜잭션을 실행하는 상황에서 선택 할 수 있는 옵션

  - `propagation` 속성 이용하여 피호출 트랜잭션 입장에서는 호출 한쪽 트랜잭션을 그대로 사용할 수 있고, 새롭게 트랜잭션을 생성 할 수도 있다.

    ```java
    @Transactional(propagation = REQUIRES_NEW)
    // 항상 새로운 트랜잭션 시작 (이미 진행중인건 보류)
    ```

    

- readOnly = true 옵션
  
  - 트랜잭션 범위는 유지하되 조회 기능만 남겨두어, **조회 속도가 개선됨**