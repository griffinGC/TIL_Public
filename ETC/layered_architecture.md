# Layered Architecture (레이어드 아키텍쳐)

> 계층화 아키텍쳐
>
> > https://www.edwith.org/boostcourse-web/lecture/16767/

- 효율적인 개발과 유지보수를 위해 계층화 하여 개발
- 중복되는 개발 요소가 존재하기 때문에 별도로 객체, 메소드로 분리해서 처리하기 위한 방식
- 대부분의 중/대규모 어플리케이션에서 적용
- 각 레이어는 독립된 R&R(Role & Responsibilities)를 가짐

- 서비스 객체
  - 비지니스 로직을 수행하는 메소드를 가지고 있는 객체 (비지니스 메서드)
    - 회원 service, 
  - **하나의 비지니스 로직**은 **하나의 트랜잭션**으로 동작
  - 서비스 객체에서 중복으로 호출되는 코드의 처리
    - 데이터 엑세스 메소드를 별도의 Repository(DAO) 객체에서 구현하도록 하고 Service는 Repository 객체를 사용

## Presentation 영역

- 사용자와 상호작용을 담당
- 사용자의 요청을 분석 / 응답
- DispatcherServlet
  - HandlerMapping
  - Controller
  - View
  - ViewResolver



## Service 영역

- 비즈니스 로직 수행
- 트랜잭션 수행
- Service Interface
  - ServiceImpl
  - @Service



## Data Access 영역

- 데이터의 저장과 조회를 담당
- 주로 데이터베이스와 연동하여 작업
- DAO
  - Repository
  - @Repository

