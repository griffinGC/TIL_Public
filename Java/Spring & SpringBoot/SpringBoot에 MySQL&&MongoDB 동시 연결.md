# SpringBoot에 MySQL && MongoDB 동시 연결

1. MongoDB 셋팅하는것과 동일하게 셋팅
2. MySQL 셋팅하는 것과 동일하게 셋팅
3.  `@EnableMongoRepositories(basePackageClasses = Repository인터페이스.class)` 사용

   - MongoDB를 구현하는 Repository를 사용하는 곳에 사용
4. `@EnableJpaRepositories(basePackageClasses = Repository인터페이스.class)` 사용
   - MySQL을 구현하는 Repository를 사용하는 곳에 사용