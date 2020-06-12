# Vue bind

- 디렉티브 (지시문)

- 태그 안에 넣음

- 사용방법

  - 동적으로 하나 이상의 컴포넌트 속성 또는 표현식을 바인딩
  - class 또는 style 속성 묶는데 사용될때, Array 나 Object 같은 추가 값 유형 지원
  - 속성 바인딩에 사용할때 속성은 하위 컴포넌트에서 올바르게 선언 되어야 함
  - 전달인자 없이 사용하면 "속성이름-값" 쌍을 포함하는 객체를 바인딩하는데 사용가능
    - 이 모드에서는 class와 style은 Array나 Object는 지원 안함

- `v-bind` 생략가능

  - 약어로 `:` 로 사용 가능
  - `v-bind:class` => `:class`

  - `v-bind:class = "{ }"`, `v-bind:class =" "`, `v-bind:class="active"`
  - `v-bind:style = "{color:red, ...}"` (camelcase로 정의), `v-bind:style="color:red, ..."`

- 뒤에 오는 인자

  - any (with argument) | Object (without argument)

- 조건에 따라 작동하게 만들기

  - ```vue
    <p v-bind:class="{active:isActive}"> active </p>
    ```

  - active : 클래스명 / isActive : 데이터

  - isActive가 true 이면 active가 나옴

  - 클래스 제어가능

    

    