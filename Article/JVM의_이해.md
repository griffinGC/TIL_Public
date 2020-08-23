# JVM 설계의 이해 [번역 및 요약]

- 자바 생태계를 효과적으로 사용하기 위해서 JVM 설계와 그 아래에서 어떻게 자바가 동작하는지 이해하는 것은 모든 자바 개발자들에게 매우 중요한 배움이다. 이 블로그 포스트 시리즈는 JVM 내부와 자바 생태계 주변 기술들에 대한 토대를 제공해 줄 것이다.



## 배경

1995년 Sun Microsystems에서 JamesGosling에 의해 설계된 자바는 수백만명의 개발자들에게 사랑받는 멀티 패러다임 프로그래밍 언어(i.e 클래스기반 객체지향, 구조적, 명령형, generic, reflective, concurrent)이다. 어떤 랭킹에서든, 자바는 지난 15년 동안 가장 인기있는 언어가 되었다. 15년 동안 수백개의 상업용 어플리케이션이 대부분 자바로 작성되었다. 자바는 상업적인 소프트웨어 개발을 위한 언어로 선택되었다.

자바 내부, 성능 프로파일링, 서버 튜닝, 많은 흥미로운 주제들과 관련된 블로그 포스트들을 작성할 계획이다. 자바 기초부터 시작해 보자!



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



## 2) 런타임 데이터 지역

- Runtime Data Area는 OS에서 JVM 프로그램이 실행될때 할당되는 메모리 지역

- `.class` 파일을 읽기 위해, 클래스 로더 하위시스템은 적절한 binary 데이터를 만들고, 각 클래스에 대해 별도로 메소드 지역에 아래의 정보를 저장함

  - 로딩된클래스와 직접적인 상위 클래스의 정규화된 이름

  - `.class` 파일이 Class/Interface/Enum 와 관련되어 있는지 여부
  - Modifier, static 변수, 메소드 정보 등등

- 모든 각각의 로딩된 `.class` 파일들은 Heap 메모리에 파일을 나타내기 위해 정확히 한개의 객체만 생성됨

  - 생성된 클래스 객체는 클래스 레벨 정보를 읽는데 사용될 수 있음

-  메소드와 힙 지역은 여러 스레드에 대해 메모리를 공유하기 때문에, **메소드 지역과 힙 지역에 저장되는 데이터는 thread safe 하지 않음**

### 2.1) 메소드 지역 (스레드간에 공유되는 지역)

- JVM 당 한개만 가지고 있는 공유 자원
- 모든 JVM 스레드는 같은 Method area를 공유
  - **Method 데이터에 접근하는 것과 dynamic linking 과정은 thread safe 해야 함**
- Method area는 **class level data (static 변수 포함)** 저장
  - Classloader 참조
  - Runtime 상수 pool
  - Field 데이터
  - Method 데이터
  - Method 코드

### 2.2) 힙 지역 (스레드간에 공유되는 지역)

****

- JVM 당 한개만 가지고 있는 공유 자원
- **모든 객체의 정보 와 그에 해당하는 인스턴스 변수와 배열**들을 저장하는 공간
- 

