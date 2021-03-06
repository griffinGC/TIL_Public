# [번역] 분산 시스템의 8가지 잘못된 통념의 이해

분산 시스템에서 일하는가? 만약 마이크로서비스 웹 APIs, SOA, 웹서버, 어플리케이션 서버, 데이터베이스 서버, 캐시 서버, 로드 밸런서 같은 컴포넌트들을 시스템 설계에서 사용한다면, 대답은 '예' 이다. 분산 시스템은 공통의 목표를 달성하기 위해 합쳐진 많은 컴퓨터들로 구성된다.



20년도 더 전에 Peter Deutsch 와 James Gosling은 분산 컴퓨팅의 8가지 오류를 정의 했다. 이러한 것들은 분산 시스템에 관해 많은 개발자들이 잘못 가정한 것들이다. 이러한 것들은 버그들을 수정하는 것을 어렵게 만들면서, 긴 시간을 통해 일반적으로 잘못된 것으로 증명되었다.

8가지 오류는 아래와 같다.

1. 네트워크는 신뢰할 수 있다.
2. 지연은 없다.
3. 대역폭 (데이터 전송 능력)은 무한하다.
4. 네트워크는 안전하다.
5. Topology는 변하지 않는다.
6. 한명의 관리자가 있다.
7. 전송비용은 없다.
8. 네트워크는 동일하다.

각각의 오류를 통해 문제들과 잠재적인 해결방법에 대해 말해보자.

## 1. 네트워크는 신뢰할 수 있다.

### 문제

**네트워크를 통한 호출은 실패할 것이다.**

오늘날 대다수의 시스템들은 다른 시스템들을 호출한다. 3rd party system(결제 게이트웨이, 회계 시스템, CRMs)들과 통합하나? 웹 서비스 콜을 하는가? 호출이 실패하면 무슨일이 발생하는가? 만약 데이터를 쿼리한다면, 간단한 재시도만 하면 된다. 그러나 만약 너가 명령어를 전송한다면 무슨일이 발생하겠는가? 간단한 예제를 살펴보자.

```java
var creditCardProcessor = new CreditCardPaymentService();
creditCardProcessor.Charge(chargeRequest);
```

만약 우리가 HTTP 시간 초과 예외를 받는다면 어떤 일이 발생하는가? 만약 서버가 요청을 수행하지 못한다면, 우리는 다시 시도할 것이다. 그러나 요청을 처리 했다면, 우리는 고객들에게 2번 책임을 묻지 않는다는 것을 확실히 할 필요가 있다. 너는 서버를 idempotent(몇번을 수행해도 값이 변하지 않게) 하게 함으로써 이렇게 할 수 있다. 이것은 만약 너가 같은 책임 요청에 대해 10번 호출한다면, 고객은 오직 한번만 책임을 물게 될 것이다. 만약 너가 적절히 이러한 에러들을 처리하지 않는다면, 너의 시스템 비결정적인 것이다. 이러한 경우들을 처리하는 것은 정말 빨리 복잡해 질 수 있다.

### 해법

만약 네트워크를 통한 호출이 실패한다면, 우리는 무엇을 할 수 있을까? 우리는 자동적으로 재시도하도록 할 수 있을 것이다. 큐잉 시스템은 이러한 상황에 매우 좋다. 큐잉 시스템은 보통 store and forward 라고 불리는 패턴을 사용한다. 수신자에게 메세지를 전달하기 전에, 로컬에 메시지를 저장한다. 만약, 수신자가 오프라인이라면, 큐잉 시스템은 메세지 전송을 재시도 한다. [MSMQ](http://www.simpleorientedarchitecture.com/msmq-basics/) 가 이러한 큐잉 시스템의 예제이다.

그러나 이러한 변경은 너의 시스템의 설계에 큰 영향을 끼칠 것이다. 너가 request/response 모델에서 fire and forget으로 변경하는 것이다. 너는 응답을 더 이상 기다리지 않기 때문에, 너의 시스템을 통해 사용자의 이동경로들을 변경해야 한다. 너는 단지 각각의 웹서비스 호출을 큐 전송으로 변경할 수 없다.

### 결론

너는 아마 요새 네트워크들은 신뢰할 수 있다고 말할지도 모른다. 그리고 그것들은 그렇다. 그러나 일은 일어난다. 하드웨어와 소프트웨어는 전원 공급, 라우터, 업데이트 실패, 약한 무선 신호, 네트워크 혼잡, 설치류, 상어 등에 고장 날 수 있다. 맞다, 상어 : [Google is reinforcing undersea data cables with Kevlar after a series of shark bites](https://www.theguardian.com/technology/2014/aug/14/google-undersea-fibre-optic-cables-shark-attacks).

그리고 거기에도 사람들의 측면도 있다. 사람들은 DDOS 공격을 시작하거나 물리적인 장비들을 파괴할 수 있다.

이것이 너가 현재 기술 스택을 버리고 메시징 시스템을 사용해야 한다는 것을 의미할까? 아니다! 너는 너가 해야하는 투자로 가질 실패의 리스크를 저울질 할 필요가 있다. 너는 인프라와 스프트웨어에 투자 함으로써 실패의 기회를 최소화 할 수 있다. 많은 경우에, 실패는 선택사항이다. 그러나 분산시스템을 설계할때 너는 실패를 고려할 필요가 있다.



## 2. 지연은 없다.

### 문제

**네트워크에 대한 호출은 즉각적인 것이 아니다.**

인터넷을 통한 메모리 호출과 호출 사이에는 7배의 차이가 있다. 너의 어플리케이션은 네트워크의 존재를 알아야만 한다. 이것은 너가 원격 호출로부터 지역 호출을 명확하게 분리해야 하는 것을 의미한다. 예제를 살펴보자

```javascript
var viewModel = new ViewModel();
var documents = new DocumentsCollection();
foreach (var document in documents)
{
  var snapshot = document.GetSnapshot();
  viewModel.Add(snapshot);
}
```

자세히 보지 않으면, 괜찮아 보인다. 그러나, 여기에는 2개의 원격 호출이 있다. 2번째 줄은 문서 요약들의 목록을 가져오기 위해서 한번 호출 한다. 5번째 줄에서 각각의 문서들에 대해 많은 정보를 가져오기 위해 다른 호출을 한다. 이건 고전적인 [Select n+1 problem](https://stackoverflow.com/questions/97197/what-is-n1-select-query-issue) 이다. 네트워크 지연을 고려하려면, 너는 한번 호출할때, 모든 요구되는 데이터를 리턴해야만 한다. 일반적인으로 지역 호출은 미세하게 세분화 될 수 있지만, 원격 호출은 더 크게 세분화 되어야 한다. 이게 분산 객체와 "network transparency"가 죽은 이유이다. 그러나 모두가 분산 객체가 안좋은 생각이라는 것에 동의 함에도 불구하고, 몇몇 사람들은 아직까지 lazy loading 이 항상 좋은 생각이라고 생각한다.

```javascript
var employee = EmployeeRepository.GetBy(someCriteria)
 
var department = employee.Department;
var manager = department.Manager;
 
foreach (var peer in manager.Employees;)
{
    // do something
}
```

너는 네트워크 호출을 하는 더 괜찮은 getter를 생각 할 수 없을 것이다. 그러나, 위의 코드에서 각각의 "." 호출은 데이터베이스의 이동에 방아쇠를 당길 수 있다.

### 해법

#### 너가 필요로 하는 모든 데이터를 가져와라

만약 너가 원격 호출을 한다면, **너가 필요로 하는 모든 데이터를 가져오는 것**을 확실히 해라.

네트워크 커뮤니케이션은 수다스러워서는 안된다.

#### 데이터를 클라이언트들에게 더 가까이 옮겨라

다른 가능한 해법은 **데이터를 클라이언트들에게 더 가까이 옮기는 것**이다. 만약 너가 클라우드를 사용한다면, 너의 클라이언트의 위치를 고려하여, 가능한 지역을 신중하게 골라라. 캐싱 역시 네트워크 호출의 숫자를 최소화 하는데 도움을 줄 수 있다. 정적 컨텐츠에 대해, CDNs는 다른 좋은 선택이다.

#### 데이터의 흐름을 뒤집어라

원격 호출을 없애는 다른 선택은 **데이터의 흐름을 뒤집는 것**이다. 다른 서비스를 쿼링하는 것 대신에, 우리는 Pub/Sub을 사용하고, 데이터를 지역적으로 저장할 수 있다. 이 방식에서, 우리는 우리가 이것을 필요로 할때 데이터를 가질 것이다. 당연히, 약간의 복잡함을 가져오지만, 이것은 툴박스에서 매우 좋은 툴이 될 수 있다.

### 결론

지연은 LANs 에서는 문제가 아닐 수도 있지만, WANs 혹은 인터넷으로 넘어간다면, 지연이 발생하는 것을 알 수 있다. 이것이 메모리 호출로부터 네트워크 호출이 명확하게 분리되어야 하는지 중요한 이유이다. 너는 마이크로서비스 아키텍쳐 패턴을 적용할때 이것을 반드시 마음속에 염두하여야 한다. 너는 그냥 지역 호출을 원격 호출로 변경해서는 안된다. 이것은 너의 시스템을 거대한 진흙 덩어리로 변하게 할 것이다.



## 3. 대역폭 (데이터 전송 능력)은 무한하다.

### 문제

**대역폭은 한정되어 있다.**

대역폭은 시간당 데이터를 전송하는 네트워크의 능력이다. 아직까지 문제가 될 만한 것을 찾지 못했다. 하지만 이게 왜 어떤 조건에서 문제가 될 수 있는지 알 수 있다. 시간이 지남에 따라 대역폭이 발전했음에도 불구하고, 우리가 전송하는 데이터의 양 역시 증가하였다. 비디오 스트리밍이나 VoIP는 네트워크를 통해 간단한 DTO들을 전송하는 앱보다 많은 대역폭을 필요로 할 것 이다. 심지어 대역폭은 모바일앱에서 더 중요하다. 그래서 개발자들은 백엔드 API를 설계할때 이것들에 대해 고려해야 한다.

ORM을 부적절하게 사용하는 것 역시 상처를 남길 수 있다. 나는  개발자들이 `.ToList()` 를 쿼리에서 너무 일찍 호출하여 결국 메모리에 전체 테이블을 로딩하는 사례를 본 적 있다.

### 해법

#### 도메인 주도 설계 패턴

그래서 우리가 어떻게 너무 많은 데이터를 가져오지 않도록 할 수 있을까? Domain-Driven Design 패턴이 도움이 될 수 있다.

- 첫째, 너는 단일 엔터프라이즈급 도메인 모델을 위해 노력해서는 안된다. 너의 도메인을 경계된 컨텍스트로 분할해야 한다.
- 경계된 컨텍스트 내부에서 크고 복잡한 객체 객체 그래프를 피하기 위해서는, 너는 [Aggregate](https://martinfowler.com/bliki/DDD_Aggregate.html) 패턴을 이용할 수 있다. Aggregate는 일관성을 보장하고 트랜잭션 경계를 정의한다.

#### 명령어와 쿼리 책임 분리

우리는 가끔 스크린에 복잡한 객체 그래프의 일부를 보여줘야 하기 때문에 그것들을 로딩한다. 만약 우리가 많은 부분에서 이렇게 한다면, 우리는 결국 읽고 쓰는것 모두에 대해 가장 적합한 거대하고 복잡한 모델을 갖게 된다. 다른 접근 방식은 **CQRS** 이다. 이것은 2가지에서 도메인 모델을 분리하는 것을 의미한다.

- **write model** 은 불변성과 데이터가 일관 되게 보장한다. 쓰기모델은 보이는 부분에 대해서는 신경쓰지 않기 때문에, 작게 유지하고 집중시킬 수 있다.
- **read model** 은 보이는 부분에 최적화 되어있다. 그래서, 우리는 특정한 뷰에 대해 필요로하는 모든 데이터를 가져올 수 있다. (예를 들어, 앱의 스크린)

### 결론

3번째 오류와 2번째 오류 사이에는 갈등이 있다. 너는 네트워크 통신 횟수를 최소화 하기 위해 많은 데이터를 전송해야 한다. 너는 대역폭의 사용을 최소화 하기 위해 데이터를 적게 보내야 한다. 너는 이러한 2가지 사이에서 균형을 유지하고 전선을 통해 전송하기 위한 올바른 양의 데이터를 찾아야할 필요가 있다.

너가 대역폭의 한계를 자주 도달하지 않을 지라도, 너가 전송하는 데이터에 관해서 고려하는 것은 매우 중요하다. 적은 데이터는 이해하기 쉽다. 적은 데이터는 적은 커플링을 의미한다. 그래서 오직 너가 필요로 하는 만큼의 데이터만 전송해라.



## 4. 네트워크는 안전하다.

### 문제

**네트워크는 안전하지 않다.**

이것은 다른 것들 보다 많은 미디어 영향을 받는다는 가정이다. 시스템은 가장 약한 링크만큼 안전하다. 안좋은 소식은 분산 시스템에는 많은 링크가 있다는 것이다. HTTPS를 지원하지 않는 3rd party 레거시 시스템과 통신할때를 제외 하고는 HTTPS를 사용한다. 너는 보안 이슈를 찾아 너의 코드를 다시 살펴본다. 그러나 사용하는 오픈소스 라이브러리가 위험요소 일 수 있다.  [OpenSSL vulnerability](http://heartbleed.com/) 은 사람들이 SSL/TLS로 보호된 데이터를 훔치는 것을 가능하게 해준다.  [bug in Apache Struts](https://thehackernews.com/2017/03/apache-struts-framework.html) 는 공격하는 사람들이 서버에서 코드를 수행할 수 있도록 해준다. 너가 저런것들로부터 모두 보호할지라도, 아직 인간의  요인이 남아있다. 악의 있는 DBA는 데이터 베이스 백업을 "misplace" 할 수 있다. 오늘날의 공격하는 사람들은 많은 참을성과 컴퓨팅 파워를 가지고 있다. 그래서 문제는 그들이 너의 시스템을 공격하는 것이 아니라 언제 공격할지에 관한 것이다.

### 해법

#### 깊은 방어막

너의 시스템을 보호하기 위해서는 계층화된 접근방식을 사용해야 한다. 네트워크, 인프라, 어플리케이션 레벨에서 다른 보안 확인을 필요로 한다.

#### 보안 마인드셋

시스템을 설계할때 보안을 기억해야 한다. [The top ten vulnerabilities](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project) list [has not changed that much in the last 5 years](http://resources.infosecinstitute.com/owasp-2017-top-10-vs-2013-top-10).  보안 소프트웨어 설계와 일반적인 보함 결함에 대해 코드를 리뷰를 위해 모범 사례를 따라야 한다. 정기적으로 3rd party 라이브러리에 대한 새로운 취약점들을 검색해야 한다. The list of [Common Vulnerabilities and Exposures](https://cve.mitre.org/index.html) 가 도움이 될 수 있다.

#### 위협적인 모델링

Threat modeling은 시스템에서 가능한 보안 위협을 확인하는 시스템적 접근이다. 첫째로, 너의 시스템에서 모든 자산 (데이터 베이스, 파일등 사용자 데이터) 과 자산에 접근하는 방법을 식별한다. 그 다음, 가능한 공격을 식별하고 그것들을 실행한다. Threat Modeling에 대한 좋은 오버뷰인  [Advanced API Security](http://www.simpleorientedarchitecture.com/book-review-advanced-api-security/) 의 Chapter2를 읽는 것을 추천한다.

### 결론

[오직 안전한 시스템은 전원을꺼서, 어떤 네트워크에도 연결이 안되는 것이다. (and ideally cast in a block of concrete)](https://en.wikiquote.org/wiki/Gene_Spafford). 얼마나 유용한 시스템인가!  사실은 보안은 매우 어렵고 비용이 많이든다. 분산 시스템에는 많은 구성요소와 링크가 있으며, 각 구성요소는 악의적인 사용자에게 타겟이 될 수 있다. 비지니스는 위험요소와 확률을 예방 메커니즘 구현 비용과 균형을 맞출 필요가 있다.

공격자들은 인내심과 컴퓨팅 파워가 많다. Threat modeling 을 사용하여 특정 유형의 공격을 예방할 수는 있지만 100% 보안을 보장할 수는 없다. 따라서 이를 비즈니스에 명확히 하고, 보안에 얼마를 투자할 것인지를 함께 결정하고, 보안 위반이 언제 일어날지에 대한 계획을 세우는 것이 좋다.



## 5. Topology는 변하지 않는다.

### 문제

**네트워크 Topology는 계속 변화한다.**

네트워크 토폴로지는 항상 변화한다. 가끔 우연한 이유로 변경된다. 앱 서버가 다운되고 이것을 바꿔야 할때 변경된다. 새로운 서버에 프로세스를 추가하는 것은 여러번 의도적이다. 요새는 클라우드와 컨테이너가 떠오르면서, 이것이 더 눈에 뜨니다. 작업량에 따라 서버를 추가하거나 삭제하는 능력인 Elastic scaling은 네트워크의 일정 수준을 필요로 한다.

### 해법

#### 네트워크의 물리적 구조 추상화

가장 먼저 해야 할 것은 네트워크의 물리적 구조를 추상화 시키는 것이다. 너가 할 수 있는 몇가지 방법이 있다.

- IP를 하드코딩 하지 마라
  - hostname을 선호해야 한다. URI를 사용함으로써 IP에 대한 hostname을 해결하기 위해 우리는 DNS에 의존한다.
- [DNS 가 충분하지 않다면](http://progrium.com/blog/2014/07/29/understanding-modern-service-discovery-with-docker/) discovery service를 사용해라
- 서비스 버스 프레임워크 역시 지역 투명성을 제공할 수 있다.

#### 애완동물이 아닌 소떼

서버를 [애완동물이 아닌 소떼](http://cloudscaling.com/blog/cloud-computing/the-history-of-pets-vs-cattle/) 처럼 다룸으로써, 너는 어떠한 서버도 대체할 수 없는 건 없다는 것을 확실히 할 수 있다. 이런 작은 지혜는 너가 올바른 마인드셋을 가질 수 있도록 해준다. 어떤 서버든 실패할 수 있다.(따라서 topology를 변경한다.), 그래서 너가 할 수 있는한 많은 것을 자동화 해야한다.

#### 테스트

마지막 조언은 너의 가정을 시험하는 것이다. 서비스를 중지하거나 서버를 종료하고 시스템이 계속 올라가서 작동중인지 확인해라. 넷플릭스의 Chaos Monkey 같은 툴은 프로덕션 환경에서 VM이나 컨테이너를 무작위로 차단함으로써 이것을 한단계 끌어 올린다. 고통을 앞으로 끌어내면서, topology 변화를 처리할 수 있는 더 탄력적인 시스템을 만들기 위한 동기 부여가 된다.

### 결론

10년 전에, 대부분의 topology는 자주 변하지 않았다. 그러나 그렇게 되었을때, 아마도 프로덕션에서 발생하였을 것이고 약간의 다운타임을 가져왔을 것이다. 클라우드와 컨테이너가 떠오르는 요즘은 이러한 오류를 무시하기 힘들다. 너는 실패에 대비하고 테스트 해야 한다. 프로덕션에서 이러한 일이 발생하기를 기다리지 마라!



## 6. 한명의 관리자가 있다.

### 문제

**모든 것을 아는 사람은 없다.**

음, 이건 분명해 보인다. 당연히 모든 것을 아는 사람은 없다. 이게 문제인가? 어플리케이션이 순조롭게 동작하는한은 문제 없지만, 그렇지 않다. 하지만 무엇인가 잘못된다면, 고쳐야 한다. 많은 사람들이 앱을 만졌기 때문에, 문제를 해결할 방법을 아는 사람은 없을 수도 있다.

거기에는 잘 못 될 수 있는 것들이 많다. 한 가지 예는 설정이다. 오늘날 어플리케이션은 구성파일, 환경 변수, 데이터베이스, 명령줄 인수 등 설정을 여러 저장소에 저장한다. 모든 가능한 설정 값의 영향을 아는 사람은 없다.

다른 잘못 될 수 있는 것은 시스템 업그레이드 이다. 분산 어플리케이션은 많은 이동하는 부분들이 있고, 동기화 되어있는지 확인해야 한다. 예를 들어, 데이터베이스의 현재 버전과 동작하는 코드의 현재 버전과 동작을 하는지 확인해야 한다. 요즘은 DevOps와 Continuous Delivery에 초점을 맞추고 있다. 그러나 제로 다운타임 개발을 지원하는 것은 쉬운일이 아니다.

그러나 최소한 이런것들은 너의 통제하에 있다. 많은 앱들이 3rd party system과 상호작용을 한다. 이것은 만약 그것들이 다운되면, 너가 할 수 있는 일이 많지 않다는 것을 의미한다. 그래서 너가 시스템에 한명의 관리자를 가지고 있을지라도, 너는 여전히 3rd party system을 통제 할 수 없다.

### 해법

#### 모두가 릴리즈 절차에 대해 책임을 가져야만 한다.

이것은 처음부터 Ops 사용자 혹은 시스템 관리자를 포함하는 것을 의미한다. 이상적으로, 그들은 팀의 일원이 될 것이다. 시스템 관리자에게 진행 상황을 일찍 알리는 것은 제약 조건을 파악하는 데 도움이 될 수 있다. 예를 들어, 프로덕션 환경은 개발 환경과는 다른 설정, 보안 제한, 방화벽 규칙 혹은 사용 가능한 포트를 가질 수 있다.

#### 로깅 및 모니터링

시스템 관리자는 오류 보고 및 문제 관리를 위한 적절한 도구를 가져야 한다. 너는 처음부터 모니터링을 생각해야 한다. 분산 시스템은 중앙집중화된 로깅을 해야한다. 문제를 조사하기 위해 10개의 다른 서버의 로그에 접근하는 것은 허용되는 접근방식이 아니다.

#### 디커플링

시스템 업그레이드 동안 다운타임을 최소로 줄이도록 노력해야 한다. 이것은 시스템의 다른 부분을 독립적으로 업그레이드할 수 있어야 한다는 것을 의미한다. 뒤에서 구성요소를 호환하도록 함으로써, 서버와 클라이언트를 다른 시간에 업데이트할 수 있다.

컴포넌트 사이에 큐를 배치함으로써, 이들을 일시적으로 분리할 수 있습니다. 예를 들어, 웹 서버는 백엔드가 다운되어도 요청을 여전히 받아들일 수 있다는 것을 의미한다.

#### 3rd party dependency 격리

통제 불능의 시스템을 소유한 구성 요소와 다르게 취급해야 한다. 이것은 당신의 시스템을 3rd party 실패에 대해 더 탄력적으로 만든다는 것을 의미한다. 추상화 레이어를 도입하여 외부 종속성의 영향을 줄일 수 있다. 이것은 3rd party system이 실패할때,  버그를 찾을 곳이 줄어들게 된다는 뜻이다.

### 결론

이 오류를 해결하기 위해서, 시스템을 관리하기 쉽게 만들어야 한다. DevOps, logging 과 monitoring은 도움을 줄 수 있다. 또한 시스템의 업그레이드 절차에 대해서 생각해 봐야 한다. 만약 업그레이드가 몇시간의 다운타임을 요구한다면, 각 스프린트마다 배포 할 수 없다. 관리자가 없으므로, 모두가 릴리즈 절차에 책임을 져야 한다.



## 7. 전송비용은 없다.

### 문제

**전송비용은 0이 아니다.**

이 오류는 2번째 오류와 연관있다. 네트워크를 통해 무엇을 운반하는 것은 시간과 자원에서 비용이 있다. 2번째 오류가 시간의 관점에서 얘기했다면, 7번째 오류는 자원의 소비를 이야기한다.

이 오류에는 2가지 측면이 있다.

#### 네트워크 인프라의 비용

네트워크 인프라에는 비용이 든다. 서버, SANs, 네트워크 스위치, 로드 밸런 이러한 것들을 관리하는 사람들, 이러한 모든 것들이 비용이다. 만약 너의 시스템이 온프레미스 방식으로 배포된다면, 너는 이것의 가격을 선불로 지불한다. 만약 너가 클라우드를 사용한다면, 너가 사용한 것만 지불하지만, 너는 여전히 그것의 비용을 지불하는 중이다.

#### serialization/deserialization의 비용

이 오류의 2번째 측면은 전송 레벨과 어플리케이션 레벨 사이의 데이터 전송 비용이다. Serializtion과 deserialization은 CPU 시간을 사용한다. 그래서 돈이 든다. 만약 너의 앱이 온프레미스로 배치되면, 리소스 소비를 소비를 적극적으로 모니터링하지 않으면 이러한 비용은 다소 감춰진다. 그러나 너의 앱이 클라우에서 배포된다면, 비용은 고통스러울정도로 눈에 보인다. 너가 사용한 것에 대해 지불하기 때문이다.

### 해법

인프라 비용에 대해서 너가 할 수 있는 것은 많이 없다. 최대한 효율적으로 사용하고 있는지 확인하는 것 뿐이다. SOAP나 XML은 JSON보다 더 비용이 많이 든다. JSON은 Google's Protocol Buffer 같은 이진 프로토콜 보다 비싸다. 시스템의 타입에 따라, 이것은 더 중요하거나 덜 중요할 수 있다. 예를 들어, 비디오 스트리밍이나 VoIP와 관련있는 앱은 전송비용이 더 중요하다.

### 결론

너는 앱이 실행되는 동안 얼마나 많은 serialization과 deserialization을 하고 있는지와 운송 비용에 주의 해야 한다. 이것은 너가 필요한 것이 아니라면, 최적화를 해야한다는 것을 의미하지는 않는다. 너는 리소스 소비를 모니터링하고 너에게 전송 비용이 문제 있는지 결정해야 한다.



## 8. 네트워크는 동일하다.

### 문제

**네트워크는 동일하지 않다.**

동일한 네트워크는 같은 커뮤니케이션 프로토콜을 사용하고 유사한 설정을 사용하는 컴퓨터의 네트워크이다. 유사한 설정을 가진 컴퓨터는 업무를 달성하기 힘들다. 예를 들어, 모바일 장치가 너의 앱에 연결할 수 있는 것에 대한 제어 권한이 거의 없다. 이것이 표준 프로토콜에 집중하는 것이 중요한 이유이다.

### 해법

너는 vendor lock을 피하기 위해서는 표준 포맷을 사용해야 한다. 이것은 XML, JSON, Protocol Buffer를 의미할 수 있다. 많은 선택지가 있다.

### 결론

시스템의 구성요소가 서로 이야기를 나눌 수 있도록 해야 한다. 독점적인 프로토콜 사용 앱의 상호운용성이 손상 될 수 있다.



## 분산 시스템을 설계하는것은 어렵다.

이러한 오류들은 20년전에 나왔다. 하지만 오늘날에도 여전히 옳다. 그것들 중 몇개는 다른 것들보 더 옳다. 나는 오늘날 많은 개발자들이 이것들에 대해 알지만, 우리가 작성하는 코드는 보여주지 못한다고 생각한다. 

우리는 이것들을 사실로써 받아들어야 한다. 네트워크는 신뢰할 수 없고, 보안에 취약하며, 돈이 많이 든다. 대역폭은 제한적이다. 네트워크의 topology는 변화한다. 구성요소가 같은 방식으로 설정되지 않는다. 이러한 한계들을 인식하는 것은 우리가 더 나은 분산 시스템 설계를 하는데 도와준다. 

분산 컴퓨팅의 8가지 오류에 대해서 더 알고 싶다면 아래 리소스들을 확인해라.

- [Advanced Distributed Systems Design](https://particular.net/adsd) course by Udi Dahan
- [Dr. Harvey and the 8 Fallacies of Distributed Computing](https://www.amazon.com/Dr-Harvey-Fallacies-Distributed-Computing/dp/1367251796) by David Boike
- [Fallacies of Distributed Computing Explained](http://www.rgoarchitects.com/Files/fallacies.pdf) by Arnon Rotem-Gal-Oz
- [The Web vs. the Fallacies](http://www.tbray.org/ongoing/When/200x/2009/05/25/HTTP-and-the-Fallacies-of-Distributed-Computing)
