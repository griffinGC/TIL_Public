# Spring 정리



### Spring Bean Configuration File (MyBatis-Spring 설정)

- SqlSessionFactoryBean을 Bean 등록할때 DataSource 정보와 MyBatis Config 파일정보, Mapping 파일의 정보를 함께 설정함
- SqlSessionTemplate을 Bean으로 등록 함

```xml
<!-- values.properties 파일을 설정해주는 곳. -->
<!-- 이를 이용해서 properties 파일을 사용할 수 있고, xml 내의 변수를 설정할 수 있음-->
<context:property-placeholder location="classpath:config/values.properties"/>

<!-- 패키지들로 부터 bean을 읽어 올 수 있도록 하는 문법 -->
<context:component-scan base-package="myspring.user"/>                         
```

- DataSource 
  - Apache-dbcp2 이용
  - Connection 정보를 가지고 있음.
  - Connection 을 Pool로 이용
  - 설정한 dataSource를 SqlSessionFactory의 setDataSource 함수의 인자로 넣음

- MyBatis 설정파일
  - ex. SqlMapConfig.xml
  - 데이터 베이스의 접속 주소 정보 혹은 Mapping 파일의 경로 등의 고정된 환경정보를 설정
  - VO (Value Object) 객체의 정보를 설정함

- SqlSession
  - 핵심적인 역할을 하는 클래스
  - SQL 실행이나 트랜잭션 관리를 실행
  - SqlSession 객체는 Thread-Safe 하지 않으므로 thread마다 필요에 따라 생성한다.
    - 고로, Thread-safe한 SqlSessionTemplate 사용
- SqlSessionFactory
  
  - SqlSession 생성 (관리)
- SqlSessionFactoryBean
  - MyBatis 설정파일을 바탕으로 SqlSessionFactory 생성
  - Spring Bean으로 등록해야 함

  - `setDataSource()`

    - 생성한 DataSource 값을 래퍼런스로 넘겨줌

  - `setConfiguration()`

    - value에 mapConfig 파일 지정 (ex. SqlMapConfig.xml)

  - `setMapperLocations()`

    - Mapper 파일들 지정.

    - `*` (애스터리스크) 이용해서 뒤에 Mapper.xml로 끝나는 파일 한번에 지정 가능

      ```xml
      <property name="mapperLocations">
        <list>
          <value>classpath:config/*Mapper.xml</value>
        </list>
      </property>
      ```

- SqlSessionTemplate

  - SqlSession들 구현하는 템플릿

    - 여기서 commit(), rollback(), insert(), delete(), selectOne(), selectList() 같은 것 구현

    - UserDAOImpl 같은 DAO 인터페이스를 정의한 파일들이 SqlSession을 사용함

      UserDaoImpl에 있는 read() 함수를 수행하면 함수 내부에 있는 `session.selectOne("userNS.selectUserById", id);` 가 수행되고, 그러면 UserMapper.xml 에 있는 id로 selectUserById 라는 것을 가진 구문이 SqlSession을 이용하여 수행된다.

  - 생성자의 인자로 SqlSessionFactory 필요

  - SQL 실행이나 트랙잭션 관리 실행

  - Thread-safe

    - 여러 스레드에서 동시에 접근하여 사용하여도 문제 없음

      > https://gompangs.tistory.com/entry/OS-Thread-Safe%EB%9E%80

  ```xml
  <bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate">
  	<constructor-arg ref="sqlSessionFactory"/>
  </bean>
  ```

- Mapping 파일
  - SQL 문과 OR Mapping 설정
  - 파일 내부에 `<select>`,` <insert>`,` <update>`,` <delete>` 태그를 이용해서 어떤 문을 수행할지 정하고,  id명으로 함수명을 주고, parameterType 명으로 리턴형을 줌
  - ex. StudentMapper.xml, UserMapper.xml

