# Model

- ```java
  import org.springframework.ui.Model;
  ```

- 서버 템플릿 엔진에서 사용할 수 있는 객체를 저장 할 수 있도록 해줌

  - 저장해서 프론트의 속성에 넣을 수 있음

  ```java
  // 가져온 객체 목록을 posts라는 프론트의 속성에 넣음
  model.addAttribute("posts", postsService.findAllDesc());
  ```

  