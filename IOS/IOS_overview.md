# ios overview

- swift UI 는 version 13 이상부터 사용가능
  - 나중에 배워야 하는건 맞음
- viewcontroller
  - 페이지 하나를 관리하는 역할
- 버튼 이벤트 할당시 컨트롤 플러스 원하는 위치로 드래그
  - 반대로 코드를 작성하고 코드라인에 있는 `+`버튼을 이용하여 끌어와서 버튼과 연결가능



## UIKit

- 모든 컴포넌트는 UIKit 이라는 프레임워크 안에 있음

- 변수 사용시 `\(변수명)` 을 이용하여 변수 사용 가능
- UILabel 과 ViewControl 연결 하는 방법
  - Control 눌러서 드래그해서 ViewController와 연결
  - connection은 outlet 설정
  - viewDidLoad에 라벨의 text를 설정해주는 값을 넣어줌 -> 업데이트 시켜줌
- var
  - variable 변수 (적게 사용 추천)
- let
  - constant 상수 (많이 사용 추천)
- 함수는
  - func 키워드 이용하여 생성

## 타입추론

- 직접 적지 않아도 스위프트에서 어느정도 타입을 알아서 추론 함
- option 누르고 클릭하면 타입을 알 수 있음
- 원래는 `let 변수명:타입` 형태로 타입을 명시해 주어야 함



## 클로저 Closure

- 실행가능한 코드 블럭
- 실행가능한 코드블럭이 파라미터로써 넘겨질 수 있음
- 사용법 `{코드블럭}` 



## 스타일링

- 아이폰은 3가지 이미지 지원
  - 1x, 2x, 3x -> 해상도 차이
  - 1x는 저화질용(아이폰4), 2x(아이폰8), 3x는 고화질 용
  - 이미지는 Assets.xcassets로 드래그 해서 가져오면 됨
  - 이미지 이름에 뒤에 `@2x` 를 붙이면 xcode에게 2x용 이미지라고 말하는 뜻
    - 대부분 2x, 3x만 있으면 됨
  - 화면이 꽉 차지 않으면 content mode를 aspect fill 로 변경해주면 됨
- system color로 설정하면 라이트모드나 다크모드나 둘다 잘 보이도록 해줌

### 오토레이아웃 (autolayout)

- 어떤 디바이스든 우리가 구성한대로 보여주는 것

- view -> add missing constraints

  - 임의로 오토레이아웃 잡음
  - 깨질 수 있으므로 우리가 직접 설정하는게 좋음

- 방식

  1. constraint 삭제
  2. 컨트롤(control) 누르고 원하는 부모뷰와 관계 정의
     - 쉬프트 누르면서 하면 동시에 여러개 가능
  3. 사이즈, 위치 설정

  - 정보가 하나라도 빠지면 빨간색이 뜸



### 앱 아이콘

- Assets.xcassets -> AppIcon
  - 설정에 따라 아이콘 선택 가능
  - 큰 이미지를 가지고 app icon generator 사이트에서 만들 수 있음



### Display Name

- 앱 이름 변경