# Chapter 10 클래스

## 마지막 부분 portfolio Test

### Money 클래스

```java
package chapter10;

public class Money {
    int dollar;
}
```

### Portfolio 클래스

```java
package chapter10;

public class Portfolio {
    private StockExchange exchange;
    private int val;

    public Portfolio(StockExchange exchange) {
        this.exchange = exchange;
    }
    void add(int number, String company){
       this.val = this.exchange.currentPrice(company).dollar * number;
    }
    int value(){
        return val;
    }
}
```

### StockExchange 인터페이스

```java
package chapter10;

public interface StockExchange {
    Money currentPrice(String symbol);
}
```

### FixedStockExchangeStub 클래스

- 변동될 수 있는 TokyoStockExchange API를 대신하여 Test하기 위해 고정된 값으로 만든 클래스
- pure 한 function을 가능하도록 하기 위함

```java
package chapter10;

import java.util.HashMap;
import java.util.Map;

public class FixedStockExchangeStub implements  StockExchange{
    private Map<String, Integer> stockList;

    public FixedStockExchangeStub() {
        this.stockList = new HashMap<>();
    }

    @Override
    public Money currentPrice(String symbol) {
        Money money = new Money();
        money.dollar = this.stockList.get(symbol);
        return money;
    }

    int fix(String company, int value){
        this.stockList.put(company, value);
        return value;
    }
}
```

## Test 코드

- 고정된 값을 가지고 있는 객체를 미리 생성
- 생성된 객체에 값을 넣었을때 결과를 예측하여 Test

```java
package chapter10;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class PortfolioTest {
    private FixedStockExchangeStub exchange;
    private Portfolio portfolio;

    @Before
    public void setUp() throws Exception{
        exchange = new FixedStockExchangeStub();
        exchange.fix("MSFT", 100);
        portfolio = new Portfolio(exchange);
    }

    @Test
    public void GivenFiveMSFTTotalShouldBe500() throws Exception{
        portfolio.add(5, "MSFT");
        Assert.assertEquals(500, portfolio.value());
    }
}
```

