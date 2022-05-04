const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const superagent = require('superagent');
const sinon = require('sinon');

const app = express();

import controllers from '../../src/controllers';

app.use(bodyParser.json());
app.get('/best_investment_dates', controllers.getBestInvestmentDates);

describe('Booking API', () => {
  describe('getUsers', () => {

    afterEach(() => superagent.get.restore());

    async function getBestInvestmentDates() {
      return request(app)
        .get('/best_investment_dates')
        .set('Accept', 'application/json')
    }

    it('forwards error from the external API `http://api.nbp.pl/api/cenyzlota`', async (done) => {

      const error = new Error('some error');
      sinon.stub(superagent, 'get').throws(error)

      const res = await getBestInvestmentDates();

      expect(res.body).toStrictEqual({ message: 'some error' });
      done();
    });

    it('checks what was the best investment in gold during the last 5 years', async (done) => {

      sinon.stub(superagent, 'get').returns({ body: [{ data: '2017-03-22', cena: 1 }, { data: '2021-09-12', cena: 2 }] })

      const res = await getBestInvestmentDates();

      const expected = {
        bestTimeToBuyGold: { data: '2017-03-22', cena: 1 },
        bestTimeToSellGold: { data: '2021-09-12', cena: 2 },
        message: 'During the past 5 years, the best moment to buy gold was on 2017-03-22 at a rate of 1, while the best moment to sell gold was on 2021-09-12 at a rate of 2. Assuming you had $135, 000 USD to invest, you would have made a profit of $135000'
      }

      expect(res.body).toStrictEqual(expected);
      done();
    });
  });
});
