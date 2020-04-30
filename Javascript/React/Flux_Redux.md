# FLUX & Redux

>p.249

### 특징
- 상태관리를 위한 프레임워크.
- 리액트가 없어도 사용 할 수 있음 (javascript에서 상태를 보관하기 위해서 사용하는 것임)
- 부모에서 깊은 곳에 있는 자식 컴포넌트에 상태값을 전달할 때 좋음

### 세가지 원칙

1. 전체 상태값을 하나의 객체에 저장
2. 상태값은 불변 객체
3. 상태값은 순수 함수에 의해서만 변경됨

### 리덕스 4가지 요소 (p.252)
1. 액션
2. 리듀서
3. 스토어
---


# 1. Flux

> https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207?gi=7044bccd8ee9

- Redux이전 모델

- MVC (Model, View, Controller)

- Model에서 Rendering을 위해 View로 데이터 전달 (**문제 발생**)
    - View에서 Model데이터의 업데이트 발생
    
    - 의존성 문제로 인해 다른 Model 데이터 업데이트
    
      ![modelView오류](http://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/04.png)
    
- 문제점
    - 비동기적인 변경 요청 대응 어려움
    - 하나의 변경이 다수의 변경 발생시킴
    - 데이터 흐름에 대한 Debug 어려움

- 해결책
  
    ![단방향데이터전달](http://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/05.png)
    
    - 단방향 데이터 전달
    - 새로운 데이터가 발생되면, 처음부터 흐름이 다시 시작
      - 즉, 새로운 데이터가 발생되면 Action부터 다시 시작



## Action Creator
- 모든 변경사항과 사용자와의 상호작용이 거쳐야하는 액션생성
- 애플리케이션의 상태를 변경 혹은 뷰 업데이트 원할시 액션 생상
- 생성자는 `type` 과 `payload` 를 포함한 액션 생성
  - 타입은 상수 ex. `MESSAGE_CREATE`, `MESSAGE_READ`
- 액션 생성자가 액션 메시지를 생성한 뒤,  `Dispatcher`에게 넘겨줌

## Dispatcher
- 콜백(Callback)이 등록되어 있는 곳
- 액션을 보낼 모든 스토어를 가지고 있음
- 받은 액션을 **스토어**로 쫘악 뿌리는 작업을 함
- 요청이 들어오면 일단 모든 스토어에 다 뿌림 (동기적으로 수행됨)
- 어떤 것을 할지 판단은 스토어가 함

## Store
- 여러개의 스토어가 존재함
- 특정 액션만 Subscribe하지 않음
    - 즉, 일단 모든 액션을 받은 뒤 처리할지 말지 결정
- 실행하고자 하는 로직이 들어감
- 모든 변경사항은 스토어에 의해 결정
- 어플리케이션 내의 모든 상태와 그와 관련된 로직 가지고 있음
- 스토어에 직접 변경 요청 불가
    - 무조건 정해진 절차를 따라서 스토어로 액션을 보내야 함
    - `Action creator -> Dispatcher`를 거쳐야 함
    - `Switch` 문을 통해 처리할 액션과 무시할 액션 결정
    - 스토어에서 상태 변경 완료시, 변경이벤트(change event) 내보냄
        - 컨트롤러 뷰에 상태가 변경 했다는 것을 알려줌

## View
- 상태를 가져오고 유저에게 보여줌
- 화면 갱신
- 어떤 데이터로 랜더링 해줄것인지 보여줌
- 입력 받을 화면 랜더링
- 컨트롤러 뷰
  - 스토어와 뷰 사이의 중간 관리자
  - 상태가 변경 되었을때 스토어가 컨트롤러 뷰에게 알려줌
  - 컨트롤러 뷰는 자신의 아래의 모든 뷰에게 새로운 상태 넘김



## 준비

1. 스토어는 Dispatcher에게 액션 들어오면 알려달라고 말해둠
2. 컨트롤러 뷰는 스토어에게 최신 상태를 물음
3. 스토어가 컨트롤러 뷰에게 상태 전달
4. 컨트롤러 뷰는 모든 자식뷰에게 상태 전달
5. 컨트롤러 뷰는 스토어에게 상태 바뀔 때 알려달라고 부탁



## 데이터 흐름
 #### **Action -> Dispatcher -> Store -> View**

![단방향데이터전달](http://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/05.png)



1. 사용자가 액션
2. 뷰는 액션을 준비하라고 알려줌 
3. 액션 생성자는 액션포맷을 만들어서 Dispatcher에게 보냄
4. Dispatcher는 받은 데이터 값을 Store에 알려줌
5. Store는 모든 액션을 받음
6. Store는 필요한 액션만 골라서 상태를 변경
7. Store는 자신을 Subscribe하고 있는 컨트롤러 뷰에게 사실을 알림
8. 연락을 받은 Controller View는 스토어에게 변경된 상태를 요청
9. Store가 새로운 상태를 넘겨줌
10. Controller View는 자신 아래의 모든 뷰에게 새로운 상태를 랜더링 시킴

---



# 2. Redux

> https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6
>
> http://bestalign.github.io/2015/10/26/cartoon-intro-to-redux/

- Flux에서 일부를 개선

  1. 기존의 Flux에서 스토어는 2가지를 가지고 있었음
     1. 상태 변환을 위한 로직
     2. 현재 애플리케이션 상태

     => 각각 가지고 있는 액션(로직)과 상태(state)로 분리하는 것을 수행

  2. 상태가 변경될 때마다 이전 상태를 상태 객체의 버전들을 저장하는 배열에 추가

     ![상태관리](http://bestalign.github.io/2015/10/26/cartoon-intro-to-redux/04.png)

     - 상태의 스냅샷을 생성하는것이 아닌 객체를 가리키는 새로운 포인터를 생성

     => 각각의 버전이 완벽히 독립된 객체가 필요

     ![새로운상태관리](http://bestalign.github.io/2015/10/26/cartoon-intro-to-redux/05.png)

     => 액션이 스토어로 전달되었을때, 기존의 애플리케이션 상태를 수정하는 대신, 상태를 복사한 뒤, 복사본을 수정

  3. 3rd - party - plugin 들어갈 장소 수정
  
     - Dispatcher의 업데이트와 각 Store의 업데이트를 Subscribe해야함. 
       - 이 과정을 third-party module이 쉽게 할 수 없음
  
     => 시스템의 부분에 추가하여 시스템의 부분을 다른 객체들로 쉽게 감쌀 수 있도록 만들자
  
     => 상태 변환 로직을 트리를 사용하여 구조화
  
     => 상태가 변한것을 뷰에게 알리기 위해 Store는 단 하나의 이벤트만 보냄
  
     => 그 하나의 이벤트는 모든 상태 트리가 처리 된 후 보냄
  
     ![상태트리](http://bestalign.github.io/2015/10/26/cartoon-intro-to-redux/07.png)











## Action Creators (액션 생성자)

- 어떤 메시지를 보내고 싶은지 액션 생성자에게 알려주면 나머지 시스템이 이해 할 수 있는 포맷으로 변경시켜줌
- Dispatcher로 액션을 보내지 않고, 포맷을 바뀐 뒤 액션을 돌려줌
- 모든 변경사항과 사용자와의 상호작용이 거쳐야하는 액션생성
- 애플리케이션의 상태를 변경 혹은 뷰 업데이트 원할시 액션 생성
- 생성자는 `type` 과 `payload` 를 포함한 액션 생성
  - 타입은 상수 ex. `MESSAGE_CREATE`, `MESSAGE_READ`
  - payload로 여러개의 값을 넣을 수 있음 (p.253)



## Store

- 오직 하나의 스토어 만을 가짐
- 상태 트리 전체를 유지하는 책임을 가짐
- 액션이 들어왔을때, 어떤 상태 변화가 필요한지에 대한 일은 Reducer에게 위임함
- 액션이 어떤 상태 변화를 만드는지 알 필요가 있을때 Reducer에게 물어봄
- Reducer로 부터 받은 업데이트된 상태 객체를 새로운 어플리케이션 상태로 만듬
- 상태 관리를 위해 별도로 컴포넌트 생성



## Reducer

- Root reducer는 상태 객체의 키를 기준으로 삼아 상태를 조각조각 나눔
  - 나누어진 상태 조각은 조각을 처리하는 Reducer에게 넘겨줌
- Reducer는 넘겨 받은 예전 상태를 변경하지 않고, 새로운 복사본을 만들어 거기에 모든 변경사항 적용
  - Redux의 키 아이디어
  - 고로, 상태 객체는 직접 변경되지 않고, 각각의 상태 조각이 복사 된 후 변경되고 새로운 상태 객체 하나로 합쳐짐
  - 각각 나눠져서 변경된 후, 하나로 합친다는 뜻
- Reducer는 복사되고 업데이트 된 상태 객체를 Root reducer에게 넘겨줌
  - Root reducer는 받은 업데이트 된 상태 객체를 Store에 전송
- **Reducer (복사 & 업데이트 된 상태 객체) => Root reducer => Store**



## View

- Smart Component
  - 액션에 대한 권한 처리
    - 하위의 Dumb Component가 액션을 보낼 필요가 있을 때, props를 통해 Dumb Component에 함수를 보냄
  - Store와 Dumb component 사이에서 커뮤니케이션 관리
  - 자기 자신의 CSS style을 가지고 있지 않음
  - 자기 자신의 DOM을 거의 가지고 있지 않음, 대신 DOM 요소들을 관리하는 Dumb component 관리
- Dumb Component
  - 액션에 직접 의존성 가지지 않음 (props를 통해 넘겨 받기 때문)
  - 다른 로직을 가진 다른 어플리케이션에 재사용 될 수 있음
  - 어느정도의 CSS style을 포함하고 있음



## View Layer Binding

- 스토어를 뷰에 연결하기 위해서 필요

  - `react-redux`

- 모든 컴포넌트를 스토어에 연결하는 역할 수행

- 3가지 컨셉 가짐

  1. `Provider Component`

     : `connect()`를 이용해 루트 컴포넌트 밑의 컴포넌트들이 스토어에 연결되기 쉽게 만들어줌

  2. `connect()`

     : react-redux가 제공하는 함수로, 애플리케이션 상태 업데이트를 받고 싶다면 `connect()`를 이용하여 컴포넌트를 감싸주면 됨. 그러면 `connect()`가 select를 이용하여 필요한 모든 연결을 만들어 줌

  3. `selector`

     : 직접 만들어야 하는 함수. 상태 안의 어느 부분이 컴포넌트에 props로써 필요한 것인지 지정



## 미들웨어

- Reducer가 액션을 처리하기 전에 실행되는 함수
- 상태값 변경 시 로그를 출력하거나, Reducer에서 발생한 예외를 서버로 전송하기 위해 사용



## 준비

1. 스토어 준비

   - `/src/index.js`에서  `createStore()` 이용 스토어 생성 및 어떤 reducer 사용할지 알려줌
     
- `const store = createStore(리듀서)`
  
- `/src/reducers/indx.js`에서  `combineReducers()`를 이용하여 다수의 리듀서를 하나로 묶음
  
     ```react
     const rootReducer = combineReducers({
       counter: CounterReducer
     });
     ```



2. 스토어와 컴포넌트 사이의 커뮤니케이션 준비

   - `/src/index.js`에서 Root Component는   `<Provider>` 이용 Sub Component 감싸고 스토어와 `<Provider>` 바인딩

   	```react
   	ReactDOM.render(
	     <Provider store={store}>
	       <App />
	     </Provider>, 
	     document.getElementById('root')
   	);
   	```

   - `<Provider>`는 컴포넌트 업데이트를 위한 네트워크 생성. Smart Component는 `connect()`이용 네트워크에 연결. 이로인해 상태 업데이트 받울 수 있게 만듬
   
     ```react
     // 현재 가지고 있는 상태값을 reduce와 연결시키기 위해서 사용
     function mapStateToProps(state){
         return{
             books: state.books
         }
     }
     
     // action 연결 해주는 함수
     function mapDispatchToProps(dispatch){
         return bindActionCreators({selectBook:selectBook}, dispatch);
     }
     // connect : 컴포넌트와 스테이트 연결해 주는 역할, 괄호 2개 사용
     // 첫번째괄호는 만들고자 하는 기능의 함수, 두번째괄호는 컴포넌트 이름
     // state를 books에 넣어서 반환되어진 값을 BookList와 연결시켜줌 
     // 넘겨진 것은 li태그와 사용
     export default connect(mapStateToProps, mapDispatchToProps)(BookList);
     ```

3.  액션 콜백(action callback) 준비

   - Dumb Component가 액션과 쉽게 일하게 하기 위해 Smart Component가 `bindActionCreators()`로 액션 콜백 준비

     => 콜백을 Dumb Component에 넘겨 줄수 있음

     => 액션은 포맷이 바뀐뒤 자동적으로 보내짐

   - `/src/containers/`

   

## 데이터 흐름 순서

![데이터흐름도](http://bestalign.github.io/2015/10/26/cartoon-intro-to-redux/25.png)

0. 뷰가 액션을 요청

1. 액션을 만들어서 액션 객체에 돌려줌

2. `bindActionCreator()`가 준비 과정에서 사용 되었다면 자동으로 액션이 보내짐. 그게 아니면 뷰가 직접 액션을 보냄

3. Store가 액션을 받음. Store가 상태트리와 액션을 Root reducer에게 보냄

4. Root reducer는 상태 트리를 조각으로 나눈어 Sub reducer에게 상태 조각들로 넘겨줌

5. Sub reducer는 받은 상태 조각을 복사한 뒤, 그 복사본을 변경 & Root reducer에게 변경된 복사본 돌려줌

6. 모든 Sub reducer가 변경 된 상태 조각들을 돌려주면, Root reducer가 상태 조각들을 모아 상태 트리로 만든 위, 스토어에 돌려줌. 

   Store는 새로운 상태 트리를 옛날 상태 트리와 바꿈

7. Store는 View-layer-binding에게 상태가 변경 되었음을 알림
8. View-layer-binding은 스토어에게 새로운 상태를 보내달라고 요청
9. View-layer-binding은 View에게 화면을 업데이트 하도록 요청



### Redux 흐름도

**액션 -> 미들웨어 -> 리듀서 -> 스토어 -> 뷰 -> 액션**









## 실습 순서

1. components, reducers, containers, actions 폴더를 `src` 밑에서 생성
2. `npm install --save redux react-redux` 설치 
3. Store생성 및 연결 

   - `src/index.js `

   - reducer를 가지고 store 생성 
     - `const store = createStore(reducer)`
   - App.js 실행 시 store 지정
     - `<Provider store={store}>`
4. Reducer (switch문 이용 작성) 

  - `/src/reducers` 폴더 내부에 생성
  - 리듀서는 함수에서 2가지 인자를 받아옴 -> state, action

  - Biz logic (데이터 처리, 상태 처리)
5. Root reducer에 Reducer를 추가
   - Sub reducer 생성
     - reducer 파일을 생성할때 기본적으로 인자로 `state`와 `action`을 넣어야함!
     - `state`에다가 기본 값으로 null을 설정해야함 (state는 기존의 state를 뜻함) 
     - ex. `src/reducers/reducer-books.js`
     - ex.` src/reducers/reducer-active-book.js`

6. 사용자의 요청 작업 Actions 생성 (이벤트 등)
   - `src/actions`
   - src/actions/index.js 등록 ex) selectBook
   - Action ex) type(BOOK_SELECTED), payload  (상태 값)
   - 여기서 만든 Action 데이터는 `/src/containers` 내부에 있는 파일에서 사용

7. 사용자 View (or Container) component
   - `	src/containers`
   - actions의 데이터를 불러와서 사용
   - ex) `src/containers/book-list.js`, `src/containers/book-detail.js`

8. Component하고 Reducer(Store) 하고 연결
   - `/src/containers`
   - `mapStateToProps(dispatch)`
   - `mapDispatchToProps` 사용
   - 내부에서 `bindActionCreators` 사용
   - `connect()` 함수 사용
   - ex1) connect(mapStateToProps, mapDispatchToProps)(BookList)
   - ex2) connect(mapStateToProps)(BookDetail)
      -> mapStateToProps, mapDispatchToProps 는 store 함수


# Redux 실습
> https://react-redux.js.org/introduction/basic-tutorial
### Components 연결
- `connect()`
  - Redux store로 부터 값을 읽을 수 있는 함수
  - store가 update 되면 다시 읽을 수 있음
  - 2개를 인자로 가지고 있고, 둘다 optional
  - `mapStateToProps` :첫번째 인자
    - Store로 부터 Subscirbe 하느냐 안하느냐 여부
  - `mapDispatchToProps` :두번째 인자
    - Action creator를 주입하느냐 안하느냐 여부
  - connect() 를 통해서 actions를 props 로 받아오고 컴포넌트는 action을 전송함
- 굳이 mapDispatchToProps를 안쓰고 바로 그냥 `{액션생성자}`를 인자로 넣어서도 사용할 수 있음
  
- `mapStateToProps`
  - store의 state가 변경될때마다 호출함
  - store의 모든 state를 받고, component가 필요로 할때 data 객체를 리턴해야 함
- `mapDispatchToProps`
  - 객체나 함수 둘다 가능
  - 함수일 경우, Component가 생성될때 한번 호출 됨. dispatch를 인자로써 받음. 그리고 actions을 보내기 위해서 dispatch 를 사용하는 함수의 객체를 리턴해야함
  - action creator(액션 생성자)의 객체일 경우, 각각의 action creator는 호출될때 자동으로 action을 보내주는 prop function으로 바뀌어햐 함

- 예시

```react
import Conunter from '../components/Counter';
import * as actions from '../actions';

const mapStateToProps = (state) =>({
  color : state.counter.color,
  number : state.counter.number
});

const mapDispatchToProps = (dispatch) =>(
  bindActionCreators({
    onIncrement: actions.increment,
    onDecrement: actions.decrement,
    onSetColor: actions.setColor
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```





## Redux 실생활 비유

- 예를 들어 세탁기를 키고 세탁기에 써져있는 시간을 현재시간에 추가해서 끝나는 시간을 기록하는 것이 있다고 든다면
  1. start : 세탁기 시작
      - HTML에서 Start 버튼을 가져오는 것과 동일한 역할
  2. dispatch : 세탁에 필요한 시간을 얻는 것
      - action code 리턴
      - action은 type으로 START_MACHINE과 value로 걸리는 시간을 가진 객체
  3. reducer : 현재시간에 필요한 시간 계산
      - 2가지 역할
      - state 초기화
      - dispatch로 부터 받은 action 객체로 state 변경
  4. state : 시간 기록
  > https://www.youtube.com/watch?v=nFryvdyMI8s




## 사용되는 함수 정리

- `createStore(리듀서)` : 스토어를 생성하고 리듀서를 연결하는 함수

  - `const store = createStore(reducer)`

- `<Provider store={store}/>` : 루트 컴포넌트 밑의 컴포넌트들이 스토어에 연결되기 쉽게 만들어줌

  ```react
  // Provider 이용하여 하위컴포넌트들이 Store에 접근할 수 있게 만들어줌
  ReactDOM.render(
      <Provider store={store}>
      <App />
      </Provider>, document.getElementById('root'));
  ```

- `mapDispatchToProps` 

  - Reducer에 Action을 알리는 dispatch함수를 어떻게 props에 엮을지 정의
  - Action creator에서 action을 만들어도 아무일도 일어나지 않음
    - Reducer를 향해 통지를 할 수 있게 만들기 위해서 만든 action을 dispatch라는 함수에 넘겨주는 기능 실행
    - component에 하나하나 수동으로 dispatch하는 처리를 안해도 됨
  - Action 생성부터 dispatch의 실행까지 한번에 이뤄질 수 있도록 함수를 정의하여 props로 넘겨줌

  ```react
  const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
      onIncrement: actions.increment,
      onDecrement: actions.decrement,
      onSetColor: actions.setColor
      }, dispatch)
  );
  ```

  

- `mapStateToProps(state, ownProps)`

  - 첫번째 인자로는 state를 보냄
  - 두번째 인자로는 우리가 원하는 객체를 보냄
  - State를 묶어서 Props로 보냄

- `bindActionCreators`

  - 이를 이용하면 mapDispatchToProps를 편리하게 사용가능

- `applyMiddleware(...middleware)` :

  > https://deminoth.github.io/redux/api/applyMiddleware.html

  : 스토어의 dispatch함수를 실용적으로 감쌀 수 있게 해줌

  중요한 기능 중 하나로 조합 가능하다는 것임. 여러개의 미들웨어가 조합될 수도 있다.

  주로 사용되는 것은 의존성 없이 비동기 액션을 지원하는 것. 비동기 액션을 통해 보통의 액션처럼 보내게 해줌

  ({ getState, dispatch }) => next => action


- `connect()`

  - 형식
    1. `connect(상태 관리 함수, 액션 관리 함수)(연결 컴포넌트)`
    2. `connect(상태 관리 함수)(연결 컴포넌트)`
    3. `connect(null, 상태 관리 함수)(연결 컴포넌트)`













