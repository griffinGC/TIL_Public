# Maven

- 자바용 프로젝트 관리 도구

- CoC (Convention over Configuration) 을 도와줌

  일종의 관습으로써, 프로그램의 소스파일이 어느 위치에 있어야 하고, 컴파일 된 파일이 어디 있어야 하는지 등을 나타냄

- 빌드, 패키징, 문서화, 테스트 & 테스트리포팅, git, 의존성 관리 등을 손쉽게 처리 가능
- 후에 등장한 비슷한 툴로 Gradle이 존재



### 장점

- 편리한 의존성 라이브러리 (설정 파일 이용)
- 모든 개발자가 일관된 방식으로 빌드 수행 가능
- 다양한 플러그인 제공으로 인한 자동화 가능



### Maven이 참조하는 파일

1. `settings.xml`

   : maven tool 자에체 관련된 설정 담당

   `MAVEN_HOME/conf/` 아래에 존재. 보통 Maven 자체 설정 값을 바꾸는 경우는 거의 없음

   

2. `pom.xml`

   : Maven 기반 프로젝트 생성시 프로젝트 하위에 생성됨

   프로젝트 내 빌드 옵션을 설정하는 부분



### 태그 정보

- project : pom.xml 파일의 최상위 루트 엘리먼트
- modelVersion : POM model의 버전
- groupId : 프로젝트를 생성하는 조직의 고유 아이디 (일반적으로는 도메인의 이름을 거꾸로 적음)
- artifactId : artifact의 고유 아이디 결정
- packaging : 해당 프로젝트를 어떤 형태로 패키징 할지 결정 (ex. jar, war, ear)
- version : 프로젝트의 현재 버전
- name : 프로젝트의 이름
- url : 프로젝트의 url 

*** Maven의 가장 큰 장점중 하나는 Dependency Management.  **

​	(위의 pom.xml 파일의 `<dependencies/>` 엘리먼트를 이용하여 안에 필요한 라이브러리 설정)



### 사용법

- file -> new -> other -> maven project

- Maven으로 생성된 프로젝트의 자바 소스는 `src/main/java`에 생성됨

- 웹 어플리케이션과 관련된 프로젝트는 `src/main/webapp` 폴더에서 작성 (html, css)

- `src/main/java` 폴더가 없다면 별도로 생성

  ***필요한 폴더가 없다면 별도로 생성**

  - java 폴더 생성 후 적용법

    우측 클릭 -> properties -> Java Build Path -> Soruce -> Add Folder -> java폴더 추가

- JDK 버전을 변경하고 싶다면 `pom.xml` 파일을 수정해야 함

  `<build> -> <plugins> -> <plugin> -> <configuration> -> <source>, <target> ` 추가하고 버전 설정

  ```xml
    <build>
      <finalName>griffindouble</finalName>
     	<plugins>
     	<plugin>
     		<groupId>org.apache.maven.plugins</groupId>
     		<artifactId>maven-compiler-plugin</artifactId>
     		<version>3.6.1</version>
     		<configuration>
     			<source>1.8</source>
     			<target>1.8</target>
     		</configuration>
     	</plugin>
     	</plugins>
    </build>
  ```

  

- 파일 수정후에는 프로젝트의 properties에 들어가서 설정 적용해주어야함

  `properties -> Maven -> Java EE Integration -> Enable Project Specific Settings -> Apply and Close`

- Maven 프로젝트를 생성했을 경우 HttpServlet 찾을수 없다는 오류 발생

  - `pom.xml`의 dependencies에 코드 추가

    ```xml
    <dependency>
    	<groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
    ```

    scope의 provided는 컴파일 시에만 사용하고 배포시에는 사용하지 않는 것을 의미

    scope의 4가지 종류

    1. compile : 컴파일할때 필요. 설정 없을 시 기본 값

    2. runtime : 런타임에 필요. 컴파일 시에는 필요 없으나, 실행 시에 필요(ex. JDBC 드라이버)

    3. provided: 컴파일 시에 필요하지만, 실제 런타임 때에는 컨테이너 같은 것에서 제공하는 모듈. 

       ​				(ex. servlet, jsp, api). 배포시 제외

    4. test : 테스트 코드를 컴파일 할 때 필요. 테스트 시 클래스 패스에 포함. 배포 시 제외

  - 프로젝트 선택 -> 우측버튼 -> Run on Server -> Runtime 지정

    

- Maven에서 MySQL사용법

  - Maven에서는 `<dependency>` 추가 함으로써 사용 가능

  ```xml
  <dependencies>
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>5.1.45</version>
    </dependency>
  </dependencies>
  ```

- Maven에서 pom.xml 수정시 <properties></properties> 이용하여 변수 선언 후 아래에서 `${변수명}` 이용하여 사용 가능

  ```xml
  <properties>
    <!-- 변수 선언 -->
  	<jackson.version>3.0</jackson.version>
  </properties>
  
  <dependencies>
  	<dependency>
    	<groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>${jackson.version}</version>
    </dependency>
  </dependencies>
  ```

  

***설정 변경 후에는 반드시 `우클릭 Maven -> Update Project` 실행**





## 참고자료

https://jeong-pro.tistory.com/168

https://www.edwith.org/boostcourse-web/lecture/16723/

