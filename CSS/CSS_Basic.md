# CSS Basic

- **CSS는 속성이 겹치면 뒤에 있는 것이 적용 된다.**
- 가장 위에 위치할때
  
  - z-index: 999;
- 밑에 라인
  - border-bottom: 1px solid rgba(0,0,0,0.1);
  - rgba는 불투명도 opacity를 주기 위함
    - rgba(red, green, blue, 투명도);
- 높이값은 헤더가 아닌 자식들에게 줌
  - 컨텐츠를 쓸 경우 안에있는 자식에게 적용하기 위함
  - 같은 이유로 inner를 만들어줌
- 가운데 정렬
  
  - margin: 0 auto;
- 백그라운드 이미지는 넣는 순간 여백을 차지 하지 않음. 공간을 차지하지 않음
  - 이미지로 넣어줄때 형태를 넣어줘야 함
  - sprite 사이트 이용하면 편함

- display

  > https://www.daleseo.com/css-display-inline-block/

  - inline
    - 다음 element와 나란히 배치 됨
    - 단, width, height 속성 지정해도 무시됨

  - inline-block
    - element의 넓이와 높이 지정 가능
      - 즉, 형태 지정 가능
    - 다음줄에 다음 element가 오는게 아니라 바로 뒤에 옴
    
  - block
    - 다음 element 밀어내고 혼자 한 줄 차지함
    - width, height, padding, margin 모두 삽입 가능
    
  - float 속성 사용하면 가로 배치 가능

  - flex

    - flex 속성을 이용하면 손쉽게 가로 배치 가능

    > https://velog.io/@bearsjelly/css-flex

    - 정렬하고자 하는 대상의 **부모**에게 주는 속성
      - 즉 내가 menu > menu-list에 속성을 주고 싶다면 부모인 menu에다가 flex 속성을 주어야 하는 것
    - flex-direction
      - 방향설정 가능
      - column : 세로 배치 받으라는 것
        - flex-direction: column;
    - justify-content 제공
      - center 가운데 정렬 기능
      - space-between 알맞게 분배하는 기능
      - 주 축의 정렬방법 설정
    - 세로 가운데 정렬
      - align-items: center;

- a 태그로 감싸서 문제 생길경우

  - 자식을 타고 들어감 `>` 같은 것 이용해서
    - `#header .inner .logo > a{ color: transparent; }`

- inline 태그를 동일선상에 알맞게 배치시키는 법

  - 위치의 태그를 잡은 다음에 vertical 줌

    ```css
    #header .inner .logo div{
      vertical-align: middle;
    }
    ```

- 가상 선택자
  - 태그 뒤에 `:` 콜론이 한개 오는 것은 가상 선택자 뜻함
  - after 같은 것이 존재
    - 무조건 `content: '';` 라는 공백을 받아야 함
- position : absolute
  - 부모를 기준으로 위치를 잡는 애
  - 그러므로 부모한테 absolute, fixed, relative 셋중 하나를 가지고 있어야 함

- margin vs padding
  - 시계방향 회전
    - **위, 오른쪽, 아래, 왼쪽**
  - 2개만 줄 경우, 위아래, 좌우
  - margin
    - 바깥쪽 여백
  - padding
    - 안쪽 여백
  - 컨텐츠를 밀때 margin으로 하면 margin 병합 현상이 일어날 수 있음. 그러므로 컨텐츠를 밀때는 위에서 아래로 밀어줌
  - 아래 컨텐츠가 어쩔수 없이 위를 밀어줄대는 padding-top 사용 
- border-radius: 3px;
  - 라운딩 주는 것
  - 50% 주면 정원이 됨
- outline
  - 포커싱 (클릭) 했을때 파란색 나오는 것
  - none으로 속성주면 아무것도 안뜸

- input 이랑 div랑 같이 div로 묶고, input 위에 div를 위치 시킬 경우

  - input이랑 div랑 같이 묶은 것을 position: relative 설정

  - input위에 올릴 div

    - position: absolute설정

    - 가운데 가는 공식 사용

      - transform: translate(-50%, -50%);
        - 절반만큼 미는 속성 => 이 이동하는 속성은 중심을 기준으로 이동
        - top, left는 왼쪽 상단 꼭지점을 기준으로 50%

      ```css
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      ```

- 속성 선택자

  - `::` 콜론2개를 이용하여 속성선택자 가능
  - input의 placeholder 속성에 css주고 싶을때 사용 가능

- `~`

  - 근처에 있는 태그중에 가장 옆에있는것 찾음
  - 같은 depth 의미

- pointer-events: none;

  - 포인터로 인식하지 못하게 함

- overflow 속성

  > https://www.codingfactory.net/10599

  - 내용이 지정한 범위를 넘어갔을때 설정하는 법

- 스크롤

  - 세로 스크롤

    - x축 넘치면 가려줌
    - y축 넘치면 자동

    ```css
    overflow-x: hidden;
    overflow-y: auto;
    ```

  - 가로 스크롤

    - x 넘치면 자동
    - y 넘치면 가려줌

    ```css
    overflow-x: auto;
    overflow-y: hidden;
    ```

  - 한번에 조절

    - 앞이 x축 뒤가 y축
    - 단, IE에서 문제 발생할 수 있음

    ```css
    overflow: hidden auto;
    ```

## 반응형 설정

- 헤드 태그안에 메타태그 설정이 있어야 함

  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  ```

- 미디어쿼리

  - @media
  - 넓이를 %로 줌

  ```css
  1000px 이상일 경우 위에 있는것 무시하고 아래 실행
  @media screen and (max-width:1000px){
    ...
    .contents{
        width: 61.4%;
    }
  }
  ```

  



## 궁금증

1. a 태그 안에 넣은 div 두개는 나란히 정렬되었는데, 왜 search_box 태그 안에 넣은 input과 div는 서로 줄바꿈 되어서 정렬되어있나?
   - div가 기본적으로 줄바꿈이라는 속성을 가지고 있기 때문



## 참고자료

> https://code.tutsplus.com/ko/tutorials/the-30-css-selectors-you-must-memorize--net-16048