# Front Controller

- Front Controller는 클라이언트가 보낸 요청을 받아서 공통적인 작업을 먼저 수행
  - 이 역할 (Front Controller)는 Servlet 혹은 JSP가 수행
- 적절한 세부 Controller에게 작업 위임
- 각각의 어플리케이션 Controller는 클라이언트에게 보낼 뷰를 선택해서 최종 결과를 생성하는 작업
- 공통적으로 처리해야하는 로직이 있을 경우, 전체적으로 클라이언트의 요청을 중앙 집중적으로 관리하고자 하는 경우 에 사용

- 대부분의 MVC 프레임워크들은 Front Controller 패턴 적용해서 구현
  - Spring MVC도 DispatcherServlet 클래스가 Front Controller 역할 수행
- Front Controller는 예외 발생시 일관된 방식으로 처리하는 역할 수행

