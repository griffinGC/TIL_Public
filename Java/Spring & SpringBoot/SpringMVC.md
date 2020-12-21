# Spring MVC

> https://postitforhooney.tistory.com/entry/Spring-MVC-%ED%8C%A8%ED%84%B4%EC%97%90%EC%84%9C%EC%9D%98-5%EA%B0%80%EC%A7%80-%EA%B3%84%EC%B8%B5%EC%97%90-%EB%8C%80%ED%95%9C-%EC%A0%95%EB%B3%B4-%ED%8D%BC%EC%98%B4
>
> https://lazymankook.tistory.com/30

## MVC 패턴

- 비지니스 로직과 프레젠테이션 로직을 분리하기 위한 패턴
- 이를 이용하면 사용자 인터페이스로부터 비지니스 로직을 분리하여 어플케이션의 시각적 요소나 그 이면에서 실행되는 비지니스 로직을 서로 영향없이 쉽게 고칠 수 있는 어플리케이션 구현 가능

- 대부분의 MVC 프레임워크들은 Front Controller 패턴 적용해서 구현
- SpringMVC에서는 DispatcherServlet이 Front Controller 역할 수행

## Model

- 어플리케이션의 정보 
  - 데이터
  - 비지니스로직(business logic)
- DB같은 데이터 저장소와 연동하여 사용자가 입력한 데이터나 사용자에게 출력할 데이터를 다루는 일 수행
- 여러개의 데이터 변경작업을 하나의 작업으로 묶는 트랜잭션을 다루는 일 수행
- DAO 클래스
- Service 클래스 내부에서 DAO 사용
  - service가 트랜잭션 단위

## View

- 사용자에게 제공할 화면
  - presentation logic
- 사용자에게 출력할 화면을 만드는 일 수행
- 생성된 화면은 웹브라우저가 출력
- Html과 JSP를 사용하여 작성 가능

## Controller

- Model과 View 사이의 상호작용 관리
- 클라이언트의 요청을 받았을 때 그 요청에 대해 실제 업무를 수행하는 모델 컴포넌트를 호출하는 일 수행
- 클라이언트가 보낸 데이터가 있다면, 모델을 호출할 때 전달하기 쉽게 데이터를 적절히 가공하는 일 수행
- 모델이 업무 수행 완료하면, 그 결과를 가지고 화면에 생성하도록 뷰에게 전달
- Servlet과 JSP를 사용하여 작성 가능
  - model1 아키텍쳐에서는 JSP가 Controller역할 수행
  - model2 아키텍쳐에서는 Servlet이 Controller역할 수행





