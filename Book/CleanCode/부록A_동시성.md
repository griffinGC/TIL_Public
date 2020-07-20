# 부록 A 동시성2

> p. 225에서 소개한 동시성을 좀 더 자세히 설명하고 보완하는 곳
>
> 독립적인 주제를 다뤘으므로 어떤 순서로 읽어도 괜찮다.

## 클라이언트 / 서버 예제

### 서버

- Bad Example

```java
ServerSocket serverSocke = new ServerSocket(8009);

while(keepProcessing){
  try{
    Socket socket = serverSocket.accept();
    process(socket); // 들어오는 메시지 처리
  } catch (Exception e){
    handle(e);
  }
}
```

### 클라이언트 

- Bad Example

```java
private void connectSendReceive(int i){
  try {
    Socket socket = new Socket("localhost", PORT);
    MessageUtils.sendMessage(socket, Integer.toString(i));
    MessageUtils.getMessage(socket);
    socket.close();
  } catch (Exception e){
    e.printStackTrace();
  }
}
```

### 테스트 코드

```java
@Test(timeout = 10000)
public void shouldRunInUnder10Seconds() throws Exception {
  Thread[] threads = createThreads();
  startAllThreads(threads);
  waitForAllThreadsToFinish(threads);
}
```

- 테스트 실패시, 이벤트 폴링 루프를 구현하면 모를까, 단일스레드 환경에서 속도를 끌어올릴 방법은 거의 없다.

  - 다중 스레드를 사용하면 성능이 높아질 수도 있지만, 어플리케이션이 어디서 시간을 보내는지 알아야 한다.

  - I/O
    - 소켓 사용, DB연결, 가상 메모리 스와핑 기다리기
  - 프로세서
    - 수치 계산, 정규 표현식 처리, 가비지 컬렉션

- 프로세서 연산에 시간을 보내는 경우

  - 스레드를 늘린다고 빨라 지지 않음 
    - cpu 사이클은 한계가 있기 때문

- I/O 연산에 시간을 보내는 경우

  - 동시성이 성능을 높여주기도 함
    - 시스템 한쪽이 I/O를 기다리는 동안 다른 쪽에서 뭔가를 처리해서 CPU를 효과적으로 사용 가능

## 스레드 추가하기

- 성능 테스트가 실패했다고 가정하였을 경우

  - 스레드를 추가하여 통과하기 (process 함수만 변경)

- process 함수

  ```java
  void process(final Socket socket){
    if(socket == null)
      return;
    
    Runnable clientHandler = new Runnable(){
      public void run(){
        try{
          String message = MessageUtils.getMessage(socket);
          MessageUtils.sendMessage(socket, "Processed: " + message);
          closeIgnoringException(socket);
        } catch(Exception e){
          e.printStackTrace();
        }
      }
    };
    Thread clientConnection = new Thread(clientHandler);
    clientConnection.start();
  }
  ```

  - 서버에서 관리하는 책임이 너무 많음

    - 책임을 분할한 코드
      - 스레드 관리 전략이 변할때 전체 코드에 미치는 영향이 작아짐
      - 다른 책임을 간섭하지 않음 -> 테스트 하기 훨씬 쉬워짐

    ```java
    public void run() {
      while (keepProcessing) {
        try {
          ClientConnection clientConnection = connectionManager.awaitClient();
          ClientRequestProcessor requestProcessor
            = new ClientRequestProcessor(clientConnection);
          clientScheduler.schedule(requestProcessor);
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
      connectionManager.shutdown();
    }
    ```

- 스레드를 한 곳으로 몰으면 스레드를 제어하는 동시성 정책을 바꾸기 쉬워짐

  - 스레드를 관리하는 코드는 스레드만 관리해야 함
  - 동시성 문제는 그 자체만으로도 추적하기 어렵다.

- 동시성 그 자체가 복잡한 문제이므로 다중 스레드 프로그램에서는 단일 책임 원칙이 특히 중요하다.



### 스레드를 차단하지 않는 방법 (non blocking)

- 최신 프로세서는 차단하지 않고도 안정적으로 값을 갱신
  - 자바5에서 AtomicBoolean, AtomicInteger 등의 여러 클래스를 제공하여 이를 이용하면 스레드를 차단하지 않도록 구현 가능

- 이 방법이 synchronized보다 성능이 좋은데, [CAS](https://en.wikipedia.org/wiki/Compare-and-swap) (Compare and Swap) 연산을 이용하기때문이다. 

- synchronized 키워드는 언제나 락을 건다. 다른 스레드가 같은 값을 갱신하지 않더라도 무조건 락부터 건다.

- 자바 버전이 올라갈 때마다 내장 락의 성능이 좋아지기는 했지만 그래도 락을 거는 대가는 여전히 비싸다.



### 다중 스레드 환경에서 안전하지 않은 클래스

1. SimpleDateFormat

2. 데이터베이스 연결

3. java.util 컨테이너 클래스

4. 서블릿

- 몇몇 collection 클래스는 스레드에 안전한 메서드를 제공 하지만, 그런 메서드 여럿을 호출하는 작업은 스레드에 안전하지않다.

- 예시
  - 각 메서드는 스레드에 안전하지만, 두 메서드 사이에 다른 스레드가 끼어들어 값을 추가할지도 모른다.

```java
if (!hashTable.containsKey(someKey)) {
  hashTable.put(someKey, new SomeValue());
}
```

#### 해결방안 세가지

1. 클라이언트 기반 잠금. 사용하는 곳에서 처리

2. HashTable을 객체로 감싼 후 다른 API를 사용

3. 스레드에 안전한 집합 클래스를 사용

- java.util.concurrent 패키지가 제공하는 집합 클래스는 putIfAbsent() 등과 같이 스레드에 안전한 메서드를 제공한다.



## 메서드 사이에 존재하는 의존성을 조심하라

- 각 메서드는 synchronized 키워드로 락을 걸었지만, 메서드 사이의 의존성때문에 문제가 발생하는 경우. iterator 예제가 그렇다.

- 해결방안 세가지

  1. 실패를 용인한다. 예외를 받아 처리하는 식으로.. (다소 조잡한 방법)

  2. 클라이언트 기반 잠금
     - 각 클라이언트가 synchronized 키워드를 이용해서 락을 걸고, 메서드 호출
     - **DRY**(Don't Repeat Yourserlf)를 위반한다.
     - 서버를 사용하는 모든 프로그래머가 락을 기억해 객체에 걸었다 풀어야 하므로 다소 위험한 전략

  3. 서버 기반 잠금
     - iterator 기반클래스에서 락을 건다.
     - 클라이언트에 중복해서 락을 걸지 않아도 된다.
     - 클라이언트 기반 잠금에 비해 코드 중복이 없다.

- **일반적으로 서버 기반 잠금이 더 바람직하다.**

  - 코드중복이 줄어든다.
  - 성능이 좋아진다. 
  - 오류가 발생할 가능성이 줄어든다.
  - 스레드 정책이 하나다.
  - 공유 변수 범위가 줄어든다.
    - 서버에 숨겨짐

## 데드락

- 다음 네 가지 조건을 모두 만족하면 데드락이 발생한다.

  1. 상호 배제
     - 여러 스레드가 한 자원을 공유하나 그 자원은 "여러 스레드가 동시에 사용하지 못하며, 개수가 제한적"

     - ex) 데이터베이스 연결, 쓰기용 파일 열기, 레코드 락, 세마포어 등

  2. 잠금과 대기
     - 스레드가 자원을 점유하면 필요한 나머지 자원까지 모두 점유해 작업을 마칠때까지 이미 점유한 자원을 내놓지않는다.

  3. 선점 불가
     - 한 스레드가 다른 스레드로부터 자원을 빼앗지 못한다.
  4. 순환 대기
     - 두 개의 스레드가 서로가 필요로 하는 자원을 점유하고 있으면서, 다른 스레드가 가진 자원을 필요로 할때

- 네 조건 중 하나라도 깨버리면 데드락은 발생하지 않는다.

### 상호 배제 조건 깨기

- 동시에 사용해도 괜찮은 자원을 사용한다. 
- 스레드 수 이상으로 자원수를 늘린다.
- 자원을 점유하기 전에 필요한 자원이 모두 있는지 확인한다.

### 잠금 & 대기조건 깨기

- 각 자원을 점유하기 전에 확인한다.
  - 만약 어느 하나라도 점유하지 못한다면 지금까지 점유한 자원을 몽땅 내려놓고 처음부터 다시 시작한다.

- 문제점
  - 기아 (Starvation) - 한 스레드가 계속해서 필요한 자원을 점유하지 못한다.

  - 라이브락 (Livelock) - 여러 스레드가 한꺼번에 잠금 단계로 진입하는 바람에 계속해서 자원을 점유했다 내놨다를 반복한다.

### 선점 불가 조건 깨기

- 필요한 자원이 잠겼다면 자원을 소유한 스레드에게 풀어달라고 요청.

### 순환 대기 조건 깨기

- 데드락을 방지하는 가장 흔한 전략

- 모든 스레드가 일정순서에 동의하고 그 순서로만 자원을 할당

- 문제점

  -  자원을 할당하는 순서와 자원을 사용하는 순서가 다를지도 모른다. (= 자원을 필요이상 오랫동안 점유한다)

  -  때로는 순서에 따라 자원을 할당하기 어렵다.



## 다중 스레드 코드 테스트

- 몬테 카를로 테스트
  1. 조율이 가능하게 유연한 테스트 생성
  2. 임의로 값을 조율하면서 반복해서 수행
  3. 테스트 실패시 버그 존재
     - 테스트가 실패한 조건은 신중하게 기록
- 시스템을 배치할 플랫폼 전부에서 테스트 돌림
  - 반복해서 계속 돌림
  - 오래 돌아갈수록 2가지중 하나일 확률
    1. 실제 코드가 올바르다
    2. 테스트가 부족해 문제를 드러내지 못한다.
  - 부하가 변하는 장비에서 테스트 진행
    - 실제 환경과 비슷하게 부하를 걸어 줄 수 있다면 그렇게 수행
