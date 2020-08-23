# [번역] 아직 자바8을 사용하는가? 이제 업그레이드를 할때가 되었다!

> 원본
>
> https://medium.com/swlh/why-do-people-stick-with-java8-acb95ef65f0c

- 60%가 넘는 자바 개발자들이 아직까지 자바8을 사용한다. 대체 왜? 꼭 업그레이드를 해야하는가?
  - 2014년도 3월 출시



### Facts

자바9이 출시된 2017년으로 돌아가자면, 많은 사람들이 6개월 주기로 새로운 버전이 나오는 출시 사이클과 아키텍쳐의 변화가 개발에 어떤 변화를 가져올지 고민했다. 올해에는 자바 14가 출시 되었다.

2018년에 나온, [2018 JVM ecological survey report](https://snyk.io/blog/jvm-ecosystem-report-2018/) 에 따르면, 70%는 Oracle JDK, 21%는 OpenJDK를 사용했다. 이 가운데 Java8 사용자는 79% 에 달했다.

![2018](https://miro.medium.com/max/1400/1*DdezPEpDhGpNZoSxCNtAug.png)

2019년 보고서에 따르면 Java8은 83%에 이르렀다.

![2019](https://miro.medium.com/max/1400/1*s6yZQWqKOpp7KKy4rQDUMw.png)

개발자들은 자바를 높은 버전으로 업그레이드를 하는것을 꺼리는 것처럼 보인다.

## 왜 Java8 이 이렇게 매력적인가?

Java8의 주요 이점은 새롭거나 이미 존재하는 프로그래밍 문제들을 더 간결하고 손쉽게 기존의 방법을 이용하면서 더 빠르고 중요한 방식으로 더 많은 프로그래밍 툴과 개념들을 제공한다는 것이다.



### Java8의 함수형 프로그래밍

---

#### Java8 이전 방식

함수형 프로그래밍이 없었을 때는, 바구니에서 초록색 사과를 가져오는 함수를 이렇게 작성해야 했다.

```java
public static List filterGreenApples(List inventory){
  List result = new ArrayList<>();
  	for(Apple apple: inventory){
      if("green".equals(apple.getColor())){
        result.add(apple);
      }
    }
  return result;
}
```

50g이 넘는 사과를 필터링 하려고 할때 새로운 메소드를 작성해야 했다.

```java
public static List filterHeavyApples(List inventory){
  List result = new ArrayList<>();
  	for(Apple apple: inventory){
      if(apple.getWeight() > 150){
        result.add(apple);
      }
    }
  return result;
}
```

---

### Java8

```java
public static boolean isGreenApple(Apple apple){
  return "green".equals(apple.getColor());
}
public static boolean isHeavyApple(Apple apple){
  return apple.getWeight() > 150;
}
static List filterApples(List inventory, Predicate p){
  List result = new ArrayList<>();
  for(Apple apple: inventory){
    if(p.test(apple)){
      result.add(apple);	
    }
  }
  return result;
}
filterApples(inventory, Apple::isGreenApple);
filterApples(inventory, Apple::isHeavyApple);
```

더 간단한 방법으로는 아래와 같은 방식이 있습니다.

```java
filterApples(inventory, (Apple a) -> "green".equals(a.getColor()));
filterApples(inventory, (Apple a) -> a.getWeight() > 150);
filterApples(inventory, (Apple a) -> a.getWeight() < 80 || "brown".equals(a.getColor()));
```

**이건 자바 개발자들에게 매우 큰 일 입니다.**

우리는 stream과 Lambda에 대해 이야기를 시작하지 않았습니다.

```java
List<Apple> heavyApples = inventory
  			.stream()
  			.filter((Apple a) -> a.getWeight() > 150)
  			.collect(toList());
```

보시다시피, stream을 이용하면 코드의 양을 매우 많이 줄일 수 있습니다. 또한 코드의 **가독성**을 높이고, concurrent programming(병행 컴퓨팅)의 제어를 가능하도록 만들어 줍니다.

다른 중요한 변화로는 `default method`, `Optional` 등이 있습니다.

> interface의 default method (static method도 가능해짐)
>
> Optional은 NullPointerException의 발생 가능성 있는 코드를 도와줌



## 왜 사람들은 업그레이드를 거부하는가

**Synk**는 왜 사람들이 더 최신 버전으로 변경하지 않는지 설문조사를 하여 3가지의 응답을 받았습니다.

절반 이상(51%)의 사람들은 현재 셋팅이 잘 돌아가고 있다고 말했지만, 32%는 migration 비용이 너무 높고, 30%는 그들의 비지니스를 migrate 할 수 없다고 말했습니다. 27%의 사람들은 이후 버전에서 그들이 필요로하는 기능이 없다고 응답했습니다. 10%만이 명확하게 새로운 버전이 그들의 작업에서 제대로 동작하지 않는다고 말했습니다.

저에게, 가장 솔직한 답변은 ***"업그레이드가 개발 효율성을 높이는데 영향이 없다는 것"*** 이었습니다.



### 이후 버전은 충분히 좋지 않았습니다.

- Java9 Shell : 실제 툴에 영향이 거의 없었고, modularity는 무미한 기능이었습니다.

- Java10 : 지역 변수 타입의 파생 (the derivation of local variable)은 변수의 선언을 위해서만 편리하였습니다.

  > var 도입하여 dynamic type을 지원하는 것이 아닌 컴파일러가 타입을 추론해서 컴파일 해주는 것 (기존의 엄격한 타입선언 방식에서 탈피)

- Java11: **ZGC**(가비지컬렉터)는 매력적인 기능입니다. TB-level의 메모리 능력, 낮은 GC 중단 시간(10ms 미만), 그리고 전체 프로그램의 15%미만으로 지원하기 위해 고안되었습니다. 아쉽게도, 아직도 실험적인 버전입니다.

  > https://meetup.toast.com/posts/171

- Java14 : `switch` 와 `record` 지원

  > [Java 14: All the new features of JDK 14 as it hits GA](https://jaxenter.com/java-14-update-news-163585.html)
  >
  > [Switch](https://openjdk.java.net/jeps/325)
  >
  > [Record](https://jaxenter.com/jep-359-records-161403.html)



JDK 버전이 널리 사용되려면, 개발 효율성 향상(함수형 혹은 stream같은)과 변화를 가져와야 한다. 그래서 이것은 매력적이다. 만약 프로그래머들에게 문제를 가져온다면, 모두가 떠나거나 사용하지 않을 것이다. (everyone will vote with your feet too)

> https://dictionary.cambridge.org/dictionary/english/vote-with-your-feet



### 업그레이드는 어렵다.

Java 8혹은 이전 버전으로 개발된 많은 프로젝트들 때문에, 인프라는 agile과 자동화된 테스팅 지원하기에 충분한 지원이 없고, 컨테이너화 지원이 충분하지 않다. 그리고 다른 소프트웨어 버전의 grayscale을 지원하지 않는다. 일단 업그레이드되면, 많은 test 압박에 직면한다.



### 가장 큰 문제는 dependency 이다.

대부분의 자바 프로젝트는 Spring과 많은 오픈소스 프레임워크에 의존한다. 일단 자바가 업그레이드 되면, 단지 버전을 업데이트 하는 비용을 증가하면서 관련 오픈소스 프레임워크 역시 업그레이드 되어야 한다는 것을 의미한다.

당신은 당신의 코드를 고칠 수 있다. 그러나 만약 라이브러리 혹은 당신이 의존하는 툴이 동작하지 않는다면, 당신이 할 수 있는 것은 없다. 예를 들면 공식적으로 JDK11(2.20.1)을 지원하는 Mockito mocking 프레임워크는 아직 나중 버전을 지원할 준비가 되어있지 않다.

대부분의 프로젝트는 항상 높은 압박에 놓여있다. 인터넷 분야에서, 모든 회사들은 거대한 비지니스 압박에 직면한다. 만약 업그레이드한 버전에서 투자가 너무 크다면, 이건 프로젝트의 모든 절차에 영향을 끼칠 것이다. 그리고 성공하지 못할 것이다.



### Java 업그레이드가 너무 빠르다.

2017년 9월 Java9의 새로운 버전이 시작하면서, Oracle은 매년 3월과 9월, 6개월마다 새로운 버전의 JDK를 출시하고 있다.  출시를 계속하는게 유행이 되면서 과거 3년동안 한번 출간되는 방법에서 더 빠르게 출시되는 방식으로 변하는 것이 합리적이 되었다.

![release](https://miro.medium.com/max/1400/1*AZeZye_H_Xa8I2P7HYgxlQ.png)

또한 이렇게 빠른 출시 리듬은 부정적인 영향을 가져올 수 있다. 예를 들면, 많은 회사들이 6개월 업그레이드 리듬을 따라갈 수 없다.



### 돈

Oracle이 분배에 대해 상업적인 라이센스를 요구하면서 JDK 11은 JDK8과는 다른 방식으로 라이센스 되었다. 이건 매우 복잡한 라이센스 이기 때문에 사람들은 Oracle JDK로 부터 멀어졌다. 매우 피곤한 일이다.

그러나 Oracle 역시 모두가 돈을 기꺼이 돈을 내지 않는 것을 인지했다. 그리고 많은 사람들이 오픈소스 방식으로 작업하는것을 선호한다는 것을 깨달으면서 Oracle은 같은 특징을 가졌지만 다른 라이센스를 지원하는 JDK의 2가지 버전을 내 놓았다.

JDK의 상업 버전은 개발과 테스트에서는 무료로 사용할 수 있다. 그러나, production 환경에서는 사용에 대해 비용을 요구했다. 다른 버전으로는 완벽하게 무료인 OpenJDK가 있다. 후자는 open-source [GPLv2+CPE](https://www.olis.or.kr/license/Detailselect.do?lId=1004) 라이센스를 사용한다. 그러나 생명주기는 6개월 뿐이다.

이 문제는 매우 복잡하기 때문에, 나는 ["Java is Still Free"](https://docs.google.com/document/d/1nFGazvrCvHMZJgFstlbzoHjpAVwv5DEdnaBr_5pKuHo/preview) 라는 기사를 읽기를 추천한다.



## 그러나, 때가 되었다.

### 사람들이 업그레이드를 하고 있다.

2020년에, 가장 최신 JVM 생태계 설문조사는 오직 사용자의 64%가 Java8을 사용하고, 25%는 Java11 사용을 시작했다고 보고했다.

![updating_java](https://miro.medium.com/max/1400/1*EMcER77vPOa2iZ0-UGCCqQ.png)

JreREL 리포트는 Java8이 58%라고 보여준다. 즉, Java11의 사용자들이 2년사이에 매우 빠르게 증가하고 있다는것을 증명한다.

![rapid_increasing](https://miro.medium.com/max/1400/1*LSyO4DVvITh_MnT8c4oqMw.png)

동시에 마이크로서비스, continuous-release practices, better-automated testing 역시 이전보다 위험성을 덜 가지면서 언어의 새로운 버전을 받아들이기 쉽게 만들고 있다.

많은 버전들 중에 오직 Java8, Java11 그리고 미래의 Java17이 LTS(long-term supported versions) 이다. Oracle은 3년 동안 지원할 것이고, 다른 것들은 6개월만 지원할 것이다.



### Java 11 LTS

Java11은 업그레이드할 가치가 있다.

- 새로운 API, string.lines\striptLeading\stripTrailing, Collection.toArray, io/nio

- 새로운 HTTP Client 지원

- 새로운 암호화 알고리즘 RSASSA-PSS,ChaCha20,Poly1305, etc.

- 중첩 기반의 접근방식

  > https://www.baeldung.com/java-nest-based-access-control

- `var`를 지원하는 Lambda

  `list.forEach((var x) -> {System.out.print(x);});`



### Java11은 성능이 더 좋다.

![gc_performance](https://miro.medium.com/max/1400/1*-c261AoNchyDOrXTCDThUw.png)



## 보안

최근 1월까지, 해커들은 자바의 보안 허점을 이용해 시간당 시스템에 수십만개의 malware를 줄 수 있었다.

![malware](https://miro.medium.com/max/1400/1*8ZGxAFkMYm3ZzPHP9NWlxg.png)

이러한 보안 결함들과 다른 많은 것들때문에 자바는 자주 업데이트 되어야 한다.

자바는 가끔 웹사이트에 접근하기 위해 당신의 웹 브라우저를 사용한다. 그리고 당신의 웹 브라우저는 해커들에게 가장 취약한 곳이다.

그러므로 자바를 업데이트하지 않는 것은 불을 가지고 노는것과 같다.



### Oracle은 업그레이드를 권장한다.

**무료 Java8은 끝났다.** Oracle은 오직 돈을 지불한 사용자에 대해서만 2030년까지 Java8을 지원한다.

새로운 출시 리듬에서, 몇년에 한번씩 출시되는 많은 수의 특징들은 이제 존재하지 않을 것이다. 그러나 더 작은 출시들은 미리 결정된 날짜 안에 출시 될 것이다. 당연히, 이러한 출시들은 더 적은 기능을 포함할 것이다. 그리고 이러한 접근은 여러가지 장점들을 가져올 것이다.

- 편리한 계획. 예정된 출시 리듬은 언어 개발자들에게 편리할 뿐만 아니라 업그레이드 일정을 잡기 편하다.
- 높은 품질. 더 잦은 출시는 한 버전에서 어떤 특징이 제대로 동작하지 않는 다면 다음 출시까지 미뤄질 것이라는 것을 의미한다. 그러므로, 언어 개발자들의 압박은 덜해지고, 그로인해 함수를 완성을 서두를 필요가 없어져서 각 버전의 퀄리티는 높아진다.
- 새로운 특징들의 안정적인 소스. 매 3년마다 거대한 업데이트를 했었지만, 가비지콜렉터의 변화, 성능 향상 같은 언어의 특징들을 포함하며 현재는 지속적으로 업데이트를 한다.



## 더 나은 업그레이드 전략

같은 코드와 수정사항들을 가져오는 OpenJDK를 사용해라. 오직 long-term support version만 업그레이드 해라. 이러한 리듬은 자바 개발자들에게 친숙할 것이다.

이러한 업그레이드는 3년 마다 큰 업그레이드에서 불이익을 가져온다. 그러나 이러한 업그레이드는 리스크를 측정하는 시간을 더 많이 가질 수 있다.

![openjdk](https://miro.medium.com/max/1400/1*s1NK2PJy9nYlEvpqR0QyRg.png)

사실은 45%의 개발자는 현재 OpenJDK를 사용하고 있다.



## 결론

우리는 이러한 변화가 우리의 어플리케이션과 회사에 어떤 영향을 미칠지 이해할 필요가 있다. 이러한 변화를 어떻게 받아들이는지 배우면, 당신은 결국 당신이 6개월마다 Java8과 후속 새로운 버전에 도입된 개선사항들을 받을 수 있을 것이다.





---

## 요약

- 현재 자바14가 출시 되었지만 아직까지 많은 사람들이 자바8 을 사용한다.
  - 많은 사람들이 느끼기에 자바8 이후로 크게 기능적인 변화가 없다고 생각
    - 개발 효율성을 높이는데 크게 효과가 없다고 생각
  - 업그레이드를 할때 리스크가 너무 큼
    - 자바 업그레이드로 인해 다른 dependency들도 고려해야함
  - 자바 업그레이드 주기가 너무 빠름
- 하지만 이제 사람들이 업그레이드를 하기 시작했다.
  - 자바11은 충분히 새로운 방식들이 많이 도입되었다.
  - Java8의 무료 지원이 끝남
- 업그레이드 할때는 OpenJDK를 사용하는것을 추천. LTS(3년지원)를 사용하는것을 추천





