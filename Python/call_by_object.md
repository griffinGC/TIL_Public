# 파이썬 값 저장 방식

### call by object reference

- 자바는 call by value
  
- 자세한건 [C++_Java_비교.md](./Java/C++_Java_비교.md) 참고
  
- C는 call by reference , call by value 

  - call by reference
    - pointer 사용

- 파이썬은 원시타입 조차도 **객체**

  > https://lee-seul.github.io/concept/python/2018/05/02/python-call-by-object-reference.html

  - 모든 것이 객체
  - 단, 문자와 숫자는 불변 객체
  - **할당 진행시 모두 객체에 대한 참조를 할당**
    - 고로, 다중 할당 시 조심해야 함
    - 다중할당 사용 안할 시, 값이 변경될 우려가 있음
      - 오히려 순차적으로 할당시, 문제 발생할 수 있음
  
  ```python
  class ListNode:
      def __init__(self, val=0, next=None):
          self.val = val
          self.next = next
      def __str__(self):
          return "val : {} next : {}".format(self.val, self.next)
  
  def test():
      # a와 b가 같은 객체를 바라봄
      a = b = ListNode(None)
      b.next = ListNode(1, 2)
      print("a, ", a)
      print("b, ", b)
      # b는 재할당 되면서 b가 가리키는 곳이 변경되지만 a는 그대로 유지 변경되지 않음
      b = b.next
      print("a1, ", a)
      print("b1, ", b)
      # b.next에다가 값을 할당하면 기존의 b가 가리키는 곳이 a.next이기 때문에, 새로 할당하는 값이 a에도 똑같이 영향을 미침
      b.next = ListNode(2,3)
      print("a2 ", a)
      print("b2 ", b)
  
      return a, b
  
  a,b = test()
  print()
  print("a ", a)
  print("b ", b)
  
  ```
  
  ```shell
  a,  val : None next : val : 1 next : 2
  b,  val : None next : val : 1 next : 2
  a1,  val : None next : val : 1 next : 2
  b1,  val : 1 next : 2
  a2  val : None next : val : 1 next : val : 2 next : 3
  b2  val : 1 next : val : 2 next : 3
  
  a  val : None next : val : 1 next : val : 2 next : 3
  b  val : 1 next : val : 2 next : 3
  
  Process finished with exit code 0
  ```
  
  

