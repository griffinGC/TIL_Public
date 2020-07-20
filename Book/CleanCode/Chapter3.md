# 3장 함수(Function)

## 작게 만들어라

- 함수를 만드는 첫번째 규칙은 '작게!', 두번째 규칙은 '더 작게!'

- 각 함수가 이야기 하나를 표현해야 한다.

```java
public static String renderPageWithSetupsAndTeardowns( PageData pageData, boolean isSuite) throws Exception {
    if (isTestPage(pageData))
        includeSetupAndTeardownPages(pageData, isSuite);
    return pageData.getHtml();
}
```

### 블록과 들여쓰기

- 중첩구조 (if/else, while문 등) 에 들어가는 블록은 한 줄이어야 한다. 
- 중첩이 생길만큼 함수가 커져서는 안된다는 뜻이다.
- 각 함수 별 들여쓰기 수준이 2단을 넘어서지 않아야 한다.
- 각 함수가 명백하다면 함수는 더욱 읽고 이해하기 쉬워진다.

## 한 가지만 해라

***함수는 한가지를 해야 한다. 그 한가지를 잘 해야 한다. 그 한가지만을 해야 한다.***

- 지정된 함수 이름 아래에서 추상화 수준이 하나인 단계만 수행한다면 그 함수는 한 가지 작업만 하는 것이다.

### 함수 내 섹션

- 함수를 여러 섹션(선언, 초기화 등등)으로 나눌 수 있다면 그 함수는 여러작업을 하는 셈이다.

## 함수 당 추상화 수준은 하나로 해라

- 함수가 ‘한가지’ 작업만 하려면 함수 내 모든 문장의 추상화 수준이 동일해야 된다. 
  - 만약 한 함수 내에 추상화 수준이 섞이게 된다면 읽는 사람이 헷갈린다.

### 위에서 아래로 코드 읽기:내려가기 규칙

- 코드는 위에서 아래로 이야기처럼 읽혀야 좋다. 
- 함수 추상화 부분이 한번에 한단계씩 낮아지는 것이 가장 이상적이다.

## Switch문

### 안좋은 예시

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

- 함수가 길다. 
  - 새 직원 유형을 추가하면 더 길어진다.
- `한 가지`작업만 수행하지 않는다.
- SRP(Single Responsibility Principle)를 위반한다.
  - 코드를 변경할 이유가 여러개임
- OCP(Open Closed Principle)를 위반한다.
  - 새 직원 유형을 추가할 때마다 코드를 변경 해야함
- 위의 함수와 구조가 동일한 함수가 무한정 존재한다.
  - `isPayday(Employee e, Date date)`, `deliverPay(Employee e, Money pay)`

### 좋은 예시

> https://goodgid.github.io/Clean-Code-Function-Switch/

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

- switch 문을 추상 팩토리에 숨김
- switch 문을 사용해 적절한 Employee 파생 클래스의 인스턴스를 생성
  - `calculatePay()`, `isPayday()`, `deliverPay()` 등의 함수는 `Employee` 인터페이스를 거쳐 호출 됨
- 다형성으로 인해 실제 파생 클래스의 함수가 실행된다.

### 좋은 예시 실습

```java
@Autowired
EmployeeFactory employeeFactory;

public Money calculatePay(Employee e) throws InvalidEmployeeType{
  Employee employee = employeeFactory.makeEmployee(COMMISSIONED);
  return employee.calculatePay();
}
```



## 서술적인 이름을 사용해라

- 이름이 길어도 괜찮다. 겁먹을 필요없다. 길고 서술적인 이름이 짧고 어려운 이름보다 좋다.

## 함수 인수

- 함수에서 이상적인 인수 개수는 0개(무항). 
- 인수는 코드 이해에 방해가 되는 요소이므로 최선은 0개이고, 차선은 1개뿐인 경우이다. 
- 출력인수(함수의 반환 값이 아닌 입력 인수로 결과를 받는 경우)는 이해하기 어려우므로 왠만하면 쓰지 않는 것이 좋겠다.

### 단항 형식

- 인수에 질문을 던지는 경우 : `boolean fileExists(“MyFile”);`
- 인수를 뭔가로 변환해 결과를 변환하는 경우 : `InputStream fileOpen("MyFile");`
- 이벤트 함수일 경우 
  - 이 경우에는 이벤트라는 사실이 코드에 명확하게 드러나야 한다.

### 플래그 인수

- 플래그 인수는 추하다. 
- bool 값을 넘기는 것 자체가 함수가 한꺼번에 여러가지 일을 처리한다고 공표하는 것과 마찬가지다.

### 이항 함수

- 단항 함수보다 이해하기가 어렵다. 
- 이항 함수가 적절한 경우도 존재한다.
  - Point 클래스의 경우에는 이항 함수가 적절하다. 
  - 2개의 인수간의 자연적인 순서가 있어야함 
- 무조건 나쁜 것은 아니지만, 인수가 2개이니 만큼 이해가 어렵고 위험이 따르므로 가능하면 단항으로 바꾸도록 한다.

### 삼항 함수

- 이해하기 훨씬 어려우므로 최대한 자제한다.
- 삼항 함수를 만들 때는 신중히 고려하라.

### 인수 객체

- 개념을 표현한다.

```java
Circle makeCircle(double x, double y, double radius); // bad
Circle makeCircle(Point center, double radius); // good
```

### 인수 목록

- 때로는 String.format같은 함수들처럼 인수 개수가 가변적인 함수도 필요하다. 

  ```java
  String.format("%s worked %2.f" hours.", name, hours");
  ```

- String.format의 인수는 List형 인수이기 때문에 이항함수라고 할 수 있다.

  ```java
  public String format(String format, Object... args)
  ```

### 동사나 키워드

- 단항 함수는 함수와 인수가 동사/명사 쌍을 이뤄야한다.

```java
write(name); // bad
writeField(name); // good
```

- 함수이름에 키워드(인수 이름)을 추가하면 인수 순서를 기억할 필요가 없어진다.

```java
assertEquals(expected, actual);
assertExpectedEqualsActual(expected, actual);
```

## 부수 효과를 일으키지 말아라

### 안좋은 예시

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

- 비밀번호를 확인하는 Method에 Session 초기화하는 것이 포함되어있다. 
- 한 Method에 두가지 기능을 하고 있다. 좋지 못한 함수이다.

### 출력인수

- 일반적으로 출력 인수는 피해야 한다. 
- 함수에서 상태를 변경해야 한다면 함수가 속한 객체 상태를 변경하는 방식을 택하라.

## 명령과 조회를 분리하라

- 함수는 뭔가를 수행하거나 뭔가에 답하거나 둘 중 하나만 해야 한다.
  - 둘다 하면 안 된다.
- 객체 상태를 변경하거나 아니면 객체 정보를 반환하거나 둘 중 하나다.
  - 둘 다 하면 혼란을 초래한다.

```java
public boolean set(String attribute, String value);
```

- 두가지 기능을 하고 있다. 설정하는 것과 설정이 성공했는지 실패했는지. 

```java
if(set("username", "unclebob")){
  ...
}
```

- `if` 문 안에 `set`을 넣게 되면 *형용사*인지 *동사*인지 분간하기 어렵다.
  - 명령과 조회를 분리해 혼란을 애초에 뿌리 뽑아야 한다.
    - 명령 - 값을 지정
    - 조회 - 값이 존재 하는 지 여부

## 오류 코드보다 예외를 사용하라!

## 오류 코드보다 예외를 사용하라

- 명령 함수에서 오류코드를 반환하는 방식은 명령/조회 분리 규칙을 미묘하게 위반한다.
  - 자칫하면 if문에서 명령을 표현식으로 사용하기 쉬운 탓
- 장황한 `if`을 통해 코드의 가독성과 이해도가 떨어진다.

### 안좋은 예시

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

### 좋은 예시

- 오류 코드 대신 예외를 사용하면 오류 처리 코드가 원래 코드에서 분리되므로 코드가 깔끔해진다.

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

- `Try/Catch` 블록을 별로 함수로 뽑아내는 편이 좋다.

### 안좋은 예시

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

- 오류를 처리하는 함수는 오류만 처리해야 한다.

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

- 위의 클래스는 의존성 자석이다.
- 다른 클래스에서 import 해서 사용해야하는데, Error enum이 변한다면, 이를 사용하는 클래스 전부를 다시 컴파일 하고 재배치 해야 한다.
- 오류 코드가 정의되어있다면 새 오류 코드를 추가하기 힘들고 재컴파일/재배치가 번거롭다. 
  - 오류코드 대신 예외를 사용하면 (Exception 클래스에서 파생) 재컴파일/재배치 없이도 새 예외 클래스를 추가할 수 있다.

## 반복하지 마라!

- 중복 되면 코드 길이가 늘어날 뿐 아니라 알고리즘이 변하면 보두 변경해주어야 한다.
- 중복은 모든 소프트웨어에서 모든 악의 근원이다.

## 구조적 프로그래밍

- 모든 함수와 함수 내 모든 블록에 입구와 출구가 하나만 존재해야 한다.
- 함수는 return문이 하나여야 한다.
- 루프 안에서 break나 continue를 사용해선 안되며 goto는 **절대로, 절대로** 사용하면 안된다.