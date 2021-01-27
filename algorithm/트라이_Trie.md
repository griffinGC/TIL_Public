# 트라이 Trie

- 검색 트리의 일종
- 일반적으로 키가 문자열인 동적배열 혹은 연관 배열을 저장하는데 사용되는 **정렬된** 트리 자료구조
- 실무에 매우 유용하게 쓰이는 자료구조
- 자연어 처리 분야에서 문자열 탐색을 위한 자료구조로 널리 쓰임
- 다진 트리 형태 (m-ary Tree)
- 각각의 문자 단위로 색인을 구축하는 것과 유사
- 문자의 갯수만큼 자식이 있어야 함

## 구현

- 딕셔너리를 이용해 간결하게 구현 가능

- **같은 문자가 같은 자식을 타고 내려가다가, 달라지는 문자부터 서로 다른 노드로 분기됨**

  ```python
  # 트라이를 저장할 노드
  class TrieNode:
      def __init__(self):
          self.word = False
          self.children = collections.defaultdict(TrieNode)
  
  
  # 트라이 연산을 구현할 별도 클래스
  class Trie:
      def __init__(self):
          # 별도의 TrieNode 클래스 가짐
          self.root = TrieNode()
  
      # 삽입 메소드
      def insert(self, word: str) -> None:
          node = self.root
          for char in word:
              if char not in node.children:
                  node.children[char] = TrieNode()
              node = node.children[char]
          # 단어가 모두 완성되었을 때만 True 리턴
          node.word = True
  
      # 단어가 존재하는지 여부, 마지막에 word가 True인지 확인하면 됨
      def search(self, word: str) -> bool:
          node = self.root
          for char in word:
              if char not in node.children:
                  return False
              node = node.children[char]
          return node.word
  
      # 해당 단어로 시작하는 단어가 존재하는지 여부
      def starts_with(self, prefix: str) -> bool:
          node = self.root
          for char in prefix:
              if char not in node.children:
                  return False
              node = node.children[char]
          return True
  
  ```

  