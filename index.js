const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

let mockOutput = {
    estimatedTime: '1:00AM - 3:55AM',
    duration: '2h 55m',
    transportationType: '5811 Connecting Bus',
    value: '$74.00'
}

const scrapeAmtrak = async () => {
    let browser = await puppeteer.launch({headless:false});
    let page = await browser.newPage();
    await page.setViewport({
        width: 1100,
        height: 700
    })
    let html = await page.goto('https://www.amtrak.com/home.html', {waitUnitl: 'load', timeout: 0});
}

scrapeAmtrak();