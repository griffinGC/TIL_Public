# Typescript 자료형

> 타입스크립트 자료형 정리



## 자료형 종류

- Boolean

  - `boolean` 
  - true / false

- Number

  - `number` 
  - 실수형

- String

  - `string` 
  -  `"` , `'` 모두 사용 가능
  - 백틱과 `${변수}` 이용 가능 

- Array

  - `자료형[]`  방식과 `Array` 방식 2가지 존재
  - `Array` 는 제네릭 타입 `Array<elemType>` 의미

- Tuple

  - 튜플은 정해진 숫자만큼의 원소를 정확히 표현하기 위한 배열

    - 즉, 원소의 숫자만큼 자료형을 적어줘야함
    - 자료형을 2개를 적었는데 원소를 3개를 지정할 수는 없음

    ```typescript
    let x : [string, number];
    x = ["Hi", 0];
    // tuple을 2개만 정의 했기때문에 오류 발생
    x = ["Hello", 0, 1];
    // tuple의 자료형이 틀렸기 때문에 오류 발생
    x = [0, 'ok'];
    ```

    

- Enum

  - `enum`

  - C# 에 있는 것과 비슷한 열거형

  - 값을 초기화 하지 않으면 0부터 지정됨

    ```typescript
    enum Color{
      Green, 
      Red,
      Blue
    }
    let loveColor : Color = Color.Green; // 0 의미
    let loveColor2 : Color = Color.Red // 1 의미
    ```

- Any

  - `any`
  - 작성할때 타입을 모를 경우 사용
  - 동적으로 사용 가능
  - 자바스크립트에서 사용할때 매우 강력함
  - `Object`와는 다름. 
  - 값을 지정할 필요가 없음

- Void

  - `any`와 비슷함
  - 함수 리턴할때 사용함 (리턴 값 없는 걸로)
  - 변수 선언시에는 그다지 유용하지는 않음
  - `null`과 `undefined` 만을 값으로 가짐

- Never

  - 절대 일어나지 않는 값 타입을 나타냄
  - 함수의 리턴형으로 사용
    - 예외를 던지거나 아무것도 리턴하지 않음
  - 어떠한 값도 할당 불가

- Object

  - 기본형이 아닌 타입
    - `number`, `string`, `boolean`, `symbol`, `null`, `undefined`  같은 것이 아닌 것



## Type assertion

- 다른 언어의 type cast와 비슷한 개념

- 특별한 체크나 데이터의 재구조화는 없음

- 2가지 방법 존재

  - `angle-bracket`

    ```typescript
    let someValue : any = "this is a String";
    let stringLength : number = (someValue).length;
    ```

  - `as`

    - JSX 사용시에는 이것만 가능

    ```typescript
    let someValue : any = "this is a String";
    let stringLength : number = (someValue as string).length;
    ```

    



## Typescript 테스트 사이트

> https://www.typescriptlang.org/play/#





## 출처

> https://www.typescriptlang.org/docs/handbook/basic-types.html
>
> https://ahnheejong.gitbook.io/ts-for-jsdev/