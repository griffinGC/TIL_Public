# Vue 라이프 사이클

### 생성

- beforeCreate
  - data와 event 셋팅 x
    - data 접근 불가
- created
  - data와 event 접근 가능
  - api에서 data 받아서 data에 전달

### 마운트

- beforeMount
  - 첫 렌더링 일어나기 직전
- mounted
  - 렌더링 후 컴포넌트, 템플릿에 접근 가능

### 업데이트

- beforeUpdate
  - 데이터가 변경되어 다시 랜더링 될때

- updated
  - 데이터가 변경되어 랜더링 된 후

### 소멸, 해체

- beforeDestroy
  - 소멸되기 전에 호출
- destroyed
  - 소멸 된 후 호출

