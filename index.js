import puppeteer from 'puppeteer';
import {createStore} from 'storage-async';

// 1 -> 001, 10 -> 010, 100 -> 100, etc.
const format = id => {
    if (id < 10) {
        return `00${id}`;
    } else if (id < 100) {
        return `0${id}`;
    }

    return id;
};

const members = [];
const store = await createStore({path: './data.json', ttl: 900_000_000_000});
const browser = await puppeteer.launch();

for (let id = 1; id < 461; id++) {
    console.log(`Scraping ${id}...\n`);
    const page = await browser.newPage();
    await page.goto(`https://www.sejm.gov.pl/Sejm9.nsf/posel.xsp?id=${format(id)}&type=A`, {waitUntil: 'domcontentloaded'});

    const name = await page.$eval('#title_content > h1', el => el.textContent);
    const electionDate = await page.$eval('div.partia > ul > li:nth-child(1) > p.right', el => el.textContent);
    const list = await page.$eval('div.partia > ul > li:nth-child(2) > p.right', el => el.textContent);
    const region = await page.$eval('div.partia > ul > li:nth-child(3) > p.right', el => el.textContent);
    const votes = await page.$eval('div.partia > ul > li:nth-child(4) > p.right', el => el.textContent);
    const pledge = await page.$eval('div.partia > ul > li:nth-child(5) > p.right', el => el.textContent);
    const experience = await page.$eval('div.partia > ul > li:nth-child(6) > p.right', el => el.textContent);
    const party = await page.$eval('div.partia > ul > li:nth-child(7) > p.right', el => el.textContent);
    const dateOfBirth = await page.$eval('div.cv > ul > li:nth-child(1) > p.right', el => el.textContent);
    const education = await page.$eval('div.cv > ul > li:nth-child(2) > p.right', el => el.textContent).catch(() => null);
    const school = await page.$eval('div.cv > ul > li:nth-child(3) > p.right', el => el.textContent).catch(() => null);
    const job = await page.$eval('div.cv > ul > li:nth-child(4) > p.right', el => el.textContent).catch(() => null);
    const photoUrl = await page.$eval('#view\\:_id1\\:_id2\\:facetMain\\:_id109\\:_id111', el => el.src);

    members.push({
        name,
        electionDate,
        list,
        region,
        votes,
        pledge,
        experience,
        party,
        dateOfBirth,
        education,
        school,
        job,
        photoUrl
    });
    await store.set('members', members);
}

console.log('Done!');
await browser.close();