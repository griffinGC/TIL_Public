# Java Serialize & Deserialize

## Serialize

- 객체를 Byte 스트림으로 변경하는것
- Object -> Byte stream
- Json, XML 형태로도 serialize 가능
  - jackson 이용
- Serialize를 위해서는 `java.io.Serializable` 인터페이스를 구현해야 함
  - `public class Member implements Serializable`
- Serialize는 자바 시스템과 다른 시스템과의 데이터 교환을 위해서 존재함
- JVM의 메모리에서만 상주되어있는 객체 데이터를 그대로 영속화(Persistence)가 필요할때 사용됨
  - 영속화 한다는 것은 다른 곳에 저장을 하기 때문에 영속화가 가능한다는 것인가?
    - Yes
  - 영속화란 영구 저장한다는 뜻
- 시스템이 종료되더라도 없어지지 않음
  - serialization은 나중에 JVM에서 호출할때 사용하기 위해서 데이터 저장할때 사용
- Persistence 한 데이터 이기 때문에 네트워크로 전송도 가능함
  - JVM 외부에서 사용 가능한 영구적인 데이터

### 예시

```java
// Member Class
package serializeExam;

public class Member implements Serializable{
  private String name;
  private
}
```



### 사용처

- 서블릿 세션
  - 서블릿 기반의 WAS들은 대부분 자바 직렬화 지원
  - 파일 저장, 세션 클러스터링, DB저장 등을 사용시 세션 자체가 직렬화 되어 저장되고 전달 됨
- 캐시
  - DB 조회한 후 가져온 데이터 객체를 실시간 형태가 아닌 메모리, 외부 저장소, 파일등을 이용해 데이터 객체를 저장한 후 동일한 요청이 오면 DB를 다시 요청하는 것이 아닌 저장된 객체를 찾아서 응답하게 할때 캐시 사용
  - 캐시할때 직렬화된 데이터를 저장해서 사용
    - 간편하기 때문에 많이 사용 (자바 직렬화만 사용하는 것은 아님)
- 자바 RMI(Remote Method Invocation)
  - 원격 시스템간의 메시지 교환을 위해서 사용하는 자바에서 지원하는 기술



### serialVersionUID (SUID)

- 필수 값은 아님
- 호환 가능한 클래스는 SUID 값이 고정되어 있음
- SUID 가 선언되어 있지 않으면 클래스의 기본 해쉬값을 사용
  - 클래스 내부가 변경(속성 추가 삭제 등)되면 SUID도 변경되어 역직렬화시 에러가 발생하게 됨
- 멤버 변수가 같은데 멤뻐 변수 타입이 바뀌어도 SUID는 동일
- SUID 값이 동일하면 멤버 변수 제거 및 메서드 추가는 크게 문게자 없음
  - 멤버 변수 제거 및 이름 변경은 오류는 발생하지 않으나 데이터는 누락됨





## Deserialize

- Byte 스트림을 객체로 변경하는 것

- Byte stream -> Object



### 역직렬화시 클래스 구조 변경 문제 발생

- 객체를 직렬화 시킨 후에 다시 역직렬화 시킬때, 그 객체의 클래스가 변경되었다면 문제가 발생함
  - 클래스의 멤버 변수 하나만 추가되었다고 하더라도 예외 발생
  - **`serialVersionUID` 의 정보가 변경되었다고 예외 발생**
- 조금이라도 역직렬화 대상 클래스 구조가 바뀌면 에러가 발생하는 민감한 구조가 아닌 이상 `serialVersionUID` 값을 관리해주어야 클래스 변경 시 혼란 줄일 수 있음
- SUID가 동일해도 에러 발생 가능 (SUID 값을 고정해놓았다고 가정)
  1. 멤버 변수명은 같은데 멤버 변수 타입이 바뀔때
  2. 직렬화 자바 데이터에 존재하는 멤버 변수를 없애거나 추가하였을때
     - 에러가 발생하지는 않음
     - 없앴을 경우
       - 직렬화된 것에는 존재하지만 역직렬화된 것에는 사라짐
     - 추가했을 경우
       - 역직렬화 시, null로 값이 채워짐

---

- `serialVersionUID` 값은 직접 관리해야함
- 역직렬화 대상의 클래스의 멤버 변수 타입 변경을 지양해야 함
- 외부에 장기간 저장될 데이터는 자바 직렬화 사용을 지양해야함
  - 외부에 오랬동안 존재했던 직렬화된 데이터는 쓰레기가 될 가능성이 높음
  - 언제 예외가 발생할지 모르는 지뢰 시스템이 될 수 있음
- 개발자가 직접 컨트롤이 힘든 클래스의 객체는 직렬화 지양
- **즉, 자주 변경되는 클래스의 객체는 직렬화를 사용안하는 것이 좋음**

- **역직렬화가 되지 않을 때와 같은 예외처리는 기본적으로 하는 것을 추천**



### 단점

- 직렬화 하게 되면 메타 정보도 모두 가져오기 때문에 json 같은 최소 메타 정보를 가진것보다 최소 2배에서 최대 10배정도 더 큰 크기를 가질 수 있음
  - 핵심만 요약해서 기록하는 형태가 효율적임
  - 트래픽이 지속적으로 증가할때는 json 형태 또는 다른 형태의 직렬화로 바꿔주는 것을 추천

- 자바 직렬화의 최대 단점은 자바에서만 사용할 수 있고, 읽을 수 있음
  - 다른 언어를 이용하여 처리하는 것은 거의 불가능에 가까움
  - JSON 같은 것은 처리 쉬움



## 결론

- 외부 저장소로 저장되는 데이터는 짧은 만료시간의 데이터를 제외하고 자바 직렬화 사용을 지양

- 역직렬화시 반드시 예외가 생긴다는 것을 생각하고 개발하라
- 자주 변경되는 비지니스적인 데이터를 자바 직렬화를 사용하지 마라
- 긴 만료시간을 가지는 데이터는 JSON등 다른 포맷을 사용하여 저장하라





## 참고자료 

> https://www.geeksforgeeks.org/serialization-in-java/
>
> https://woowabros.github.io/experience/2017/10/17/java-serialize.html
>
> https://woowabros.github.io/experience/2017/10/17/java-serialize2.html
>
> https://www.developer.com/java/other/article.php/3863686/java-serialization-persist-your-objects.htm
>
> 
