# Java Serialize & Deserialize

## Serialize

- 객체를 Byte 스트림으로 변경하는것
- Object -> Byte 
- Json, XML 형태로도 serialize 가능
  - jackson 이용
- Serialize를 위해서는 `java.io.Serializable` 인터페이스를 구현해야 함
- Serialize는 자바 시스템과 다른 시스템과의 데이터 교환을 위해서 존재함
- JVM의 메모리에서만 상주되어있는 객체 데이터를 그대로 영속화(Persistence)가 필요할때 사용됨
  - 영속화 한다는 것은 다른 곳에 저장을 하기 때문에 영속화가 가능한다는 것인가?
  - 
- 시스템이 종료되더라도 없어지지 않음
  - 시스템이 종료되더라도 없어지지 않는 것은 어딘가 파일 같은데에 쓰이기 때문인가?
  - serialization은 나중에 JVM에서 호출할때 사용하기 위해서 데이터 저장할때 사용
- Persistence 한 데이터 이기 때문에 네트워크로 전송도 가능함

### 예시

```java
// Member Class
package serializeExam;

public class Member implements Serializable{
  private String name;
  private
}
```





## Deserialize

- Byte 스트림을 객체로 변경하는 것

- Byte -> Object



## 참고자료 

> https://www.geeksforgeeks.org/serialization-in-java/
>
> https://woowabros.github.io/experience/2017/10/17/java-serialize.html
>
> https://www.developer.com/java/other/article.php/3863686/java-serialization-persist-your-objects.htm
>
> 