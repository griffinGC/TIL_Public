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

