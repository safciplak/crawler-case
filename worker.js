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
exports.crawlForSponsoredLinks = void 0;
const puppeteer_1 = require("puppeteer");
function filterValidLinks(links) {
    return links.filter(link => link && link !== 'javascript:void(0)' && !link.startsWith('javascript:'));
}
function crawlForSponsoredLinks(searchEngine, keyword, pages) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        let results = [];
        for (let i = 0; i < pages; i++) {
            yield page.goto(`${searchEngine}/search?q=${keyword}&page=${i + 1}`);
            let links = yield page.evaluate(() => {
                return Array.from(document.querySelectorAll('a')).map(link => link.href);
            });
            links = filterValidLinks(links);
            results = results.concat(links);
        }
        yield browser.close();
        return results;
    });
}
exports.crawlForSponsoredLinks = crawlForSponsoredLinks;
