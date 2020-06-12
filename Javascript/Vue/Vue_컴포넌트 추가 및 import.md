# Vue Component

- 기존 HTML element를 확장하여 재사용가능한 코드를 캠슐화하는데 도움이 됨
- 경우에 따라 "is" 속성으로 확장된 원시 HTML element로 나타날 수 있임
- 컴포넌트에서 사용하는 "data"(컴포넌트의 인스턴스 함수) 는 반드시 함수여야 함
- v-bind를 사용하여 각각의 반복되는 컴포넌트에 전달가능

## 컴포넌트 추가 및 import

1. `@/Components`  폴더에 컴포넌트 파일 추가
   - @는 최상위 나타냄
2. 컴포넌트가 필요한 곳에서 import
3. 스크립트의 "components" 오브젝트에 등록 (camelCase)
4. 템플릿에 `<components></components>` 와 같은 html 문법으로 사용

```vue
<nav> </nav>
<pagnation></pagnation>
import Nav from '@/Components/Nav';
...
<script>
	Components:{
    Nav
  }
  ...
</script>
```

