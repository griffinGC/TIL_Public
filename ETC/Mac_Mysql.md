# Mac에서  MySql 사용 

1. brew 이용 설치

   - `brew update`를 통해 최신 버전으로 업데이트 해준다.

     `brew search mysql`을 통해 설치할 MySQL 버전을 확인해준다. 

     `brew install mysql`을 통해 원하는 버전의 MySQL을 설치해준다.(이 경우 최신버전)

2. 직접 다운로드 설치

   > https://daimhada.tistory.com/121

   1. dmg 다운로드

   2. 설치

   3. 접속

      ```zsh
      cd /usr/local/mysql/bin
      ./mysql -u root -p
      ```

   4. 중지
      
      - GUI 이용 중지 
   
3. docker를 이용한 설치 (가장 관리 편함)

   > http://jmlim.github.io/docker/2019/07/30/docker-mysql-setup/

   1. 도커 설치

   2. `docker pull mysql`

   3. 도커 데몬으로 실행

      ```shell
      docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root --name mysql mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
      ```

      - 혹은 yml 파일 생성해서 올리기

        ```zsh
        docker-compose up -d
        ```

   4. 컨테이너 접속

      1. workbench 이용 

         - 처음에 설정한 포트와 동일한 것으로 접속

      2. bash 이용 접속

         ```zsh
         docker exec -it container-name bash
         root@9e6afb1899c8:/# mysql -uroot -proot
         ```

### 테이블 생성 및 데이터 삽입 테스트

> https://futurists.tistory.com/11