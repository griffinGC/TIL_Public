# [요약] JVM 설계의 이해 

> https://medium.com/platform-engineer/understanding-jvm-architecture-22c0ddf09722





## 자바 환경

자바는 아래와 같은 2가지 환경을 가지고 있다. 자바를 사용하는 모든사람은 이러한 환경중 한가지를 로컬 혹은 프로덕션 플랫폼 환경에서 구성한 이후에 작업을 시작해야 한다.

- **JRE (Java Runtime Environment)** 
  - 자바 어플리케이션을 수행하기 위한 최소한의 필수 환경 (개발을 위한 것이 아님)
  -  JVM (Java Virtual Machine) 과 개발 툴
- **JDK (Java Development Kit)**
  - 자바 어플리케이션 개발과 실행을 위한 완벽한 개발 환경
  - JRE와 개발 툴 포함
- JRE는 사용자들을 위한 것인 반면에 JDK는 프로그래머들을 위한 것



## JVM 구조

![jre_picture](https://miro.medium.com/max/643/0*GMXQBZCEpGQMBjy-)

### 1) 클래스 로더 하위시스템

- JVM은 RAM에 존재함
- Dynamic class loading
  - Class loader subsystem을 이용하여 실행하느느 동안 클래스 파일들이 RAM으로 올라오게 되는 것
  - 최초 런타임에 클래스파일(.class)파일을 로드하고, 링크하고, 초기화 함

#### 1.1) Loading

- 클래스 로더의 주 업무는 컴파일된 파일들을 메모리에 적재하는 것

  - 클래스 로딩 프로세스는 메인 클래스 로딩할때 시작
  - 이후 클래스 로딩은 이미 실행되는 클래스에서 클래스 참조에 따라 실행된다.
    - 바이트코드가 클래스에 static refernece를 만들때 (`System.out`)
    - 바이트코드가 클래스 객체를 만들때 (`Person person = new Person("John")`)

- 4가지의 원칙과 3가지 유형의 클래스 로더가 존재함

#### 1.1.1) Visibility Principle

  - 자식 클래스 로더는 부모 클래스 로더에 의해 로딩된 클래스를 볼 수 있음
  - 부모 클래스 로더는 자식 클래스 로더에 의해 로딩된 클래스를 알 수 없음

#### 1.1.2) Uniqueness Principle

  - 부모에 의해 로딩된 클래스는 다시 자식 클래스 로더에 의해 로딩될 수 없음
  - 클래스 로딩 복사가 발생하지 않아야 함

#### 1.1.3) Delegation Hierarchy Principle

  - JVM은 각각의 클래스 로딩 요청에 대해 클래스 로더를 선택하기 위한 위임계층을 따름

    1. 가장 낮은 자식 레벨에서 시작해서, Application Class Loader는 받은 클래스 로딩 요청을 Extension Class Loader에게 위임하고, Extension Class Loader는 요청을 Bootstrap Class Loader에게 위임

    2. 만약 요청된 클래스를 Bootstrap 경로에서 찾으면 클래스는 로드 됨, 

    3. 그렇지 않다면 Extension path 혹은 custom-specified path에서 클래스를 찾기 위해 요청이 다시 Extension Class Loader로 되돌아 감. 

    4. Extension Class Loader 실패시, 시스템 클래스 경로에서 클래스를 찾기 위해 요청은 Application Class Loader로 돌아감

    5. Application Class Loader 실패 시, run time exception 발생
       - `java.lang.ClassNotFoundException`

  #### 1.1.4) No Unloading Principle

  - 클래스 로더가 클래스를 불러오더라도, 클래스 로더는 로딩된 클래스를 다시 내릴수는 없음
  - Unloading 대신, 현재 클래스 로더는 삭제되고, 새로운 클래스 로더가 생성됨

  ![classLoaderImage](https://miro.medium.com/max/640/0*MCf4PciEbMGwOL6L)

  - **BootStrap Class Loader**
    - bootstrap경로에 존재하는 핵심 Java API 클래스 같은 rt.jar로 부터 표준 JDK 클래스를 올림
    - `$JAVA_HOME/jre/lib` 
    - C / C++ 같은 native 언어로 작성되어 있음
    - 자바의 모든 클래스 로더의 부모역할
  - **Extension Class Loader**
    - 클래스 로딩 요청을 부모(Bootstrap Class Loader)로 위임
    - 실패시, Extension 디렉토리로 부터 클래스 로딩
    - `$JAVA_HOME/jre/lib/ext`
    - Java로 구현되어 있음
  - **System/Applicatio Class Loader**
    - 시스템 클래스 경로로 부터 특정 클래스를 로딩
    - 내부적으로 `java.class.path`와 맵핑된 환경 변수를 사용
    - java로 구현되어 있음

- 3가지 클래스 로더 말고 프로그래머가 직접 Class Loader 생성 가능

  - Tomcat 같은 웹 어플리케이션 서버에서 독립적으로 동작하도록 만들때 사용됨

- 각각의 클래스 로더는 **namespace**를 가지고 거기에 로딩된 클래스를 저장
- 클래스 로더가 클래스를 로딩할때 **FQCN (Fully Qualified Class Name)** 기반으로 클래스 검색
  
  - 만약, 클래스가 같은 FQCN을 가지더라도 namespace가 다르면 다른 클래스로 취급

### 1.2) Linking

- Linking은 로딩된 클래스나 인터페이스, 직접적인 상위 클래스 혹은 상위 인터페이스, 원소 타입을 필요에 따라 검증하고 준비하는 역할 수행함과 동시에 아래의 속성을 따르는 것을 포함함
  - 링크 되기전에 완벽히 로딩되어야 하는 클래스 혹은 인터페이스
  -  다음 단계로 초기화 되기 전에 완벽히 검증하고 준비되어야 하는 클래스 혹은 인터페이스
  - Linking 하는 동안 에러가 발생한다면, 그 시점에 던져저야 한다.

- Linking이 발생하는 3가지 단계
  - Verification
    - 클래스 파일이 올바른지 검증하는 단계
    - 가장 복잡하고 긴 시간이 소요되는 프로세스
    - 실패 시, runtime 에러 발생 (`java.lang.VerifyError`)
  - Preparation
    - static 저장소와 method table 같은 JVM에의해 사용되는 자료구조에 대한 메모리 할당
    - Static field들은 생성되고 기본 값으로 초기화 됨
      - initializer나 코드는 수행되지는 않음
  - Resolution
    - 직접적인 참조를 가진 타입으로 부터 symbolic 참조 대체

### 1.3) Initialization

- 각각의 로딩된 클래스 혹은 인터페이스의 초기화 로직이 수행됨
- Multi-thread 가 된 이후부터는, 클래스 혹은 인터페이스의 초기화는 동시에 같은 클래스나 인터페이스 초기화 하는 것을 피하기 위해 매우 신중하게 동작함



### 2) 런타임 데이터 지역

- Runtime Data Area는 OS에서 JVM 프로그램이 실행될때 할당되는 메모리 지역

- `.class` 파일을 읽기 위해, 클래스 로더 하위시스템은 적절한 binary 데이터를 만들고, 각 클래스에 대해 별도로 메소드 지역에 아래의 정보를 저장함

  - 로딩된클래스와 직접적인 상위 클래스의 정규화된 이름

  - `.class` 파일이 Class/Interface/Enum 와 관련되어 있는지 여부
  - Modifier, static 변수, 메소드 정보 등등

- 모든 각각의 로딩된 `.class` 파일들은 Heap 메모리에 파일을 나타내기 위해 정확히 한개의 객체만 생성됨

  - 생성된 클래스 객체는 클래스 레벨 정보를 읽는데 사용될 수 있음

-  메소드와 힙 지역은 여러 스레드에 대해 메모리를 공유하기 때문에, **메소드 지역과 힙 지역에 저장되는 데이터는 thread safe 하지 않음**

#### 2.1) 메소드 지역 (스레드간 공유)

- JVM 당 한개만 가지고 있는 공유 자원
- 모든 JVM 스레드는 같은 Method area를 공유
  - **Method 데이터에 접근하는 것과 dynamic linking 과정은 thread safe 해야 함**
- Method area는 **class level data (static 변수 포함)** 저장
  - Classloader 참조
  - Runtime 상수 pool
  - Field 데이터
  - Method 데이터
  - Method 코드

#### 2.2) 힙 지역 (스레드간 공유)


- JVM 당 한개만 가지고 있는 공유 자원
- **모든 객체의 정보** 와 **그에 해당하는 인스턴스 변수와 배열들**을 저장하는 공간
- GC (Garbage Collector)에게 좋은 타겟

#### 2.3)  스택 지역 (스레드마다 존재)

- 스택 영역은 함수의 호출과 관계되는 **지역변수**와 **매개변수**가 저장되는 영역

- 각각의 스레드가 시작될때 메소드 요청들을 저장하기 위한 분리된 런타임 스택이 생성됨
- 모든 메소드 요청들에 대해 , 하나의 엔트리가 생성되서 **스택 프레임** 이라고 불리는 것이 런타임 스택의 맨 위에 추가됨
  - 스택 프레임이란 함수의 호출 정보 나타냄
- 스택프레임의 사이즈는 메소드에 따라 정해지게 됨
- 각 스택 프레임에는 실행할 메서드가 속한 클래스의 로컬 변수 배열, 피연산자 스택 및 런타임 상수 풀에 대한 참조가 있음
- 메소드 호출 동안에 메소드가 리턴 되거나 잡지못한 에러가 던져지면 프레임이 삭제됨
- **스택 지역은 thread safe** 

![stackConfiguration](https://miro.medium.com/max/377/0*9GyWqgKUyoo-F2_g)

- 스택 프레임은 3가지 하위 엔티티로 나눠짐

  - **Local Variable Array**
    - 0부터 시작하는 index
      - 얼마나 많은 지역 변수가 관련있는지와 그에 해당하는 값이 저장됨
      - 0은 메소드가 속한 클래스 인스턴스의 참조
    - 1부터는 메소드에 보내진 파라미터가 저장됨
    - 메소드 파라미터뒤에 메소드의 지역변수가 저장 됨
  - **Operand Stack**
    - 요구사항이 있다면 중간연산을 실행하는 런타임 워크스페이스 역할 수행
    - 각각의 메소드는 Operand stack과 Local Variable array 사이에서 데이터를 교환하고 다른 메소드 호출 결과를 넣거나 뺌
    - Operand stack의 사이즈는 컴파일 동안 결정됨

  - **Frame Data**
    - 메소드와 관련된 모든 심볼들이 저장되는 공간
    - 예외에 대한 catch 블럭정보 역시 frame data에 저장 됨

- 스레드가 종료되면, 스택프레임 역시 JVM에 의해 없어짐

- 스레드가 허용된 스택보다 더 큰 스택을 요구하면 StackOverflowError 발생

- 스레드가 새로운 프레임을 요구하거나 충분한 메모리가 없다면 OutOfMemoryError 발생

#### 2.4) PC Registers (스레드마다 존재)

- 각각의 JVM 스레드에 대해, 스레드가 시작되면, 분리된 PC(Program Counter) Register는 현재 실행되는 명령(Method area 에 존재하는 메모리 주소)의 주소를 유지하기 위해 생성됨
- 만약, 현재 메소드가 native라면 PC는 undefined
- 실행이 끝나면, PC register는 다음 명령어의 주소로 업데이트 됨

#### 2.5) 네이티브 메소드 스택 (스레드마다 존재)

- **자바 스레드와 native operating system 스레드 간에 직접적으로 맵핑되는 공간**
- native 스레드가 생성되고 초기화 되면, 자바 스레드에 있는 `run()` 메소드 호출
- 스레드가 종료되면, native 스레드와 자바 스레드에 대한 모든 리소스가 해제됨
- 자바 스레드가 종료되면 native 스레드가 회수됨.
  - 운영체제는 모든 스레드를 스케줄링하고 사용가능한 CPU로 보낼 책임이 있음



### 3) 실행 엔진

- 바이트 코드의 실제 실행이 이루어 지는 곳

#### 3.1) 인터프리터

- 바이트 코드를 해석하고 명령을 하나하나 실행하는 곳

#### 3.2) Just-In-Time (JIT) 컴파일러

- 바이트 코드를 네이티브 코드로 컴파일하고, 반복적인 메소드 콜에 대해 네이티브 코드 제공함으로써 바른 실행 가능하도록 만듬
- 네이티브 코드는 캐시에 저장됨
- 인터프리터가 해석하는것보다 JIT 컴파일러가 컴파일 하는 시간이 더 김
- 한번만 실행되는 코드는 컴파일보다는 interpret 하는게 더 좋음
- adaptive compiling
  - JIT 컴파일러가 내부적으로 각 메소드 콜의 빈도를 확인하고, 일정 수준 이상 발생한 경우에만 컴파일하는것을 결정
- 성능을 향상시키는 4가지 요소
  - Intermediate Code Generator는 intermediate code를 만듬
  - Code Optimizer는 위에서 생성된 intermediate code를 최적화 할 책임이 있음
  - Target Code Generator는 Native Code를 생성하는데 책임이 있음
  - Profiler는 hotspot 같은 성능 병목현상이 일어나는 곳을 찾을 책임이 있음

#### 3.3) 가비지 콜렉터 (GC)

- 객체가 더 이상 참조되지 않고 어플리케이션 코드에서 접근할 수 없을 경우 가비지 콜렉터가 객체를 삭제하고 사용하지 않는 메모리를 회수함
- `System.gc()`



### 4) 자바 네이티브 인터페이스 (JNI)

- JVM이 C/C++ 라이브러리를 호출하고 호출 되도록 하는것을 가능하게 해줌



### 5) 네이티브 메소드 라이브러리

- 엔진 실행에 필요하고 네이티브 인터페이스를 통해 접근할수 있는 C/C++ 네이티브 라이브러리



## JVM 스레드

- **Main thread**
  - `public static void main(String[])`을 호출할때 생성되고 다른 어플리케이션 스레드들을 생성함
- 주요 시스템 스레드
  - Compiler threads
    - 런타임시, 바이트코드를 네이티브 코드로 바꾸는 컴파일 실행
  - GC threads
    - 모든 GC 관련 일 수행
  - Periodic task threads
    - 주기적인 연산의 실행 일정을 잡는 타이머 이벤트 수행
  - Signal dispatcher thread
    - JVM 프로세스로 전송된 시그널을 받고 JVM 내부에서 처리
  - VM thread
    - 일부작업에서는 JVM이 힙 영역에 대한 수정 작업이 더 이상 발생하지 않는 안전한 지점에 도달해야하는데 이러한 작업들을 수행하는 스레드



## 이해를 돕는 몇가지 요점

- 자바는 인터프리터 언어이자 컴파일 언어이다.
- 설계적으로, 자바는 런타임 인터프리팅과 동적 링킹 때문에 느리다.
- JIT 컴파일러는 바이트 코드 대신 네이티브 코드를 사용함으로써 반복되는 연산에 대해 인터프리터가 갖는 단점을 보완한다.
- 최신 자바 버전은 원래 아키텍쳐의 성능 병목 현상을 해결한다.

- JVM은 단지 설명서일 뿐이다. 벤더들이 구현을 통해 자유롭게 커스텀하고,  혁신하고 성능을 향상시킬 수 있다.



## 참고자료

- Understanding JVM Internals (https://www.cubrid.org/blog/understanding-jvm-internals/)

- JVM Internals (https://www.cubrid.org/blog/understanding-jvm-internals/)

- JVM Explained (https://javatutorial.net/jvm-explained)

- The JVM Architecture Explained (https://dzone.com/articles/jvm-architecture-explained)

- How JVM Works — JVM Architecture? (https://www.geeksforgeeks.org/jvm-works-jvm-architecture/)

- Diffrenence between AppClassloader and SystemClassloader (https://stackoverflow.com/questions/34650568/diffrenence-between-appclassloader-and-systemclassloader)

  





























