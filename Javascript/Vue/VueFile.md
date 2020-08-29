# Vue

- .sync 수식어
  - .sync 수식어를 가지는 속성을 변경하면 값의 변경이 부모에도 반영 됨

- $nextTick

  > https://kr.vuejs.org/v2/api/#Vue-nextTick

  - nextTick으로 감싼 뒤 callback을 통해 DOM을 조작하게 되면 Vue.js에서 데이터 갱신 후 UI까지 완료한 뒤에 nextTick에 있는 함수를 최종적으로 수행
  - 다음 DOM 업데이트 사이클 이후 실행하는 콜백을 연기
    - UI가 먼저 렌더링 되고 콜백 함수 실행 됨
  - DOM 업데이트를 기다리기 위해 사용하는 것으로 일부 데이터를 변경한 직후 사용해야 함

### watch

> https://ui.toast.com/weekly-pick/ko_20190307/

- deep
  - 속성 내부가 변경되었다는 것을 알려주기 위해 watch 안에 속성으로 넣어 주는 것
