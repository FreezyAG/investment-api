import logger from "./utils/logger";

import services from './services'

const getBestInvestmentDates = async function (_req, res) {

  try {

    const investmentDataForPastYears = await services.getInvestmentDataForPastYear(5) // data format : { data: '2021-03-22', cena: 216.83 } }

    const { maxIndex, minIndex } = services.getStatistics(investmentDataForPastYears)

    const minimum = investmentDataForPastYears[minIndex]
    const maximum = investmentDataForPastYears[maxIndex]

    const message = `During the past 5 years, the best moment to buy gold was on ${minimum.data} at a rate of ${minimum.cena}, ` +
      `while the best moment to sell gold was on ${maximum.data} at a rate of ${maximum.cena}. ` +
      `Assuming you had $135, 000 USD to invest, you would have made a profit of $${135000 * (maximum.cena - minimum.cena)}`

      const result = {
        bestTimeToBuyGold: minimum,
        bestTimeToSellGold: maximum,
        message
      }

    res.status(200).json(result);

  } catch (err) {

    logger.error(err)
    res.status(500).json({message: err.message});

  }

}

export default {
  getBestInvestmentDates,
  routeNotFound: (_req, res) => res.status(404).json({ message: 'Route not found.' })
}
