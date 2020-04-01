# Javascript Engine

Javascript는 CallStack, EventQueue를 이용하여 Single Thread 기반으로 비동기적으로 동작한다.

크게 3가지 영역으로 나뉨

- Call Stack
- Event Queue (Task Queue)
- Heap



## Call Stack

자바스크립트 프로그램에서 현재 어디에 있는지 기록하는 데이터 구조.

함수를 실행하면 함수에 대한 기록을 스택 제일 위에 추가한다. 

함수의 결과값을 반환하면 스택에서 제거된다.

스택이 한번에 하나의 일만 처리할 수 있으므로, 만약 함수가 복잡한 연산을 수행해야 한다면 다른 함수가 실행되지 못하는 상황이 발생됨

=> 이를 해결하기 위한 방법으로 **비동기 콜백** 을 사용한다.



## Heap

메모리 힙은 동적으로 만들어진 객체(인스턴스)가 메모리에 할당되는 곳.



## Event Queue

처리할 메세지 목록과 실행할 Callback 함수들의 리스트들을 가지고 있다.

비동기 함수들은 Web API를 호출하고, Web API는 콜백 함수를 콜백 큐에 밀어 넣는다.

Event Queue는 대기하다가 스택이 비는 시점에 Event Loop를 돌려 Callback 함수를 Call Stack에 넣는다.

Event Queue의 기본 역할은 큐와 스택을 지켜보다가 스택이 비는 시점에 콜백 함수를 CallStack에 넣어 실행시키는 것이다.



## 비동기 콜백 (Asynchronous Callback)

비동기 콜백은 즉시 호출 스택에 쌓이지 않고, Event Queue에서 기다렸다가 Call Stack(호출 스택)이 비어있는 시점에서 실행된다.



## 참고자료

[https://velog.io/@imacoolgirlyo/JS-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%97%94%EC%A7%84-Event-Loop-Event-Queue-Call-Stack](https://velog.io/@imacoolgirlyo/JS-자바스크립트-엔진-Event-Loop-Event-Queue-Call-Stack)

