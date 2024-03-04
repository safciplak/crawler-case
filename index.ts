import * as express from 'express';
import { crawlForSponsoredLinks } from './worker';
import { aggregateResults } from './aggregator';

export const app = express();
const port = 3000;

app.get('/api/v1/sponsored-links', async (req, res) => {
    if (!req.query.keywords) {
        return res.json({ message: "keywords not found" });
    }

    const keywords: string = req.query.keywords as string;
    const pages: number = parseInt(req.query.pages as string);

    const keywordsArray: string[] = keywords.split(',');
    const searchEngines: string[] = ['https://www.google.com', 'https://www.bing.com', 'https://search.yahoo.com'];

    let promises: Promise<string[]>[] = [];
    keywordsArray.forEach(keyword => {
        searchEngines.forEach(engine => {
            for (let i = 0; i < pages; i++) {
                promises.push(crawlForSponsoredLinks(engine, keyword, 1));
            }
        });
    });

    const results: string[][] = await Promise.all(promises);
    const aggregatedResults: string[] = aggregateResults(results);
    res.json(aggregatedResults);
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}
