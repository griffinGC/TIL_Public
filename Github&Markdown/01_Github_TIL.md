# Github TIL

## 1. TIL?

> - TIL은 **T**oday **I** **L**earned의 줄임말로 개발자 사이에서 매일 자신이 학습한 내용을 commit(기록)하는 것
> - github, bitbucket, gitlab과 같은 원격 저장소에서 제공하는 1commit-1grass의 흥미 요소 제공



## 2. TIL 세팅

### (1) Git으로 프로젝트 관리 시작 : `git init`

- 자신이 앞으로 학습한 내용을 기록할 `TIL`폴더를 하나 생성한다. 이때 해당 폴더는 최상단에 생성한다.

- `git bash` 에서 `TIL` 폴도로 이동한 이후에 아래의 명령어로 `git` 관리를 시작한다.

  ```shell
  $ git init
  ```



### (2) Commit 을 위한 Staging : `git add`

- 현재 코드 상태의 스냅샷을 찍기 위한 파일 선택 (== Staging Area에 파일 추가)

  ```shell
  $ git add [파일이름] # .은 모든 변경 사항을 staging area로 올림
  ```



### (3) 버전 관리를 위한 스냅샷 저장 : `git commit`

- 현재 상태에 대한 스냅샷을 `commit`하여, 버전 관리를 진행한다.

  ``` shell
  $ git add -m "커밋 메세지"
  ```



### (4) 원격 저장소 정보 추가 : `git remote`

- Github 원격(remote) 저장소(repository)를 생성하고 `TIL` 폴더와 연결한다.

- 새로운 원격 저장소가 추가될 때만 입력한다.

  ``` shell
  $ git remote add origin [github 원격 저장소 주소]
  ```



### (5) 원격 저장소로 코드 `git push`

- 최종적으로 Github 원격 저장소에 push 한다.

  ```shell
  $ git push origin master
  ```



### (6) 그 외 명령어

- 현재 `git` 의 상태를 조회 `git status`

  ```shell
  $ git status
  ```

- 버전 관리 이력을 조회

  ```shell
  $ git log
  $ git log --oneline
  ```

- 마지막 커밋과 현재의 차이 확인

  - 단, 새로 추가한 파일이 unstaging 상태라면 볼 수 없음
  
  ```shell
  $ git diff --staged
  ```
  
  
  
- `git`  설정 (user.name & user.email) : __최초 1회 설정__

  ```shell
  $ git config --global user.name "griffinGC"
  $ git config --global user.email "griffinDouble@gmail.com"
  ```



## 3. `README.md`

> 원격(remote) 저장소(repository)에 대한 정보를 기록하는 마크다운 문서. 일반적으로 해당 프로젝트를 사용하기 위한 방법 등을 기재한다.



### (1) `README.md` 파일 생성

- `README.md` 파일을 `TTL` 폴더(최상단)에 생성한다. 이름은 반드시 __README.md__로 설정한다.

  ```shell
  $ touch README.md
  ```



### (2) (자신만의) TIL 원칙에 대한 간단한 내용 추가

- 마크다운 작성법 pdf에서 배우고 실습한 내용을 토대로 `README.md` 파일을 작성한다.
- 형식은 자유롭게 작성하되 마크다운(의미론적)을 지켜서 작성한다.



### (3) 저장 후 버전관리 : `add`, `commit`, `push`

- 작성이 완료되면 아래의 명령어를 통해 commit 이력을 남기고 원격 저장소로 push한다.

  ```shell
  $ git add README.md
  $ git commit -m "add README.md"
  $ git push origin master
  ```



## 4. 추가 학습 내용 관리

### (1) 추가 내용 관리

- `TIL` 폴대 내에서 학습을 원하는 내용의 폴더를 생성하고 파일들을 생성한 후 작업을 진행한다.

  ```shell
  $ mkdir python
  ```



### (2) 변경 사항을 저장하고, 원격저장소로 옮긴다.

- 업데이트가 완료되면 아래의 명령어를 통해 commit 이력을 남기고 원격 저장소로 push 한다.

  ```shell
  $ git add .
  $ git commit -m "학습 내용 추가"
  $ git push origin master
  ```

  

## 5. ``git `` 충돌났을 경우 해결법

### (1) ``pull``을 하지 않고 ``commit``을해서 ``push`` 할때 오류가 날 경우

- ``commit`` 을 취소하고 conflict부분을 수정하여 해결한다.

  ```shell
  //로그 확인
  $ git log 또는 git log --oneline
  
  //commit취소
  $ git reset commit아이디
  
  //conflict부분 수정
  
  //다시 commit 후 push
  $ git commit -m"conflict solve"
  $ git push origin master
  ```



### (2) ``stash``를 이용하여 임시로 옮기고 ``pull`` 해오기

- ``$ git stash``를 이용하면 현재 작업하던 일을 잠시 저장해두고 아직 완료 하지 않을 것을 ``commit``없이 나중에 다시 꺼내 올 수 있다.

  ```shell
  //상태 확인
  $ git status
  
  //stash를 이용하여 임시 저장소에 저장해두기
  $ git stash
  
  //pull 해오기
  $ git pull
  
  //임시 저장소에 있던 것을 다시 꺼내오기
  $ git stash pop
  
  //이렇게 해결하면 충돌 없이 pull 해오고 중간에 수정하던 작업내용도 보존할 수 있다. 
  ```

 ___``pull`` 해오는것을 까먹었을 경우, 작업도중  ``stash``를 이용하여 해결 할 수 있다!!___



## 6. `.gitignore` 파일 수정하고 적용시키는 방법

- `git`의 캐시를 지우고 `commit` &&  `push`

  ```shell
  $ git rm -r --cached .
  $ git add .
  $ git commit -m"apply gitignore"
  $ git push origin master
  ```
