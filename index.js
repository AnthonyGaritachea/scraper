const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const moment = require('moment');

let mockOutput = {
    value: '$74.00', // OR value: 'SOLD OUT'
    departureAndArrival: '1:00AM - 3:55AM',
    duration: '2h 55m',
    transportationType: '5811 Connecting Bus',
}

const scrapeAmtrak = async () => {
    try {
        let browser = await puppeteer.launch({ headless: false });
        let page = await browser.newPage();
        await page.setViewport({
            width: 1100,
            height: 800
        });
        await page.goto('https://www.amtrak.com/home.html', { waitUnitl: ['load', 'networkidle2']});
        await page.focus('#page-content > section:nth-child(2) > div.home > article > div.hero-banner-and-search-widget__wrapper > div > div.search-trip.am-js__search-trip.search-trip--active-one-way > form > div > div.search-trip__widget-wrapper_inner > div.search-trip__inputs-container > div.search-trip__stations > div > div:nth-child(1) > div > div > div > input.search-station-field__inp.form-input-with-label__inp.request-missing-points__ticket-form__input');
        await page.keyboard.type('Oceanside');
        await page.click('#OSD');
        await page.focus('#page-content > section:nth-child(2) > div.home > article > div.hero-banner-and-search-widget__wrapper > div > div.search-trip.am-js__search-trip.search-trip--active-one-way > form > div > div.search-trip__widget-wrapper_inner > div.search-trip__inputs-container > div.search-trip__stations > div > div:nth-child(2) > div > div > div > input.search-station-field__inp.form-input-with-label__inp.request-missing-points__ticket-form__input');
        await page.keyboard.type('Bakersfield');
        await page.click('#BFD');
        await page.focus('#page-content > section:nth-child(2) > div.home > article > div.hero-banner-and-search-widget__wrapper > div > div.search-trip.am-js__search-trip.search-trip--active-one-way > form > div > div.search-trip__widget-wrapper_inner > div.search-trip__inputs-container > div.search-trip__selected-type-container > div.search-trip--hidden.search-trip__one-way > div > div.search-trip-depart.am-js__search-trip-depart > div > div.search-trip-calendar__active > div > div.search-trip-calendar__active_cont > input')
        await page.keyboard.type(moment().day('Friday').format('MM/DD/YYYY'));
        await page.waitFor(2000)
        await page.click('.search-trip-travelers__active_counter');
        await page.waitFor(2000)
        await page.waitForSelector('li:nth-child(2) .search-trip-travelers-list-item__left_increment', {visible: true});
        await page.click('li:nth-child(2) .search-trip-travelers-list-item__left_increment');
        await page.waitFor(2000)
        await page.click('.search-trip-travelers__discount_done');
        await page.waitFor(2000);
        await page.click('#findtrains');
        await page.waitFor(5000);
        let html = await page.content();
        let $ = await cheerio.load(html)
        let results = $('div[class="train-select-heading"]').map((index, element) => {
           let value = $(element).parent().parent().parent().find('span.radio-button__text').text().match(/\$[\d]{2}\.[\d]{2}/g);
           value = (value === null) ? 'SOLD OUT' : value.toString();
           let departureAndArrival = $(element).find($('.time_lg')).text().toUpperCase().replace(/\s/g, '').replace(/M/, 'M - ').trimLeft();
           let duration = $(element).find($('.duration_lg')).text();
           let transportationType = $(element).find('a').first().text().trim();
            return { value, departureAndArrival, duration, transportationType }
        }).get();
        console.log(results)
    } catch (err) {
        console.log(err);
        if(err.name === 'TimeoutError'){
            scrapeAmtrak();
        }
    }
}

scrapeAmtrak();