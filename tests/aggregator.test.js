"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aggregator_1 = require("../aggregator");
describe('Aggregator Function', () => {
    it('should aggregate results correctly', () => {
        const input = [['link1', 'link2'], ['link3']];
        const output = ['link1', 'link2', 'link3'];
        expect((0, aggregator_1.aggregateResults)(input)).toEqual(output);
    });
});
