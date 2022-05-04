const superagent = require('superagent');
const sinon = require('sinon');

import services from '../../src/services';

describe('Services', () => {
  describe('getInvestmentDataForPastYear', () => {

    it(' returns empty array when negative number is passed as argument', async (done) => {

      const res = await services.getInvestmentDataForPastYear(-1)

      expect(res).toStrictEqual([]);
      done();
    });

    it('successfully returns data from external api http://api.nbp.pl/api/cenyzlota', async (done) => {

      const expected = [{ data: '2017-03-22', cena: 1 }, { data: '2021-09-12', cena: 2 }]

      sinon.stub(superagent, 'get').returns({ body: expected })

      const res = await services.getInvestmentDataForPastYear(1)

      expect(res).toStrictEqual(expected);

      superagent.get.restore()
      done();
    });

  });

  describe('getStatistics', () => { 

    it('successfully returns min and max values and indexes from the given array', async (done) => {

      const data = [{ data: '2017-03-22', cena: 1 }, { data: '2021-09-12', cena: 2 }, { data: '2022-03-10', cena: 3 }]
      const expected = {max: 3, min: 1, maxIndex: 2, minIndex: 0}

      const res = await services.getStatistics(data)

      expect(res).toStrictEqual(expected);
      done();
    });

  });
});
