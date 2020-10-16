# UML

> https://fumin.tistory.com/45
>
> http://www.nextree.co.kr/p6753/

## 구성

- 구조 다이어그램 7개
- 행위 다이어그램 7개

### Class

![class](http://www.nextree.co.kr/content/images/2016/09/--3----.png)

- 이름, 속성, 기능
- `-` : private
- `+` : public
- 메소드 밑줄 (`__`) : static 의미
- `{readOnly}` : final 뜻함

- 스트레오 타입
  - `<< >>`
  - 기본 요소 외에 추가적인 확장요소 나타냄
  - ex. `<<interface>>`, `<<utility>>`, `<<abstract>>`, `<<enumeration>>`



### Abstract Class / Method (추상 클래스 / 메서드)

![abstract](http://www.nextree.co.kr/content/images/2016/09/--5------.png)

- 구현체는 없고 명세만 존재
- 클래스 이름과 메서드에 _이탤릭체_ 혹은 `{abstract}`



## 클래스간의 관계

![class_relationship](http://www.nextree.co.kr/content/images/2016/09/--6-----------.png)



### 일반화 (상속)

![generalization](http://www.nextree.co.kr/content/images/2016/09/--7-Generalization1.png)

- 부모와 자식 관계
- 부모는 화살표가 가리키는 곳
- 실선, 화살표로 연결



### 실체화 (구현)

![realization](http://www.nextree.co.kr/content/images/2016/09/--8-Realization.png)

- 인터페이스 쪽에 비어있는 삼각형 가리키는 방향
- 점선과 화살표로 나타냄



### Dependency (의존)

![dependency](http://www.nextree.co.kr/content/images/2016/09/--9-Dependency.png)

- **가장 많이 사용됨**
- 어떤 클래스가 다른 클래스를 참조함
  - User가 Schedule을 참조함



### Association (연관), Directed Association (방향성 있는 연관)

![association](http://www.nextree.co.kr/content/images/2016/09/--11-Assocication.png)

- 다른 객체의 참조를 가지는 필드
- 화살표 방향은 참조하는 방향
  - User가 Address를 참조



### Aggregation (집합)

![aggregation](http://www.nextree.co.kr/content/images/2016/09/--16-Aggregation.png)

- whole(전체)와 part(부분)의 관계를 나타냄
- whole 쪽이 비어있는 다이아몬드
- aggregation과 association은 개념적으로는 차이가 있지만 코드적으로는 차이가 없음
  - aggregation 사용 비추



### Composition (합성)

![합성](http://www.nextree.co.kr/content/images/2016/09/--19-Composition1.png)

- composition은 aggregation 보다 강한 집합
- part가 whole에 종속적이어서 part가 whole의 소유
  - aggregation은 whole이 part를 빌려쓰는 것
- part를 가지는 whole이 part 인스턴스의 전체 수명을 책임짐
- part에 해당하는 인스턴스는 공유 불가
- whole 인스턴스가 part 인스턴스를 생성
- whole 인스턴스가 소멸되면 part 인스턴스도 함께 소멸
- whole 인스턴스가 복사되면 part 인스턴스도 함께 복사