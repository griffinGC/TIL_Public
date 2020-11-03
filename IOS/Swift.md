# Swift

## Variable vs Constant

- var
  - variable
- let
  - constant



## Int & String

- Int
  - 정수형 타입
- String
  - 문자열 타입
  - `"\(변수명)"`



## Converting Types

- Int(변수명)
  - 정수형으로 변경

- 타입 확인
  - 옵션 + 변수

## Playground

- 테스트 코드를 짤때나 간단히 테스트 할때 사용 가능
- 재생 버튼 클릭하면 오른쪽에서 확인 가능



## 주석

- 슬래시 2개 (커맨드 + 슬래시)



## 튜플

- 2개이상의 데이터를 동시에 다룰때 사용

- 괄호 열고 데이터 타입

  - (변수, 변수)

- 파이썬의 튜플 생각

- 순서로 튜플의 데이터에 접근 가능

  - 각각에 값에 key같은 이름을 줘서 이걸로도 튜플의 값에 접근 가능

    ```swift
    let coordinatesName = (x: 2, y:3)
    let x2 = coordinatesName.x
    let y2 = coordinatesName.y
    let (x2, y2) = coordinatesName
    ```

  - 동시에 값 뽑아 올 수 있음



## Boolean (Bool)

- Bool 로 표시됨
- 주로 비교를 할때 사용



## Scope

- 사용되는 범위. 주로 블럭으로 나타냄



---

## while

- 조건문에 괄호를 붙여주지 않음

  ```swift
  shile i < 10 {
    print(i)
    i += 1
  }
  ```

- repeat { ... } while 조건문

  - do while 과 유사한 문
  - 무조건 한번은 실행됨



## for

- 파이썬과 유사한 형태
- closedRange
  - 둘다 담김
  - `처음숫자...마지막숫자`
- halfClosedRange
  - 뒤에것은 안담김
  - 뒤의 숫자 -1 까지 나타냄
  - `처음숫자..<마지막숫자`

```swift
let closedRange = 0...10
var sum = 0
for i in closedRange {
  sum += i
} // 55
let halfClosedRange = 0...10
var sum2 = 0
for i in halfClosedRange {
  sum2 += i
} // 45
```

- 쓰이지 않는 변수를 사용할때는 i 같은 것을 _ (언더스코어) 로 대체 가능

- 조건을 for 문 뒤에 where로 넣을 수 있음

  ```swift
  for i in closedRange where i % 2 == 0 {
    print(" ---> 짝수 : \(i)")
  }
  ```



## switch

- 문법

  ```swift
  switch 변수 {
    case 값1, 값2, 값3:
    case 0...10: // 0부터 10까지를 나타냄
    ...
    default:
  }
  ```

  - case에 구간 설정 가능
  - case에 여러 값 설정 가능
  - case에 조건(where)도 설정 가능
  - case에 tuple도 사용가능

---

## Function

- `func` 로 정의

  ```swift
  func 함수명 (externalName 파라미터명 : 자료형 = 디폴트값, ...) -> 반환타입{
    ...
  }
  함수명(파라미터명 : 값) 
  ```

  - 함수 사용시 파라미터 명 안적고 싶으면 함수 정의 시 파라미터명 앞에 **_ (언더스코어)** 붙이면 됨

    - 만약 언더스코어 말고 내가 정의하고 싶은 이름을 넣어도 됨
      - 그럴 경우에는 함수 사용시 그 이름을 적어야 함

    ```swift
    func printTotalPrice(가격 price : Int, 갯수 count: Int){
      ...
    }
    printTotalPrice(가격: 100, 갯수: 10)
    ```

    - 함수 정의 시 자료형 옆에 디폴트 값 삽입 가능
      - 디폴트 있으면 값 안넣어 줄 수 있음

  - 반환타입은 `-> 반환타입` 으로 표현

- object에 속해서 기능을 수행하는 함수는 메서드라고 부름

  - 속하지 않고 독립적으로 사용될때는 function(함수)이라고 부름

- 파라미터는 복사되어서 함수 내로 들어옴

  - 파라미터는 불변 (constant)임

  - 파라미터로 들어오는 값을 함수 내부에서 변경하고 싶을때는 copyin, copyout 필요

    - 타입 앞에 **inout** 키워드 이용

      - inout 매개변수로 전달될 변수 또는 상수 앞에 는 앰퍼샌드(&)를 붙여서 표현

        > https://velog.io/@wimes/7.-%ED%95%A8%EC%88%98

  ```swift
  var value = 3
  func incrementAndPrint(_ value: inout Int) {
    value += 1
    print(value)
  }
  
  incrementAndPrint(&value) // 포인터 처럼 &사용
  ```

  

## 오버로드

- 이름은 같고 변수의 갯수, 변수의 이름, 변수의 타입 등이 다른 경우



## 함수를 파라미터로 넘기는 법

- 함수 자체를 변수에 할당 가능

  ```swift
  func add (_ a : Int, _ b : Int) -> Int{
    return a + b
  }
  func substract(_ a : Int, _ b: Int) -> Int{
    return a - b
  }
  
  var function = add
  function(4, 2)
  function = substract
  ```

- 함수를 인자로 넣을때는 넣는 함수에 어떤 함수를 넣는지 명시를 해야 함

  - 명시한 함수 타입과 같아야 함수를 인자로 넘길 수 있음

  ```swift
  func printResult(_ function : (Int, Int) -> Int, _ a:Int, _ b: Int){
    let result = function(a, b)
    print(result)
  }
  printResult(add, 10, 5)
  ```



## 옵셔널 (Optional)

- 값이 없을 경우 표현해주는 방식

- nil

  - 존재하지. 않음을 표현할때 사용

- var(let) 변수명 : 타입 **?**

  - 물음표가 옵셔널 형태로 타입을 선언하는 방식
  - 없을때는 nil 할당 가능

  ```swift
  let num = Int("10") // type은 Int? -> 변환이 될 수 도 안될 수도 있기 때문
  // 문자열이 변환이 가능 할 수도 없을 수도 있기 때문
  ```

- 옵셔널 변수로 선언한 값을 출력하면 `Optional("값")` 형태로 나옴
  - 이것에서 값 만을 가져오기위해 아래의 방법들을 사용 

### Forced unwrapping

- 옵셔널이란 박스 안의 값을 억지로 꺼내서 사용할때 사용하는 방식
- 옵셔널에서 값을 가져올때 억지로 가져오는 것
- `옵셔널변수!`
  - 느낌표를 사용해서 강제로 가져오는 것을 표현 (값 존재 유무에 상관 없음)
  - 값없을때 사용하면 시스템이 경고 줌

### Optional binding (if let)

- 부드럽게 박스를 까보자1
- value 가 있는 경우에 변수에 할당하고 수행
- 없는 경우에는 밑에 수행

### Optional binding (guard)

- 부드럽게 박스를 까보자2
- 복잡성 레벨을 낮출 수 있음
  - cyclomatic complexity
- throw 혹은 return을 해야함

### Nil coalescing

- 박스를 까봤더니, 값이 없으면 디폴트 값을 넣자
- `??` 이용

```swift
var carName : String?
carName = "탱크"
print(carName!) // Forced unwrapping

if let unwrappedCarName = carName { // optional binding
  print(unwrappedCarName)
} else {
  print("no car")
}

func convertString(from : String?) {
  guard let parsedInt = Int(from) else { // guard
    print("Int로 컨버팅 불가")
    return
  }  
  print(parsedInt)
}


let myCarName: String = carName ?? "모델 S" // nil 일경우 default 값 삽입
```

