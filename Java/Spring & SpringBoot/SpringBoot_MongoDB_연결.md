# SpringBoot와 MongoDB 연결

> https://spring.io/guides/gs/accessing-data-mongodb/

1. 의존성 추가

   - spring-boot-start-data-mongodb

     ```xml
     <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-mongodb</artifactId>
     </dependency>
     ```

2. application.yml 설정

   - spring.data.mongodb.uri

   - spring.data.mongodb.username

   - spring.data.mongodb.password

   - spring.data.mongodb.database 

     - ***(디비 따로 지정할 시 사용)***

     ```yml
     spring:
       data:
         mongodb:
           uri: mongodb://127.0.0.1:27017/디비이름
     ```

3. 객체 정의

   - 객체의 명과 Collection 명이 다를 경우 `@Document(collection=컬렉션명)` 이용 지정해야 함

   - Collection과 동일한 필드를 지정함

   - key 값에는 `@Id` 붙이기

     ```java
     package com.msa.deIdentifier.sixthsense.dto.mongodb;
     
     import lombok.Data;
     import lombok.RequiredArgsConstructor;
     import org.springframework.data.annotation.Id;
     import org.springframework.data.mongodb.core.mapping.Document;
     
     @Document(collection = "Mulcamp")
     @Data
     @RequiredArgsConstructor
     public class SummaryData {
         @Id
         private final String _id;
         private final String fileName;
       // 둘다 사용 가능
     //    private final List<Summary> info;
         private final Info[] info;
     }
     
     ```

     

4. Repository 생성  (또는 MongoTemplate 이용 가능)

   - JPA에서 interface로 Repository 생성하는것 처럼 생성

   - 인터페이스에서 `MongoRepository<collection명, pk타입>` 상속 받음

   ```java
   package com.msa.deIdentifier.sixthsense.mongoRepository;
   
   import com.msa.deIdentifier.sixthsense.dto.mongodb.SummaryData;
   import org.springframework.data.mongodb.repository.MongoRepository;
   import org.springframework.stereotype.Repository;
   
   @Repository
   public interface SummaryDataRepo extends MongoRepository<SummaryData, String> {
   	// 쿼리 정의
   }
   ```

   

   

