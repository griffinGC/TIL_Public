# ARC (Automatic Reference Counting)

> https://jinshine.github.io/2018/07/08/iOS/ARC(Automatic%20Reference%20Counting)/
>
> https://wingsnote.com/32
>
> https://onelife2live.tistory.com/10
>
> https://sujinnaljin.medium.com/ios-arc-%EB%BF%8C%EC%8B%9C%EA%B8%B0-9b3e5dc23814
>
> https://medium.com/@seungh93/swift-arc-retain-cycle-strong-reference-cycles-3e44a314b8a8
>
> https://baked-corn.tistory.com/30
>
> https://jmkim0213.github.io/ios/swift/2019/02/08/weak_Vs_unowned.html

- 개발자가 직접 관리해야하는 reference counting을 자동으로 관리해주는 기능
  - 일정의 메모리 관리를 자동화 해주는 기능
  - 가비지 컬렉션과는 다름

- 프로그래머들이 메모리를 직접 release 할 필요가 없게 해줌
- 가비지 컬렉션
  - **실행 타임**에서 메모리 관리
- ARC
  - **코드를 빌드 (컴파일) 시** 컴파일러가 프로그래머 **대신 retain, release 코드를 적절한 위치에 넣어 주는 것**

- Objective-C코드는 ARC를 지원하지만 C/C++코드는 ARC를 지원하지 않기 때문에 **둘이 혼용해서 사용할때 주의 필요**
- Objective-C는 MRC, ARC 둘다 지원, Swift는 ARC만 지원
  - MRC는 Manual Referencing Counting
- Heap에 저장된 데이터를 필요하지 않은 시점에 직접 제거해야하는데 메모리 관리 모델이 관리해줌
  - **즉, Heap 메모리 관리해줌**
  - Stack에 저장된 데이터는 자동으로 제거되기 때문에 특별한 관리는 필요 없음

- 컴파일 타임에 삽입된 `retain`, `release` 를 통해 reference Count 를 관리하다가 count가 0이 되면 `deinit` 을 통해 메모리 해제 시킴

- **retain cycle에 유의 해야 함**
  - 강한 참조 사이클이라고 불리기도 함



## Reference Count

- Objective C에서 기본적으로 사용하는 메모리 관리 모델
- 인스턴스는 하나 이상의 Owner가 있는 경우 메모리에 유지됨
- 소유자(Owner)가 없다면 그 즉시 메모리에서 제거 됨
  - 제거 시점을 파악하기 위해 **각 인스턴스의 소유자 수**를 저장하는데 이것을 **Reference Count** 라고 부름
- 강한(Strong) 참조는 참조될 때마다 **참조 카운트 1증가**
- 약한(Weak) 참조, 미소유(Unowned) 참조는 **참조 카운트 증가 안함**



## MRC

- 개발자가 직접 메모리 관리하는 코드를 작성해야함
- 인스턴스의 기본 메서드인 retain과 release를 호출해야함
- 코드양이 많아지고 메모리 오류 가능성이 높아짐
  - 프로그램의 안정성이 낮아짐



## Retain Cycle (Strong Reference Cycle)

- 강한 참조 사이클(Strong Reference Cycle) 이라고도 부름
- 메모리가 해제되지 않고 유지되어 **메모리 누수**가 생기는 현상
  - 결국 메모리 사용량이 증가하게 되고, 메모리 사용량이 높다면 iOS가 어플리케이션을 죽이게 됨
  - 앱이 느려지거나 오류를 발생시키는 원인

- 서로를 참조하고 있을때 발생할 수 있음

  - 서로를 참조하고있는데 거기에 다시 nil을 할당할때 더 이상 참조에 대해 접근이 불가능

    ```swift
    var test1 : TestClass? = TestClass()
    var test2 : TestClass? = TestClass()
    
    test1.testClass = test2
    test2.testClass = test1
    
    test1 = nil // deinit 수행 안됨
    test2 = nil // deinit 수행 안됨
    ```

    

- 해결방안
  - 객체에 대한 래퍼런스가 **strong이 디폴트** 이기 때문에 이것을 바꿔주면 됨
  - weak으로 변경 
    - 참조는 할 수 있지만 Reference Count가 증가되지 않음
    - 객체의 메모리가 해제된 그에 대응하는 변수는 자동으로 nil이 될 것임
    - 대신 Optional 타입이어야 함
  - unowned로 변경
    - 옵셔널이 아니기 때문에 메모리가 해제 된 다음에 접근할 경우 runtime exception 발생할 수 있음
    - 해당 변수가 가리키는 객체의 메모리가 해제된 이후에는 해당 영역을 가리키지 않는다는 확신이 있을때 사용해야 함



## Strong Reference 강한 참조

- 순환 참조를 발생시키는 원인
- default 참조



## Weak Reference 약한 참조

- `weak var foo`
- Reference Count를 증가시키지 않기 때문에 순환 참조를 방지할 수 있음
- Optional 만을 가짐



## Unowned Reference

- Weak과 마찬가지로 Reference Count를 증가 시키지 않아서 순환 참조 방지 가능
- non-optional 인 경우에만 사용 가능
- 위에서 원인 설명