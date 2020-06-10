# 외부 Library를 추가해서 배포하기

- maven 으로 추가를 못할 경우 사용

  1. source directory에 `lib` 라는 폴더를 생성하고 그곳에 외부 library(`.jar`)를 넣어준다.

  2. pom.xml에 설정 추가

     1. properties 추가

        ```yml
        <properties>
                 ...
         <webapp.lib>${basedir}/lib</webapp.lib>
        </properties>
        ```

     2. dependencies 추가

        ```yml
        <dependencies>
        	<dependency>
        			<groupId>externalLibrary</groupId>
        			<artifactId>externalLibrary</artifactId>
        			<version>1.0</version>
        			<scope>system</scope>
        			<systemPath>${webapp.lib}/externalLibrary.jar</systemPath>
        		</dependency>
        		...
        <dependencies>
        ```

     3. plugin 설정

        - **<includeSystemScope>true</includeSystemScope>**

        ```yml
        		<plugins>
        			<plugin>
        				<groupId>org.springframework.boot</groupId>
        				<artifactId>spring-boot-maven-plugin</artifactId>
        				<configuration>
        					<includeSystemScope>true</includeSystemScope>
        				</configuration>
        			</plugin>
        		</plugins>
        ```

  3. maven clean

  4. maven package

  5. `.jar` 파일 완성



## 참고자료

> http://justdevelo.blogspot.com/2019/03/spring-boot-jar.html

> https://goddaehee.tistory.com/243

> https://stackoverflow.com/questions/30207842/add-external-library-jar-to-spring-boot-jar-internal-lib



