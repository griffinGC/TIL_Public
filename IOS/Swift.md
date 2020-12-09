# Swift

## 출력

- print
- dump

## Variable vs Constant

- var
  - variable
  - 변수를 줄이는게 메모리 사용량을 줄여서 더 좋은 퍼포먼스를 낼 수 있음
- let
  - constant



## Int & String

- Int
  - 정수형 타입
- String
  - 문자열 타입
  - `"\(변수명)"`



## CGFloat

- 코어 그래픽과 관련된 프레임워크에서 실수 값을 나타내는 기본 타입



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
  let num = Int("10") // type은 `Int?` -> 변환이 될 수 도 안될 수도 있기 때문
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



---

## 배열

- 형태
  - `var 배열명 : [타입명] = [값1, 값2, ...]`
  - `var 배열명 : Array[타입명] = [값1, 값2, ...]`
  - `var 변수명 = [타입]()`
  - `var 배열명 : [타입명] = []`
- 값 추가
  - `배열명.append(값)`
  - `배열명 += [값1,값2,...]`
  - `배열명.append(contentsOf: [값1, 값2])`
  - 파이썬 처럼 배열끼리 더할 수 있음
  - 특정위치 삽입
    - `배열명.insert(값, at:위치)`
- 값 개수
  
- 배열명.count
  
- 값 가져오기

  - 배열명.first 

    - 첫번째 원소를 optional로 가져옴 (nil 일 수도 있기 때문!)

    - 여기에 뒤에 클로저 사용가능

      ```swift
          let lectureName = lectures.first {(lec) -> Bool in
              return lec.lecturer == lecturer
          }?.className
      ```

      

      

  - index로도 가져올 수 있음

  - index를 range 타입으로 넣을 수 있음

    ```swift
    let numbers = evenNumbers[0...3] # 0,1,2,3 번째까지 가져옴
    ```

  - 반복문에서 파이썬처럼 enumerate 같은것 사용가능

    - 배열명.enumerated

    ```swift
    for (index, num) in evenNumbers.enumerated(){
      print("\(index), \(num)")
    }
    ```

  - 배열명.prefix(N)

    - 앞의 N개 만큼 가져옴

  - 배열명.suffix(N)

    - 뒤의 N개 만큼 가져옴

- 포함여부
  
- 배열명.contains(값)
  
- 최대, 최소
  
- 배열명.max(), 배열명.min()
  
- 값 삭제
  - 배열명.removeAll() 혹은 빈거 대입
  - 배열명.remove(at:특정위치)
  - 배열명.dropFirst(숫자)
    - 숫자의 갯수만큼 앞의 삭제
    - 실제 배열에는 영향 미치지 않음
  - 배열명.dropLast(숫자)
    - 숫자 갯수만큼 뒤의 원소 삭제
    - 실제 배열에는 영향 미치지 않음

- 값 변경
  - 일반적으로 변경가능
  - 구간을 통째로 변경 가능
    - `배열명[0...2] = [-2, 0, 2]`
  - 값 swap
    - `배열명.swapAt(위치1, 위치2)`
    - 위치1과 위치2의 값 변경



## 딕셔너리

- 순서 없음

- 키와 value로 구성됨

- 형태

  ```swift
  var 변수명:[키타입 : 값타입] = [키1 : 값1, 키2 : 값2]
  var 변수명: Dictionary<키타입 : 값타입> = [키1 : 값1, 키2 : 값2]
  ```

- 값을 가져올때는 optional binding을 사용하면 좋음

- 딕셔너리.isEmpty

- 딕셔너리.count

- nil로 기존 값을 업데이트하면 딕셔너리에서 사라짐

- 반복문에서 사용

  - 나오는 순서 보장 못함

  ```swift
  for (name, score) in scoreDic{
    print("\(name), \(score)")
  }
  
  for key in socreDic.keys{
    print(key)
  }
  ```



## Set

- 유일한 값을 가지는 타입

- 형태

  ```swift
  var 변수명 : Set<타입> = [값1, 값2...]
  // 들어갈때 중복된거 제거되서 들어감
  ```

- 이름.isEmpty

- 이름.count

- 이름.contains(값)

- 이름.insert(값)

- 이름.remove(값)



## Closure (클로저) -> Closure expression 의미

> https://axe-num1.tistory.com/18

- 레퍼런스 타입

- 이름이 없는 메서드

  - `in` 키워드는 정의부와 실행부를 분리하기 위함

    > https://academy.realm.io/kr/posts/closure-and-higher-order-functions-of-swift/

  ```swift
  {(매개변수목록) -> 반환타입 in 
  	실행코드
  }
  var multiplyClosure : (Int, Int) -> Int = { (a, b) -> in
      return a * b}
  var multiplyClosure : (Int, Int) -> Int = { $0 * $1 }
  
  
  // closure 이용
  // 리스트에 클로저 사용해서 리턴 (옵셔널로 리턴됨)
  let lectureName = lectures.first {(lec) -> Bool in
  	return lec.lecturer == lecturer
  }?.className ?? ""
  ```

- 인자로 함수를 넘기는 곳에 클로저를 삽입 할 수 있음

- Trailing Closure (후행 클로저)

  - 여러줄의 실행코드가 들어갈때 사용
  - 코드를 메서드의 바로 뒤에 추가
  - 메서드가 하나의 클로저만을 인자로 전달할때, 메서드의 소괄호 생략 가능

- 클로저 간소화



## 구조체와 클래스

### 구조체 (Structure)

- **Stack**에 생성됨
  - 속도 빠름
  - 당장 처리해야 하는것은 스택에서 사용
  - 효율적이고 빠름 
  - 자동으로 data 제거
- value type
- 복사 가능
- 구조체를 a라는 변수에 할당하고 a를 b라는 변수에 할당하면 b라는 변수에도 새로운 구조체가 복사되서 할당됨 (공유하는 것 아님)

```swift
struct Store{
  let x: Int
  let y: Int
  let name: String
  
  func isDeliverable(userLoc: (x: Int, y: Int)) -> Bool{
    
  }
}
```

### 프로토콜 (protocol)

> https://baked-corn.tistory.com/26

- 구현되어야 하는 메소드나 프로퍼티

- 구조체, 클래스, 열거형에서 프로토콜 사용 가능

- 예를 들면 서비스를 이용해야 할 때, 해야할일들의 목록

  - **반드시 포함해야 하는 메서드와 프로퍼티**

- CustomStringConvertible 프로토콜의 description

  - 그것에 대해 설명하는 글
  - 출력하면 자동적으로 description이 출력됨

  ```swift
  struct Store: CustomStringConvertible{
    var description:String{
      return "title \(title)"
    }
    ...
  }
  ```

- Conforming

  - 해야할 일을 코드로 구현하는 작업

- 고급 프로그래밍을 위해서는 자주 사용됨

- 다중 상속은 지원 안하나 다중 채택은 지원함

  > https://baked-corn.tistory.com/26

- 약간 느낌상 인터페이스 같음

  - 단, 자바의 경우 초기값 설정 가능하나, 프로토콜은 불가
  - 스위프트의 경우 프로토콜이라도 `optional` 이라는 키워드를 함수 앞에다가 붙이면 모두 구현할 필요는 없음



### 클래스 (Class)

- **Heap**에 생성됨
  - 느림
  - 동적으로 메모리 할당 가능
  - 자동으로 데이터 제가 안함
    - 개발자가 신경써야하는데 이것을 xcode 같은데서 해줌
  - 클래스 인스턴스는 Heap에 생성되나 그 클래스 인스턴스를 저장하는 변수는 스택에 생성됨
    - 클래스 인스턴스를 저장하는 변수는 주소를 가지고 있음
- reference type
- 공유 (복사 아님)
- 구조체를 a라는 변수에 할당하고 a를 b라는 변수에 할당하면 b라는 변수와 a는 서로 같은 객체를 공유 (복사하는 것 아님)
- 클래스 메소드에서는 `mutating` 키워드 사용안함



### 프로퍼티

- stored property

  - 값을 할당해서 가지고 있는 변수

  ```swift
  let name: String
  ```

  

- computed property

  - 값을 계산해서 가지고 있는 변수
  - 값을 직접 저장하지 않고 저장된 정보를 이용해`서 가공 혹은 저장할때 사용
  - 접근할때 마다 다시 계산 됨
  - 원래는 readOnly (getter)
  - 프로퍼티간의 관계를 셋팅하게 하려면 getter(get), setter(set) 이용해서  넣어줘야함

  ```swift
  var description: String? {
    return "Title: \(name), Teacher: \(instructor)"
  }
  
  var fullName: String? {
    get{
      return "\(firstName) \(lastName)"
    }
    
    set {
      if let firstName = newValue.components(separatedBy: " ").first {
        self.firstName = firstName
      }
      if let lastName = newValue.components(separatedBy: " ").last {
        self.lastName = lastName
      }
    }
  }
  ```

  

- type property

  - 생성된 인스턴스와 상관 없이 만들 수 있음
  - 스트럭트의 타입 자체의 속성을 정의하고 싶을때 사용
  - static 이용

  ```swift
  struct Person {
    ...
    static let isAlien: Bool = false
  }
  ```

  

- 프로퍼티가 바뀐 시점을 알 수 있음
  - stored property의 경우 `didSet{...}` 이용
    
    - 값이 셋팅되고 나서 알 수 있음
    
    ```swift
    struct Person {
      var firstName: String{
        // 바뀌는 시점에 출력
        didSet{
          print("didSet: \(oldValue) ---> \(firstName)")
        }
      }
    }
    ```
    
  - 값이 세팅되기전에는 `willSet{...}` 이용
  
    - didSet 직전에 수행됨
  
    ```swift
    struct Person {
      var firstName: String{
        willSet{
          print("didSet: \(oldValue) ---> \(firstName)")
        }
      }
    }
    ```
  
  - willSet -> didSet 수행
  
    - 시점이 willSet이 먼저
  
  
  
  
  
- lazy property
  - 해당프로퍼티가 접근될때 그제서야 실행되는 것
  - lazy키워드를 변수에 붙이고, 변수 뒤에 할당하는것으로는 코드 블럭 `{}`
  - 최적화 하기 위해서 사용
    - 지금 굳이 알필요 없는 것들은 미뤄서, 실제로 사용자가 접근할때 사용하기 위해서 사용
    - 모든 사용자가 접근 할 필요가 없는 경우에 사용
  
  ```swift
  struct Person {
    ...
    lazy var isPopular: Bool = {
      if fullName == "Jay Park" {
        return true
      } else {
        return false
      }
    }
  }
  ```
  
  
  
- computed property 대신 메서드를 사용하면 안되는지?
  - 둘 다 가능
  - property
    - 값을 하나 반환
  - method
    - 작업 수행
  - method가 값을 리턴하는 작업을 한다면
  - 조건에 따라 나눠봄 
    - setter가 필요하다면 computed property
    - setter가 필요 없음
      - 계산이 많이 필요? 혹은 DB 접근 필요?
        - yes -> method
        - no -> computed property

### 메서드

- 구조체 메서드가 인스턴스 내부의 stored 프로퍼티를 변경시키는 경우에는 메서드에 `mutating` 이라는 키워드 붙여야 함

- type method도 존재

- 메서드를 나중에 추가하고 싶을경우

  - extension 키워드 사용

    ```swift
    
    ```

    - 필요한 메서드 추가 가능
    - 새로운 메서드를 기존의 클래스에 넣는건 정답이 아닐 수 있다. 
      - 기존 Int 클래스 같은데에도 추가 가능
      - extension 사용 추천



## 구조체를 써야 할 때

- 두 object를 "같다, 다르다"로 비교해야하는 경우

  - 데이터 자체를 비교해야할 경우

    ```swift
    let point1 = Point(x: 3, y: 5)
    let point2 = Point(x: 3, y: 5)
    ```

- copy된 객체들이 독립적인 상태를 가져야 하는 경우

  ```swift
  var myCar = Car(owner: "JayZ")
  var yourCar = myCar //
  yourCar.owner = "Jennifer"
  
  myCar.owner // "JayZ"
  yourCar.owner // "Jennifer"
  ```

- 코드에서 오브젝트의 데이터를 **여러 스레드**에 걸쳐서 사용할 경우

  - 멀티 스레드 사용시 구조체 사용
  - value type의 경우 인스턴스가 해당 인스턴스가 카피된 유니크 인스턴스, 그래서 여러 스레드에 걸쳐서 사용될때 안전하게 사용될 수 있음
    - 한 객체에 여러 스레드가 동시에 접근했을때는 잠재적인 위험이 있음. 그런데 value 타입을 쓰면 각 인스턴스가 유니크한 인스턴스여서 이러한 위험을 피할 수 있음
    - 원본은 값이 변하지 않고 유지됨

## 클래스를 써야 할 때

- 두 object의 인스턴스 자체가 같음을 확인해야 할 때

- 하나의 객체가 필요하고, 여러 대상에 의해 접근되고 변경이 필요한 경우

  - UI application 객체가 있을때, 앱내의 여러 오브젝트에 의해서 접근이 될 필요가 있을 때

- Swift에서는 일단 Struct로 작성하고 필요할때 class로 변경 할 것

  - 언어가 struct를 많이 사용함

  > https://developer.apple.com/swift/blog/?id=10

- 다중 상속 지원 안함, 그러나 다중 상속과 유사한 기능인 프로토콜의 다중 채택 제공

- 상속이 필요하거나 데이터가 캡슐화된 하나의 인스턴스가 필요할때 사용

- 인스턴스가 소멸될 때 리소스를 확보하기 위한 작업이 필요한 때 사용

- 클래스만이 상속과 소멸 지원, 런타임에서 클래스 타입을 식별 가능

