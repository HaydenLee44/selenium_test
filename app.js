const {Builder, By, Key, until, WebDriver, ChromiumWebDriver} = require('selenium-webdriver');
 
(async function example() {
    let driver = await new Builder()
    .forBrowser('chrome')
    .build();

    try {
        // 네이버 실행
        await driver.get('https://www.naver.com/');

        // Javascript를 실행하여 UserAgent를 확인한다.
        const userAgent = await driver.executeScript("return navigator.userAgent;")
 
        console.log('[UserAgent]', userAgent);

        // 네이버 뉴스 접속
        const searchNews = await driver.findElements(By.css('ul.NM_FAVORITE_LIST > li.nav_item > a.nav'));
        console.log('[searchNews.length]', searchNews.length, searchNews)
        
        console.log('== Search results ==')
        for (let i = 0; i < searchNews.length; i++) {
            console.log('- ' + await searchNews[i].getText())
        }

        if (searchNews.length > 0) {
            await searchNews[1].click();
        }

        // 경제면 접속
        const economyNews = await driver.findElements(By.className('Nitem_link_menu'));
        console.log('[economyNews.length]', economyNews.length, economyNews)
        
        console.log('== Search results ==')
        for (let j = 0; j < economyNews.length; j++) {
            console.log('- ' + await economyNews[j].getText())
        }

        if (economyNews.length > 0) {
            await economyNews[2].click();
        }
        
        // 헤드라인 뉴스 첫번째 링크 접속
        const headlineNews = await driver.findElements(By.className('cluster_text_headline'));
        console.log('[headlineNews.length]', headlineNews.length, headlineNews)
        
        console.log('== Search results ==')
        for (let j = 0; j < headlineNews.length; j++) {
            console.log('- ' + await headlineNews[j].getText())
        }

        if (headlineNews.length > 0) {
            await headlineNews[0].click();
        }

        // 기사 제목 가져오기
        const newsTitle = await driver.findElement(By.id('title_area'));
        console.log(await newsTitle.getText());

        // 기자 이름 가져오기
        const journalistName = await driver.findElement(By.className('media_end_head_journalist_name'));
        console.log(await journalistName.getText());

        try {
            await driver.wait(() => { return false; }, 5000);
        } catch (err) {
            console.log('에러가 발생했습니다.')
        }         
    }
    finally{
        driver.quit();
    }
})();