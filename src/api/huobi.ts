// import axios from 'axios'
import qs from 'qs'
import req from './axios'

/** 取得币种 */
export const getSymbols = async () => {
  const { data } = await req.get('/v1/common/symbols')
  if (!data.data) return {
    list: [], data: ''
  }
  const symbolList: any[] = []
  data.data.forEach((item) => {
    const baseCurrency = ['btc', 'eth'];
    const quoteCurrency = ['usdt']
    if (baseCurrency.includes(item['base-currency']) && quoteCurrency.includes(item['quote-currency'])) {
      symbolList.push({
        ...item,
        pair: item['base-currency'].toLocaleUpperCase() +
          '/' +
          item['quote-currency'].toLocaleUpperCase()
      })
    }
  })

  const symbolData = symbolList.length ? symbolList[0].symbol : ''
  return { list: symbolList, data: symbolData }
}
/** 取得kline历史纪录 */
export const getKlineHistory = async (obj) => {
  const { data } = await req.get(`/market/history/kline?${qs.stringify(obj)}`)
  if (data.status !== 'ok' && !data.data.length) return [null]
  const list = data.data
    .map((item) => {
      return {
        time: item.id * 1000,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.vol,
      }
    })
    .sort((a, b) => (a.time > b.time ? 1 : -1))
  return [list]
}
