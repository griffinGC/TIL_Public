# Mac에서 MongoDB 설치

- Brew 를 이용한 설치

  > https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

  1. tap을 이용해서 brew에 추가

     ```bash
     brew tap mongodb/brew
     ```

  2. Mongodb 설치

     ```bash
     brew install mongodb-community
     ```

  3. Mongodb 시작

  	```bash
  	brew services start mongodb-community
  	```

     - background에서 수동으로 시작

       ```bash
       mongod --config /usr/local/etc/mongod.conf --fork
       ```

  4. Mongodb 중지

     ```bash
     brew services stop mongodb-community
     ```

  5. Mongodb 접속

     ```bash
     mongo
     ```

     

- 다운로드 이용 설치
  
  - 환경변수 설정을 비롯하여 디렉토리 이동등이 필요함