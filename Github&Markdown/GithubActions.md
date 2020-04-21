# Github Actions

- 저장소가 있어야 사용할 수 있음
- 빈 깡통의 PC를 빌려주는 것과 동일한 효과
- `action/checkout@v2` 은 저장소 이름
  - 현재 액션이 실행되고 있는 저장소를 클론하고 체크아웃해서 다음에 나오는 명령어들에서 사용할 수 있도록 해주는 명령어
  - 이걸 사용 안하면 다음 명령어부터 현재 액션이 실행되는 저장소의 코드들 수행 못함



### 순서

1. Actions 클릭
2. 원하는 사양의 repository 선택
3. `.github/workflows` 폴더  생성됨
4. 해당 폴더 안에 `main.yml` 파일을 이용해서 Github Actions 수행
5. 실행이 종료되면 Actions의 work flow에 설정한 action 이름이 뜸
6. work flow에서 수행된 목록을 볼 수 있음



### 용어 정리

- `on` 
  - 어떤 상황에서 action이 수행될 지를 지정
  - schedule 지정해서 정기적으로 수행되도록 만들 수 있음
- `runs-on` 
  
  - action 이 실행되는 환경 (os)
- `steps`
  
  - 실제로 벌어지는 일을 적는 곳
- `name` 
  
  - step의 이름 혹은 action의 이름
- `run`
  
- step이 실제로 돌아가는 코드
  
- `uses` 
  
  - 다른사람이 만든 action을 실행할때 사용
- MarketPlace
  
- 다른 사람이 만든 액션을 사용할 수 있음
  
- `env`

  - 환경변수 주입할때 사용

  - context 정보는 아래 출처에 존재

  - 변수명이 if 문에 있다면 `${{}}` 형식 사용 안해도 됨
  
  - 변수 넣을때는 `${{변수명}}`
  
    ```yaml
    env:
    	my_env_var : ${{expression}}
    ```
  
  - context 참고
  
  	> https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions



### 패스워드 같은 보안정보 넣을 경우

1. Settings
2. Secrets
   - 변수의 Name 과 Value를 설정하고 저장
3. Actions
   - env에 저장할 변수의 이름과 secrets에서 저장했던 변수의 이름을 넣어 줌
   - `${{secrets.설정한변수명}}`

```yaml
env:
	My_Password : ${{secrets.password}}
```





## 참고자료

> https://help.github.com/en/actions/reference/events-that-trigger-workflows