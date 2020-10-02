# Spring Security

- 인증과 인가 기능을 가진 프레임워크
- 스프링 기반의 애플리케이션에서 보안 표준
- 스프링 시큐리티랑 OAuth 2.0을 이용하여 구글 로그인 구현 가능
- spring-security-oauth2-autoconfigure 이용하여 구현 가능
- Spring Security Oauth2 Client
- spring 2.0으로 넘어오면서 CommomOAuth2Provider라는 enum이 추가되어서 구글, 깃허브, 페이스북, 옥타의 기본 설정값이 제공됨
- 로그인 구현시 고려사항
  - 로그인 시 보안
  - 비밀번호 찾기
  - 비밀번호 변경
  - 회원정보 변경
  - 회원가입 시 이메일 혹은 전화번호 인증
  - OAuth 로그인 구현시 앞의 목록을 모두 구글, 페이스북, 네이버 에 맡길 수 있음