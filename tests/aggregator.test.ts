import { aggregateResults } from '../aggregator';

describe('Aggregator Function', () => {
  it('should aggregate results correctly', () => {
    const input = [['link1', 'link2'], ['link3']];
    const output = ['link1', 'link2', 'link3'];
    expect(aggregateResults(input)).toEqual(output);
  });
});

