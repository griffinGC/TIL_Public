# DataSource & Delegate

> https://zeddios.tistory.com/137
>
> https://velog.io/@chan33344/DataSource-%EC%99%80-delegate
>
> https://www.edwith.org/boostcourse-ios/lecture/16908/

- UICollectionView
- UITableView

## DataSource

- 데이터를 받아 뷰를 그려주는 역할
  - **보여주는 역할**
- 컬렉션뷰의 컨텐츠(데이터)를 관리하고  해당 컨텐츠를 표현하는데 필요한 뷰를 만듬
- 데이터 소스 객체를 구현하기 위해서는 `UICollectionViewDataSource`, `UITableViewDataSource` 프로토콜을 준수하는 객체를 만들어야 함
- MVC 패턴 중 모델과 관련되어 있음



## Delegate

- delegate는 모양과 동작을 관리하기 때문에 컨트롤러 역할에 가까움
  - 행동에 대한 **동작**을 제시

- `UICollectionViewDelegate`, `UITableViewDelegate` 프로토콜 준수
- 셀에 대한 작업을 수행할 수 있는 메서드 정의