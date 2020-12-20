# Java BigInteger API

## gcd()

- `BigInteger gcd(BigInteger val)`
- 최대 공약수를 구하는 메소드
- 유클리드 호제법을 이용하여 최대 공약수도 구할 수 있음
  - 입력으로 두 수 m,n(m>n)이 들어온다.
  - n이 0이라면, m을 출력하고 알고리즘을 종료한다.
  - m이 n으로 나누어 떨어지면, n을 출력하고 알고리즘을 종료한다.
  - 그렇지 않으면, m을 n으로 나눈 나머지를 새롭게 n에 대입하고, 기존의 m에는 이전의 n으로 바꾸고 3번으로 돌아온다.

- 최대 공약수를 이용하여 최소 공배수를 구할 수 있음
  - a, b가 있을 경우, 
    - (a * b) / gcd(a,b)



## longValue()

- BigInteger를 long 형으로 변경해주는 함수



## IntValue()

- BigInteger를 int 형으로 변경해주는 함수