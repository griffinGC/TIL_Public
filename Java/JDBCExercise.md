# JDBC Exercise



## JDBC 수행순서

1. DriverManager

   ```java
   //import sql
   import java.sql.*;
   
   Class.forName("com.mysql.jdbc.Driver");
   ```

2. Connection

   ```java
   String dburl = "jdbc:mysql://localhost:3306/dbName";
   
   Connection conn = DriverManager.getConnection(dburl, id, pwd);
   return conn;
   ```

3. Statement

   ```java
   Statement stmt = conn.createStatement();
   //어떤 쿼리든 수행
   stmt.execute("select * from test");
   //SELECT 만 수행
   stmt.executeQuery("select * from test");
   //INSERT, UPDATE, DELETE
   stmt.executeUpdate("INSERT INTO test(no, a, b) VALUES(1, 2,3)")
     
   PreparedStatement ps = conn.prepareStatement(sql문);
   //Int형태로 받아오고 1번째 물음표에 x라는 인자를 넣는다는 의미
   //ps.setInt(순번, 인자);
   ps.setInt(1, x);
   //PreparedStatement 실행
   rs = ps.executeQuery();
   ```

4. ResultSet

   ```java
   ResultSet rs = stmt.executeQuery("SELECT * from test");
   //rs.next()의 의미는 결과 값이 있다면 첫번째 레코드로 커서를 이동시키고 true를 리턴
   while(rs.next()){
     System.out.println(rs.getInt("no"));
     //rs.getString(순서 또는 컬럼이름 가능)
     String test = rs.getString(1);
     int number = rs.getInt("no");
   }
   ```

5. 닫기

   ```java
   //열은 것의 역순으로 닫기
   rs.close();
   stmt.close();
   conn.close();
   ```



## 테이블 클래스 생성

> 테이블의 데이터를 위한 클래스를 생성 (DTO, Data Transfer Object)
>
> 계층간 데이터 교환을 위한 자바빈즈.

1. 클래스 생성 (가져올 테이블 명)
2. 가져오고 싶은 Attribute 선언
3. 각 Attribute에 대한 getter, setter 생성
4. 출력을 위해 toString 메소드 오버라이딩해서 사용
5. 객체 생성을 위한 인자값을 가진 생성자 추가



## 테이블 조회를 위한 클래스 생성

> 클래스명 + DAO(Data Access Object) 라는 이름으로 생성
>
> DB접속 등 데이터 베이스 처리 관한 기능으로 구성된 객체

1. dao라는 패키지 생성 & 클래스 생성
2. 객체를 리턴하는 메소드 생성 (get객체)
3. DB와 통신하는 순서대로 선언
   1. Connection
   
   2. PreparedStatement
   
      - 물음표를 대신해서 사용함으로써 인자값을 넣을 수 있음. 물음표가 바인딩 되는 부분만 바뀜
   
        반드시 물음표를 바인딩하는 코드가 존재해야 함
   
      - set 메소드 이용하면 됨
   
      - Ex. ps.setInt(1, x) => Int형태로 받아오고 1번째 물음표에 x라는 인자를 넣는다는 의미
   
   3. ResultSet

4. finally 사용 close() 예외 처리해주기



## Try-With-Resources

> try 구문에서 Resource를 설정하면 finally 구문에서 리소스에대해서 close() 해줄 필요가 없다.

```java
try(Connection conn = DriverManager.getConnection(dburl, dbUser, dbPwd);
   	PreparedStatement ps = conn.preparedStatement(sql)){
  
}
return 원하는 값!
```