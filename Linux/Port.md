# Port 관리

- 특정포트 종료

  > https://new93helloworld.tistory.com/138

  1. 포트 번호에 해당하는 PID 확인
  2. 포트 번호에 해당하는 PID 종료

  ```shell
  sudo kill -9 프로세스번호
  ```

- 포트 확인

  ```shell
  sudo lsof -i:포트번호
  ```

  