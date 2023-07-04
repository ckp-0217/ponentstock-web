// import axios from 'axios'
import qs from 'qs'
import req from './axios'

/** 取得币种 */
export const getSymbols = async () => {
  const data = [
    { "symbol": "sz000001", "name": "平安银行" },
    { "symbol": "sh600000", "name": "浦发银行" },
    { "symbol": "sz300001", "name": "特锐德" }
  ]
  const symbolList: any[] = []

  data.forEach((item) => {

    symbolList.push({
      ...item,
      pair: item['symbol'].toLocaleUpperCase() +
        ' ' +
        item['name'].toLocaleUpperCase()
    })
  })
  const symbolData = symbolList.length ? symbolList[0].symbol : ''
  return { list: symbolList, data: symbolData }
}
/** 取得kline历史纪录 */
export const getKlineHistory = async (obj) => {
  console.log(obj)

  const { data } = await req.get(`/market/history/kline?${qs.stringify(obj)}`)
  if (data.status !== 'ok' && !data.data.length) return [null]
  console.log(data.data)
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
