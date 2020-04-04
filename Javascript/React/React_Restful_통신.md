# React Restful 하게 통신하는 방식

- 2가지 방식 존재
  1. `Axios` 사용하는 벙식
  2. 내장 라이브러리 사용하는 방식



## 내장 함수 이용

- `fetch()` 함수 이용
- 데이터를 가져오는데 시간이 걸리기때문에 비동기 처리를 꼭 해주어야함
  - 간단히 `async .... await` 방식을 사용예정

```javascript
async componentDidMount(){
  const url = "가져오고싶은 주소";
  // await 이용 비동기 걸어줌
  const response = await fetch(url);
  // 가져온 객체를 json형식으로 변경해줌
  const fetchedData = await response.json();
  // state에 저장
  this.setState({data : fetchedData});
}
```





## 출처

> https://www.youtube.com/watch?v=T3Px88x_PsA