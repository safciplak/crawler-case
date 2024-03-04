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
jest.mock('../worker', () => ({
    crawlForSponsoredLinks: jest.fn()
        .mockResolvedValueOnce(['Mocked Link 1', 'Mocked Link 2']) // İlk çağrı için
        .mockResolvedValueOnce(['Mocked Link 3', 'Mocked Link 4']) // İkinci çağrı için
        .mockResolvedValueOnce(['Mocked Link 5', 'Mocked Link 6']) // Üçüncü çağrı için
}));
const request = require("supertest");
const index_1 = require("../index");
// Testinizi bu yeni mock davranışına göre güncelleyin
describe('API Endpoints', () => {
    it('GET /api/v1/sponsored-links should respond with JSON', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.app)
            .get('/api/v1/sponsored-links?pages=1&keywords=test')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual([
            'Mocked Link 1', 'Mocked Link 2',
            'Mocked Link 3', 'Mocked Link 4',
            'Mocked Link 5', 'Mocked Link 6'
        ]);
    }), 10000);
});
