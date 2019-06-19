
import { merge } from 'rxjs'
import { marbles } from 'rxjs-marbles';
import { TestScheduler } from 'rxjs/testing';

describe('RxJS Marble DSL', () => {

  it('can describe merge with rxjs TestScheduler', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
    });

    testScheduler.run(helper => {
      const values = { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f'};
      const a$ = helper.cold('a-b-c--', values);
      const b$ = helper.cold('-d-e-f-', values);

      const expected = 'adbecf-';
      const actual$ = merge(a$, b$);
      helper.expectObservable(actual$).toBe(expected, values);
    });
  });

  it('can describe merge with rxjs-marbles', marbles(m => {
    const values = { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f'};
    const a$ = m.cold('a-b-c--', values);
    const b$ = m.cold('-d-e-f-', values);

    const expected$  = m.cold('adbecf-', values);
    const actual$ = merge(a$, b$);

    m.expect(actual$).toBeObservable(expected$);
  }));

});
