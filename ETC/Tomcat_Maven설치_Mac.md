# Mac 에서 Tomcat & maven 설치

> 맥에서 maven 및 tomcat 설치 방법 정리



## 1. Tomcat 설치

- 2가지 방법이 존재함

  1. `brew install tomcat`
  2. 직접 설치

  - 직접 설치하는 방법만 언급할 예정

- 직접 설치 방법

  1. 아파치 사이트에서 `tar.gz` 확장자의 파일 다운로드

     (https://tomcat.apache.org/whichversion.html)

  2. 다운로드 받은 톰캣파일을 압축해제

  3. 압축 해제한 파일을 원하는 경로로 이동

     (현재는 `~apps`  로 이동시킬 예정)

     ```zsh
     mkdir ~/apps
     cd ~/apps
     mv ~/Download/apache-tomcat-8.x.xx ~/apps
     ```

  4. 쉘 파일에 실행 권한을 줌

     ```zsh
     chmod +x ./bin/*.sh
     ```

- 사용 방법

  - 실행

    1. 설치한 디렉토리 위치로 이동

    2. 위치에서 실행

       ```zsh
       ./bin/startup.sh
       # 권한 없을 시 sudo 로 실행
       sudo ./bin/startup.sh
       ```

  - 중단

    - 설치한 위치에서 `shutdown.sh` 실행

      ```zsh
      ./bin/shutdown.sh
      ```

      

## 2. Maven 설치

- 크게 2가지 방법이 존재함

  1. `brew install maven`
  2. 직접 설치

  - `brew` 설치 방법만 언급할 예정

- `brew` 설치 방법

  1. `brew install maven`

  2. 설치 되었는지 버전 확인

     ```zsh
     mvn --version
     # 아래와 같은 화면 나오는지 확인
     Apache Maven 3.6.3
     Maven home: /usr/local/Cellar/maven/3.6.3_1/libexec
     Java version: 13.0.2, vendor: N/A, runtime: /usr/local/Cellar/openjdk/13.0.2+8_2/libexec/openjdk.jdk/Contents/Home
     Default locale: ko_KR, platform encoding: UTF-8
     OS name: "mac os x", version: "10.15.3", arch: "x86_64", family: "mac"
     ```

  3. 환경변수 설정 (안해도 됨)

     ```shell
     export M2_HOME={설치 경로}
     export M2=${M2_HOME}/bin
     export PATH=${PATH}:${M2_HOME}/bin
     ```

     



## 출처

> Tomcat
>
> > https://www.edwith.org/boostcourse-web/lecture/16684/
>
> Maven
>
> > https://sugerent.tistory.com/573