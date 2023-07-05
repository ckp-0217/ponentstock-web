// import axios from 'axios'
import qs from 'qs'
import req from './stockServerRpc'

/** 取得币种 */
export const getSymbols = async () => {
  const { data } = await req.get(`/stockList`);
  console.log(data)

  // const data = [
  //   { "symbol": "sz000001", "name": "平安银行" },
  //   { "symbol": "sh600000", "name": "浦发银行" },
  //   { "symbol": "sz300001", "name": "特锐德" }
  // ]
  const symbolList: any[] = []
  const updatedData = data.map((item) => {
    return {
      symbol: item.code,
      name: item.name,
    };
  });
  updatedData.forEach((item) => {

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
  console.log(obj);

  const { symbol, period, size } = obj;

  const queryParams = qs.stringify({ symbol, period, size });

  try {
    const { data } = await req.get(`/get_stock?${queryParams}`);
    if (!data || data.error) return [null];
    const list = data
      .map((item) => {
        const timestamp = new Date(item.time).getTime();
        return {
          time: timestamp,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volume,
        };
      })
      .sort((a, b) => (a.time > b.time ? 1 : -1));
    console.log(list)
    return [list];
  } catch (error) {
    console.log(error);
    return [null];
  }
};
