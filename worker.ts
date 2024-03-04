import puppeteer from 'puppeteer';

function filterValidLinks(links: string[]): string[] {
    return links.filter(link => link && link !== 'javascript:void(0)' && !link.startsWith('javascript:'));
}

export async function crawlForSponsoredLinks(searchEngine: string, keyword: string, pages: number): Promise<string[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let results: string[] = [];
    
    for (let i = 0; i < pages; i++) {
        await page.goto(`${searchEngine}/search?q=${keyword}&page=${i + 1}`);
        
        let links: string[] = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a')).map(link => link.href);
        });
        
        links = filterValidLinks(links);

        results = results.concat(links);
    }

    await browser.close();
    return results;
}