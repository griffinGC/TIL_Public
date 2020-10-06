# Marshalling

- 마샬링은 직렬화와 비슷한 개념
- 직렬화는 **byte stream으로 변환**하는 것, 마샬링은 **변환하는 일련의 과정**
- 직렬화의 과정에 마샬링이 포함됨
- 객체 전송 과정 순서
  1. 직렬화된 객체를 바이트 단위로 분해 (marshalling)
  2. 직렬화 되어 분해된 데이터를 순서에 따라 전송
  3. 전송 받은 데이터를 원래대로 복구 (unmarshalling)

- 마샬링은 다른 언어 혹은 다른 플랫폼에서 서로 데이터를 주고 받을때 쓰는 용어



## 참고자료

> https://hyesun03.github.io/2019/09/08/marshalling-vs-serialization/