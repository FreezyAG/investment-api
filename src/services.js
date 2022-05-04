import moment from 'moment-timezone'
import superagent from 'superagent'

const getInvestmentDataForPastYear = async (numberOfYears) => {

  const investmentDataForPastYears = []
  let years = numberOfYears

  while (years > 0) {

    const from = moment().subtract(years, 'years').format(moment.HTML5_FMT.DATE)
    const to = moment().subtract(years - 1, 'years').format(moment.HTML5_FMT.DATE)

    try {
      const investmentDataResponse = await superagent.get(`http://api.nbp.pl/api/cenyzlota/${from}/${to}`)

      investmentDataForPastYears.push(...investmentDataResponse.body)
    } catch (err) {
      throw err
    }

    years--
  }

  return investmentDataForPastYears

}

const getStatistics = (data) => {

  return data.reduce((acc, elem, index) => {

    const { max, min } = acc

    if (elem.cena > max) {
      acc.max = elem.cena
      acc.maxIndex = index
    }

    if (elem.cena < min) {
      acc.min = elem.cena
      acc.minIndex = index
    }

    return acc

  }, { max: Number.MIN_SAFE_INTEGER, min: Number.MAX_SAFE_INTEGER, maxIndex: -1, minIndex: -1 })

}

export default {
  getInvestmentDataForPastYear,
  getStatistics
}