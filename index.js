"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const worker_1 = require("./worker");
const aggregator_1 = require("./aggregator");
exports.app = express();
const port = 3000;
exports.app.get('/api/v1/sponsored-links', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.keywords) {
        return res.json({ message: "keywords not found" });
    }
    const keywords = req.query.keywords;
    const pages = parseInt(req.query.pages);
    const keywordsArray = keywords.split(',');
    const searchEngines = ['https://www.google.com', 'https://www.bing.com', 'https://search.yahoo.com'];
    let promises = [];
    keywordsArray.forEach(keyword => {
        searchEngines.forEach(engine => {
            for (let i = 0; i < pages; i++) {
                promises.push((0, worker_1.crawlForSponsoredLinks)(engine, keyword, 1));
            }
        });
    });
    const results = yield Promise.all(promises);
    const aggregatedResults = (0, aggregator_1.aggregateResults)(results);
    res.json(aggregatedResults);
}));
if (process.env.NODE_ENV !== 'test') {
    exports.app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}
