# Puppeteer

- 크롤링 툴
- SPA 에서도 사용 가능함
- Chrome 또는 Chromium을 제어하기 위한 모듈
- Headless Browser
  - UI 없이 백그라운드에서 실행되는 API
- 크롤링 뿐 아니라, 스크린샷, PDF 생성등 여러 분야에서 활용 가능

```js
const puppeteer = require("puppeteer");

(async () =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.naver.com")
    await page.screenshot({path : "./test.png"});

    await browser.close();

})();
```





## 참고자료

> https://velog.io/@filoscoder/%EC%9C%A0%EC%9A%A9%ED%95%9C-Js-%EC%9B%B9-%EC%8A%A4%ED%81%AC%EB%9E%98%ED%8D%BC-Puppeteer-rdk49nmlyc
>
> 