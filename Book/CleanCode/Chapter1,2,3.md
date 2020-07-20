# 1장 깨끗한 코드

## 나쁜 코드

- 나쁜 코드는 회사를 망하게 만들 수 있다.
  - 유지보수에 여러움이 많아 버전 업하기 힘들다.
  - 나중에 손보기 힘들어 진다.
  - **나중은 결코 오지 않는다.**



## 나쁜 코드로 치르는 대가

- 나쁜 코드의 경우, 코드를 고칠 때마다 엉뚱한 곳에서 문제가 발생한다.
- 나쁜 코드는 팀 생산성 하락을 가져온다.
- 태도
  - 좋은 코드가 나쁜 코드로 전락하는 이유는 전적으로 **프로그래머**에게 있다.
  - 좋은 코드를 사수하는 것은 프로그래머들의 책임이다.
  - 나쁜 코드의 위험을 이해하지 못하는 관리자의 말을 그대로 따르면 안된다.
- 기한을 맞추는 유일한 방법은 언제나 코드를 최대한 깨끗하게 유지하는 **습관**이다.
- 코드감각
  - 깨끗한 코드를 작성하려면 좋은 코드와 나쁜 코드를 구별 할 수 있는 능력
  - 절제와 규율을 적용해 나쁜 코드를 좋은 코드로 바꾸는 전략을 파악할 수 있는 능력



## 보이스카우트 규칙

- 코드는 시간이 지나도 언제나 깨끗하게 유지해야 한다.
  - 적극적으로 코드의 퇴보를 막아햐 한다.



## 결론

- 이 책을 읽고 뛰어난 프로그래머간 된다는 보장은 없다. 단지 뛰어난 프로그래머가 생각하는 방식과 그들이 사용하는 기술과 기교와 도구를 소개하는 것 뿐이다.
- 연습 또 연습



---

# 2장 의미 있는 이름

## 의도를 분명히 밝히기.

- 의도를 명확하게 함으로써 코드의 가독성을 높힐 수 있다.
  - 함수가 하는 일이 무엇인지 이해하기 쉬워진다.

### Bad Example

```java
public List<int[]> getThem() {
    List<int[]> list1 = new ArrayList<int[]>(); // 어떤 정보를 담는 list인가?
    for (int[] x : theList) {
        if (x[0] == 4) { // list의 첫번째 값은 어떤의미를 가지며 4는 어떤값을 의미하는가?
            list1.add(x);
        }
    }
    return list1; // 반환하는 리스트 list1을 어떻게 사용하는가?
}
```

### Good Example

```java
public List<Cell> getFlaggedCells() {
    List<Cell> flaggedCells = new ArrayList<Cell>(); // flag된 Cell들을 담는 list
    for (Cell cell : gameBoard) {
        if (cell.isFlagged()) { // 표시된 cell인지 확인.
            flaggedCells.add(cell);
        }
    }
    return flaggedCells; // 표시된 Cell들의 list
}
```

## 그릇된 정보를 피하라

- 나름대로 널리 쓰이는 의미가 있는 단어를 다른 의미로 사용하면 안된다.
- 개발자에게는 특수한 의미를 가지는 단어(List 등)는 `실제 컨테이너가 List`가 아닌 이상 accountList와 같이 변수명에 붙이지 않는다.
  - 차라리 accountGroup, bunchOfAccounts, accounts등으로 명명하자.
- 서로 흡사한 이름을 사용하지 않도록 주의한다.
- 유사한 개념은 유사한 표기법을 사용한다.

## 의미있게 구분하라

- `불용어-noise word`을 사용하지않는다.
  - 자주쓰는 `Info`, `Data`는 `a`와 `an`, `the`와 마찬가지이며 의미를 구분하기 힘든 용어이다.

## 발음하기 쉬운 이름을 사용하라

- 발음하기 어려운 이름은 토론하기 어렵다.
- 새로운 개발자가 들어오면 일일이 설명을 해주어야 한다.

### Bad Example

```java
class DtaRcrd102 {
    private Date genymdhms;
    private Date modymdhms;
    private final String pszqint = "102";
};
```

### Good Example

```java
class Customer {
    private Date generationTimestamp;
    private Date modificationTimestamp;
    private final String recordId = "102";
};
```

## 인코딩을 피하라

- 너무 많은 정보를 인코딩에 넣으면 이름을 해독하기 어려워진다.
- 접두어 `I`는 주의를 흐트리고 과도한 정보를 제공한다.
- 인터페이스 클래스 이름과 구현 클래스 이름 중 하나를 인코딩 해야 한다면 구현 클래스 이름을 인코딩하는 것을 추천한다.
  - 추상화된 Class이름을 ShapeFactory로 정의하고 상속받아 구현하는 Class이름을 `ShapeFactoryImp`, `CShapeFactory`으로 정의한다.

## 자신의 기억력을 자랑하지 마라

- 전문가 프로그래머는 **명료함이 최고** 라는 사실을 이해한다.
  - 재미난 이름보다는 명료한 이름을 선택하라

## 클래스 이름

- 명사 혹은 명사구를 사용하기.(`Customer`, `WikiPage`, `Account`, `AddressParser`)
- `Manager`, `Processor`, `Data`, `Info`와 같은 단어는 피하자 => `불용어-noise word`
- `동사`는 사용하지 않는다.

## 메서드 이름

- `동사`나 `동사구`가 적합하다. (`postPayment`, `deletePage`, `save`)
- `get`, `set`, `is`

```java
Complex fulcrumPoint = new Complex(23.0);
Complex fulcrumPoint = Complex.FromRealNumber(23.0); // better
```

## 한 개념에 한 단어를 사용하라

- 추상적인 개념 하나에 단어 하나를 선택해 이를 고수한다.
  - 하나만 사용하여 통일성 얻기
    - `fetch`, `retrieve`, `get`
    - `controller`, `manager`, `driver`

## 말장난을 하지 마라

- `add`의 역할은 A와 B를 더하는 의미이다.
  - 중간에 삽입하는 함수의 이름도 `add`라고 정의하면 `add`의 의미는 명확하지 못하다.
  - `add`대신 `insert`, `append`로 적당하다.

## 의미있는 맥락을 추가하라

### Bad Example

- 세 변수의 의미가 불분명하다.

```java
private void printGuessStatistics(char candidate, int count) {
    String number;
    String verb;
    String pluralModifier;
    if (count == 0) {  
        number = "no";  
        verb = "are";  
        pluralModifier = "s";  
    }  else if (count == 1) {
        number = "1";  
        verb = "is";  
        pluralModifier = "";  
    }  else {
        number = Integer.toString(count);  
        verb = "are";  
        pluralModifier = "s";  
    }
    String guessMessage = String.format("There %s %s %s%s", verb, number, candidate, pluralModifier );

    print(guessMessage);
}
```

### Good Example

- 함수를 쪼개기가 쉬워지므로 알고리즘도 좀 더 명확해진다.

```java
public class GuessStatisticsMessage {
    private String number;
    private String verb;
    private String pluralModifier;

    public String make(char candidate, int count) {
        createPluralDependentMessageParts(count);
        return String.format("There %s %s %s%s", verb, number, candidate, pluralModifier );
    }

    private void createPluralDependentMessageParts(int count) {
        if (count == 0) {
            thereAreNoLetters();
        } else if (count == 1) {
            thereIsOneLetter();
        } else {
            thereAreManyLetters(count);
        }
    }

    private void thereAreManyLetters(int count) {
        number = Integer.toString(count);
        verb = "are";
        pluralModifier = "s";
    }

    private void thereIsOneLetter() {
        number = "1";
        verb = "is";
        pluralModifier = "";
    }

    private void thereAreNoLetters() {
        number = "no";
        verb = "are";
        pluralModifier = "s";
    }
}
```

---

# 3장 함수(Function)

## 작게 만들어라

```java
public static String renderPageWithSetupsAndTeardowns( PageData pageData, boolean isSuite) throws Exception {
    boolean isTestPage = pageData.hasAttribute("Test");
    if (isTestPage) {
        WikiPage testPage = pageData.getWikiPage();
        StringBuffer newPageContent = new StringBuffer();
        includeSetupPages(testPage, newPageContent, isSuite);
        newPageContent.append(pageData.getContent());
        includeTeardownPages(testPage, newPageContent, isSuite);
        pageData.setContent(newPageContent.toString());
    }
    return pageData.getHtml();
}
```

위 코드도 길다. 되도록 한 함수당 3~5줄 이내로 줄이는 것을 권장한다

```java
public static String renderPageWithSetupsAndTeardowns( PageData pageData, boolean isSuite) throws Exception {
    if (isTestPage(pageData))
        includeSetupAndTeardownPages(pageData, isSuite);
    return pageData.getHtml();
}
```

### 블록과 들여쓰기

중첩구조(if/else, while문 등)에 들어가는 블록은 한 줄이어야 한다. 각 함수 별 들여쓰기 수준이 2단을 넘어서지 않고, 각 함수가 명백하다면 함수는 더욱 읽고 이해하기 쉬워진다.

## 한 가지만 해라

> 함수는 한가지를 해야 한다. 그 한가지를 잘 해야 한다. 그 한가지만을 해야 한다. 지정된 함수 이름 아래에서 추상화 수준이 하나인 단계만 수행한다면 그 함수는 한 가지 작업만 하는 것이다.

### 함수 내 섹션

함수를 여러 섹션(선언, 초기화 등등)으로 나눌 수 있다면 그 함수는 여러작업을 하는 셈이다.

## 함수 당 추상화 수준은 하나로 해라

함수가 ‘한가지’ 작업만 하려면 함수 내 모든 문장의 추상화 수준이 동일해야 된다. 만약 한 함수 내에 추상화 수준이 섞이게 된다면 읽는 사람이 헷갈린다.

### 위에서 아래로 코드 읽기:내려가기 규칙

코드는 위에서 아래로 이야기처럼 읽혀야 좋다. 함수 추상화 부분이 한번에 한단계씩 낮아지는 것이 가장 이상적이다.(내려가기 규칙)

## Switch문

### Bad Example

```java
public Money calculatePay(Employee e) throws InvalidEmployeeType {
    switch (e.type) {
        case COMMISSIONED:
            return calculateCommissionedPay(e);
        case HOURLY:
            return calculateHourlyPay(e);
        case SALARIED:
            return calculateSalariedPay(e);
        default:
            throw new InvalidEmployeeType(e.type);
    }
}
```

- 함수가 길다. (새 직원 유형을 추가하면 더 길어진다.)
- `한 가지`작업만 수행하지 않는다.
- SRP(Single Responsibility Principle)를 위반한다. (코드를 변경할 이유가 여럿이기 때문이다.)
- OCP(Open Closed Principle)를 위반한다.(새 직원 유형을 추가할 때마다 코드를 변경하기 때문이다.)

### Good Example

```java
public abstract class Employee {
    public abstract boolean isPayday();
    public abstract Money calculatePay();
    public abstract void deliverPay(Money pay);
}
-----------------
public interface EmployeeFactory {
    public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}
-----------------
public class EmployeeFactoryImpl implements EmployeeFactory {
    public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
        switch (r.type) {
            case COMMISSIONED:
                return new CommissionedEmployee(r) ;
            case HOURLY:
                return new HourlyEmployee(r);
            case SALARIED:
                return new SalariedEmploye(r);
            default:
                throw new InvalidEmployeeType(r.type);
        }
    }
}
```

switch문은 작게 만들기 어렵지만(if/else의 연속 도 마찬가지!), 다형성을 이용하여 switch문을 abstract factory에 숨겨 다형적 객체를 생성하는 코드 안에서만 switch를 사용하도록 한다.

## 서술적인 이름을 사용해라

> 이름이 길어도 괜찮다. 겁먹을 필요없다. 길고 서술적인 이름이 짧고 어려운 이름보다 좋다.

## 함수 인수

함수에서 이상적인 인수 개수는 0개(무항). 인수는 코드 이해에 방해가 되는 요소이므로 최선은 0개이고, 차선은 1개뿐인 경우이다. 출력인수(함수의 반환 값이 아닌 입력 인수로 결과를 받는 경우)는 이해하기 어려우므로 왠만하면 쓰지 않는 것이 좋겠다.

### 단항 형식

- 인수에 질문을 던지는 경우 : `boolean fileExists(“MyFile”);`
- 인수를 뭔가로 변환해 결과를 변환하는 경우 : `InputStream fileOpen("MyFile");`
- 이벤트 함수일 경우 (이 경우에는 이벤트라는 사실이 코드에 명확하게 드러나야 한다.)

### 플래그 인수

플래그 인수는 추하다. 쓰지마라. bool 값을 넘기는 것 자체가 그 함수는 한꺼번에 여러가지 일을 처리한다고 공표하는 것과 마찬가지다.

### 이항 함수

단항 함수보다 이해하기가 어렵다. Point 클래스의 경우에는 이항 함수가 적절하다. 2개의 인수간의 자연적인 순서가 있어야함 무조건 나쁜 것은 아니지만, 인수가 2개이니 만큼 이해가 어렵고 위험이 따르므로 가능하면 단항으로 바꾸도록

- 자연스러운 이해 : `assertEquals(expected, actual)`, `Point p = new Point(x,y);`

### 삼항 함수

이해하기 훨씬 어려우므로 최대한 자제하자. 삼항 함수를 만들 때는 신중히 고려하라.

### 인수 객체

개념을 표현하기.

```java
Circle makeCircle(double x, double y, double radius); // bad
Circle makeCircle(Point center, double radius); // good
```

### 인수 목록

때로는 String.format같은 함수들처럼 인수 개수가 가변적인 함수도 필요하다. String.format의 인수는 List형 인수이기 때문에 이항함수라고 할 수 있다.

### 동사나 키워드

단항 함수는 함수와 인수가 동사/명사 쌍을 이뤄야한다.

```java
write(name); // bad
writeField(name); // good
```

함수이름에 키워드(인수 이름)을 추가하면 인수 순서를 기억할 필요가 없어진다.

```java
assertEquals(expected, actual);
assertExpectedEqualsActual(expected, actual);
```

## 부수 효과를 일으키지 말아라

### Bad Example

```java
public class UserValidator {
    private Cryptographer cryptographer;
    public boolean checkPassword(String userName, String password) {
        User user = UserGateway.findByName(userName);
        if (user != User.NULL) {
            String codedPhrase = user.getPhraseEncodedByPassword();
            String phrase = cryptographer.decrypt(codedPhrase, password);
            if ("Valid Password".equals(phrase)) {
                Session.initialize(); // 기능
                return true;
            }
        }
        return false;
    }
}
```

비밀번호를 확인하는 Method에 Session 초기화하는 포함되어있다. 한 Method에 두가지 기능을 하고 있다. 좋지 못한 함수이다.

### 출력인수

일반적으로 출력 인수는 피해야 한다. 함수에서 상태를 변경해야 한다면 함수가 속한 객체 상태를 변경하는 방식을 택하라.

## 명령과 조회를 분리하라

`public boolean set(String attribute, String value);` : 두가지 기능을 하고 있다. 설정하는 것과 설정이 성공했는지 실패했는지. `if(set(“username”, “unclebob”))...` : 이상한 함수의 모습을 볼 수 있다.

## 오류 코드보다 예외를 사용하라

장황한 `if`을 통해 코드의 가독성과 이해도가 떨어진다.

### Bad Example

```java
if (deletePage(page) == E_OK) {
    if (registry.deleteReference(page.name) == E_OK) {
        if (configKeys.deleteKey(page.name.makeKey()) == E_OK) {
            logger.log("page deleted");
        } else {
            logger.log("configKey not deleted");
        }
    } else {
        logger.log("deleteReference from registry failed");
    }
} else {
    logger.log("delete failed"); return E_ERROR;
}
```

오류 코드 대신 예외를 사용하면 오류 처리 코드가 원래 코드에서 분리되므로 코드가 깔금해진다.

### Good Example

```java
try{
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
}catch(Exception e){
  logger.log(e.getMessage());
}
```

### Try/Catch 뽑아내기

`Try/Catch` 블록을 별로 함수로 뽑아내는 편이 좋다.

### Best Example

```java
public void delete(Page page) {
    try {
        deletePageAndAllReferences(page);
      } catch (Exception e) {
          logError(e);
      }
}

private void deletePageAndAllReferences(Page page) throws Exception {
    deletePage(page);
    registry.deleteReference(page.name);
    configKeys.deleteKey(page.name.makeKey());
}

private void logError(Exception e) {
    logger.log(e.getMessage());
}
```

### 오류 처리도 한가지 작업이다.

```java
public enum Error {
    OK,
    INVALID,
    NO_SUCH,
    LOCKED,
    OUT_OF_RESOURCES,     
    WAITING_FOR_EVENT;
}
```

오류 코드가 정의되어있다면 새 오류 코드를 추가하기 힘들고 재컴파일/재배치가 번거롭다. 기존의 `java Exception`을 사용하게된다면 재컴파일/재배치 없이도 새 예외 클래스를 추가할 수 있다.

## 반복하지 마라!

중복은 모든 소프트웨어에서 모든 악의 근원이므로 늘 중복을 없애도록 노력해야한다.

## 구조적 프로그래밍

> 함수는 return문이 하나여야 되며, 루프 안에서 break나 continue를 사용해선 안된며 goto는 절대로, 절대로 사용하지 말자.
