# 마이크로서비스 계획과 구현 원칙

> 숲을 보기전에 나무를 봐라. 마이크로 서비스를 효과적으로 계획하고 구현하기 위해 알아야하는 것으로의 실용적이고 실행가능한 통찰력을 얻어보자.

마이크로서비스 기반 어플리케이션을 계획할때 어디서부터 시작해야 할까? 이 아키텍쳐는 여러 측면들로 구성되어있다. 어떻게 이 분리된 설계를 분해시킬수 있을까? 이 아티클의 목적은 마이크로 서비스 기반 솔루션 구현시 고려사항과 계획을 확인하는것이다. 이 아티클을 읽은 후에는, 그림이 더 명쾌해지기를 바란다.

![architecture](https://miro.medium.com/max/1000/1*KkaHVSxJG6OjY7YzpounOg.png)

## 요지

- **왜?**
  - 마이크로서비스를 선택하는 이유
- **고려해야할 사항은 무엇인가?**
  - 마이크로서비스로 이전하기전에 계획시 고려사항 
    - (버전, 서비스 디스커버리, 레지스트리, 트랜잭션, 리소싱)
- **어떻게?**
  - 구현 관행 (회복성, 커뮤니케이션 패턴)
- **누가?**
  - 데이터 흐름 이해 (로깅, 모니터링, 알림)



실행가능한 마이크로서비스 솔루션을 만들 수 있는 것은 기술적인 플랫폼과 지원하는 툴들 덕분이다. 이 아티클은 솔루션 그 자체를 수행하는 제품들과 기반이 되는 툴들(도커, 쿠버네티스 혹은 다른 컨테이너 오케스트레이션 툴, API 게이트웨이, 인증, 등등) 이 아닌, 기술적인 토대들과 원칙들에 집중하고 있다. 

이 아티클을 작성하면서 각각의 부분들에 대한 기사를 쓸 가치가 있다고 느꼈지만, 나무만이 아닌 숲도 볼 수 있도록 하기 위해 모두 하나의 기사로 작성하기로 결정했다.



## 1. 마이크로 서비스의 원리

마이크로 서비스 아키텍쳐에서, 한개의 어플리케이션은 많은 작은 서비스들로 이루어져있다. 각각의 서비스는 나중에 3장에서 이야기할 내부 프로세스 커뮤니케이션 형식에 의해 네트워크간에 다른서비스들과 커뮤니케이션 하면서 각각의 서비스들이 가진 프로세서를 관리한다.

이러한 분리는 

