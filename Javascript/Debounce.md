# Debounce

- Lodash의 메소드중 하나
- 주어진 밀리세컨드 이내에 연속으로 이벤트가 발생한 경우, 더 이상 이벤트가 발생하지 않을 때까지 일단 대기
- 마지막 이벤트가 끝난 시점을 기준으로 주어진 밀리세컨드 이후 콜백으로 주어진 함수가 실행
- 형태
  - `_.debounce(func, [wait=0], [options={}])`
    - wait까지 기다렸다가 콜백 함수 실행



## 출처 

> https://lodash.com/docs/4.17.15#debounce
>
> https://chaewonkong.github.io/posts/debounce-js.html
