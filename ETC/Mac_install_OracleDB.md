# Mac에서 Oracle Database 설치

- Oracle DB는 맥 운영체제를 지원하지 않음

- VM 이나 Docker를 이용해서 사용해야함

- 맥에서 Oracle-xe-11g 설치

  1. Docker 설치

  2. 이미지 pull

     - 원하는 아무 이미지나 dockerhub에서 검색해서 사용하면 됨

     > https://hub.docker.com/r/oracleinanutshell/oracle-xe-11g

  3. 받아온 이미지 실행

     ```zsh
     docker run -d -p 49161:1521 oracleinanutshell/oracle-xe-11g
     ```

     - DB 포트인 1521번을 컴퓨터의 49161번 포트에 연결

     - 나중에 SQL Developer 이용 접속시 49161번 포트 이용

  4. SQL Developer 로 실행 (Oracle에서 다운)

     - 아이디 : system

     - 비밀번호 : oracle

  - 참고자료

  	> https://clearstar0817.tistory.com/13
  	> https://augustines.tistory.com/122