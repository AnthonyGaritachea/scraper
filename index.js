const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

let mockOutput = {
    estimatedTime: '1:00AM - 3:55AM',
    duration: '2h 55m',
    transportationType: '5811 Connecting Bus',
    value: '$74.00'
}

const scrapeAmtrak = async () => {
    try {
        let browser = await puppeteer.launch({ headless: false });
        let page = await browser.newPage();
        await page.setViewport({
            width: 1100,
            height: 800
        });
        let html = await page.goto('https://www.amtrak.com/home.html', { waitUnitl: ['load', 'networkidle2']});
        await page.focus('#page-content > section:nth-child(2) > div.home > article > div.hero-banner-and-search-widget__wrapper > div > div.search-trip.am-js__search-trip.search-trip--active-one-way > form > div > div.search-trip__widget-wrapper_inner > div.search-trip__inputs-container > div.search-trip__stations > div > div:nth-child(1) > div > div > div > input.search-station-field__inp.form-input-with-label__inp.request-missing-points__ticket-form__input');
        await page.keyboard.type('Oceanside');
        await page.click('#OSD');
        await page.focus('#page-content > section:nth-child(2) > div.home > article > div.hero-banner-and-search-widget__wrapper > div > div.search-trip.am-js__search-trip.search-trip--active-one-way > form > div > div.search-trip__widget-wrapper_inner > div.search-trip__inputs-container > div.search-trip__stations > div > div:nth-child(2) > div > div > div > input.search-station-field__inp.form-input-with-label__inp.request-missing-points__ticket-form__input');
        await page.keyboard.type('Bakersfield');
        await page.click('#BFD')

    } catch (err) {
        console.log(err)
    }
}

scrapeAmtrak();