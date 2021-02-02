# KMP 알고리즘

> https://bowbowbow.tistory.com/6

- 문자열 검색 알고리즘
- 시간 복잡도 `O(N + M)`
  - 일일이 비교하며 찾는 경우는 `O(NM)` 이 걸림

### 구현

- 접두사와 접미사를 이용
- 구현 목록
  - 패턴에 대해 pa 배열을 얻는 함수
    - 일치하는 갯수를 구하는 배열을 담은 함수
    - pa[i]는 주어진 문자열 0 ~ i 까지의 부분 문자열 중에서 접두사(prefix) == 접미사(suffix) 가 될 수 있는 부분 문자열 중에서 가장 긴 것의 길이
    - ex. ABAABAB
      - i = 0 => A => pa[0] = 0
      - i = 1 => AB => pa[1] = 0
      - i = 2 => ABA => pa[2] = 1 (맨앞 A와 뒤에 A가 같기 때문)
      - ... i = 4 => ABAAB => pa[4] = 2
  - pa 배열을 이용하여 kmp를 수행하는 부분으로 나뉨
    - 문자열 2개를 비교할때 서로 다른 경우 바로 다음부터 비교하는것이 아니라, **일치하는 부분 중에 접두사와 접미사가 일치하는 부분부터 다시 비교**
      - 예를 들어 `ABCDABCDABEE` 와 `ABCDABE` 를 비교하는 경우
      - 맨 앞에서부터 비교하고, 일치하지 않을 경우 B부터 비교하는 것이 아닌, 5번째 자리에 위치한 A부터 다시 비교
      - 1,2 번째 접두사와 5,6 번째 접미사가 일치하기 때문에 접미사가 시작되는 부분 부터 다시 비교

```python
# https://bowbowbow.tistory.com/6
import sys
input = sys.stdin.readline
t = input().strip()
p = input().strip()
# 처음 인덱스가 0부터 시작!
def make_pi(words):
    # 첫번째는 무조건 0이 될 수 밖에 없음
    result = [0] * len(words)
    j = 0
    for i in range(1, len(words)):
        while j > 0 and words[i] != words[j]:
            j = result[j - 1]
        if words[i] == words[j]:
            j += 1
            result[i] = j
    return result

def kmp(stn, cmp):
    global cnt
    global start_index
    result = []
    pi = make_pi(cmp)
    j = 0
    for i in range(len(stn)):
        while j > 0 and stn[i] != cmp[j]:
            j = pi[j - 1]
        if stn[i] == cmp[j]:
            if j == len(cmp) - 1:
                result.append(i - len(cmp) + 1)
                j = pi[j]
            else:
                j += 1
    print(len(result))
    for i in result:
        print(i + 1)
kmp(t, p)

#####

t = input()
p = input()
def make_pi(words):
    result = [0] * len(words)
    j = 0
    for i in range(1, len(words)):
        while j > 0 and words[i] != words[j]:
            j = result[j - 1]
        if words[i] == words[j]:
            j += 1
            result[i] = j
    return result

def kmp(stn, cmp):
    pi = make_pi(cmp)
    i, j = 0, 0
    matched = 0
    result = []
    # 계속해서 일정 갯수가 되는지 카운트 하는것이기 때문에 일정갯수만큼 확인
    # 고로 실패가 뜸
    # 같지 않을 경우 j = 0으로 계속 초기화를 시키는 것이 아닌 현재까지 같았던 부분을 다시 넣어서 kmp 수행
    while (i + len(cmp)) <= len(stn):
        if matched < len(cmp) and stn[i + matched] == cmp[matched]:
            matched += 1
            if matched == len(cmp):
                result.append(i - j + 1)
        else:
            if matched == 0:
                i += 1
            else:
                i += matched - pi[matched - 1]
                matched = pi[matched - 1]
    print(len(result))
    for i in result:
        print(i, end=" ")
kmp(t, p)
```

