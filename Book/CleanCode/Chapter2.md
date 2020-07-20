

# 2장 의미 있는 이름

## 의도를 분명히 밝히기

- 의도를 명확하게 함으로써 코드의 가독성을 높힐 수 있다.
  - 함수가 하는 일이 무엇인지 이해하기 쉬워진다.

### 안좋은 예시

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

### 좋은 예시

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

- `불용어`(noise word)을 사용하지않는다.
  - 자주쓰는 `Info`, `Data`는 `a`와 `an`, `the`와 마찬가지이며 의미를 구분하기 힘든 용어이다.

## 발음하기 쉬운 이름을 사용하라

- 발음하기 어려운 이름은 토론하기 어렵다.
- 새로운 개발자가 들어오면 일일이 설명을 해주어야 한다.

### 안좋은 예시

```java
class DtaRcrd102 {
    private Date genymdhms;
    private Date modymdhms;
    private final String pszqint = "102";
};
```

### 좋은 예시

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
- 인터페이스 클래스 이름과 구현 클래스 이름 중 하나를 인코딩 해야 한다면 **구현 클래스 이름을 인코딩**하는 것을 추천한다.
  - 추상화된 Class이름을 ShapeFactory로 정의하고 상속받아 구현하는 Class이름을 `ShapeFactoryImp`, `CShapeFactory`으로 정의한다.

## 자신의 기억력을 자랑하지 마라

- 전문가 프로그래머는 **명료함이 최고** 라는 사실을 이해한다.
  - 재미난 이름보다는 **명료한 이름**을 선택하라

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

- 클래스, 함수, 이름 공간에 넣어 맥락을 부여
  - 모든 방법 실패시 마지막 수단으로 접두어 붙이기

### 안좋은 예시

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

### 좋은 예시

- 불분명한 세 변수를 GuessStatisticsMessage에 넣음
  - 변수의 맥락이 명확해짐
  - 함수를 쪼개기가 쉬워지므로 알고리즘도 좀 더 명확해짐

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

## 불필요한 맥락을 없애라

- Gas Station Deluxe 라는 애플리케이션을 만든다고 가정할때 모든 클래스를 GSD로 시작하는 것은 바람직하지 못하다.
- 의미가 분명하다면 짧은 이름이 좋다.
- 이름에 불필요한 맥락을 추가하지 않도록 주의한다.