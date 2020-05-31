# junit
> junit 에 관해 정리하는 파일

- assertThat
    - 테스트 검증 라이브러리의 검증 메소드
    - 검증하고 싶은 대상을 메소드의 인자로 받음
    - 체이닝 지원
        - isEqualTo 이어서 사용 가능
- isEqualTo
    - assertj의 동등 비교 메소드
    - 인자로 비교할 값을 넣음
    - assertThat의 값과 비교해서 같을 때만 성공