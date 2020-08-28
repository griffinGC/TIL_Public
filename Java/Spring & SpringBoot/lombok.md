# Lombok

- Entity를 때 편리하게 사용할 수 있게 만들어주는 플러그인
- 사용하려면 maven 혹은 gradle에 추가를 해주어야 함

- **JPA를 사용한다면 반드시 @Entity를 붙여 주어야 함!**



## @Data

> https://projectlombok.org/features/Data

- getter와 setter를 생성해줌
- @ToString
- @EqualsAndHashCode
- @Getter
- @Setter
- @RequiredArgsConstructor
- 모두 수행

## @Getter

- 선언된 모든 필드의 getter를 생성해줌

## @RequiredArgsContructor

- `final`로 선언된 모든 변수들이 포함된 생성자를 생성해줌
- `final`이 안들어 있으면 생성자 생성 안됨
  - 고로, 만들때는 되도록이면 `final` 로 변수를 선언하는것이 좋음



## @EqualsAndHashCode

- `equals`와 `hashcode` 를 자동으로 생성해줌

## @Include와 @Exclude

> https://java.ihoney.pe.kr/510

- 이를 이용하여 필드에서 `toString()`, `equals()`, `hashcode()`를 사용할 필드를 지정할 수 있음'

- `(onlyExplicitlyIncluded = true)`를 적어줘야 적용가능

