<template>
  <div class="kline">
    <div id="tv_chart_container" />
  </div>
</template>
<script>
import { DataFeed, widget as TvWidget } from "tradingview-api";
import { onMounted, ref, toRefs } from "vue";
import { getKlineHistory } from "@/api/stock";
import { intervalMap, supported_resolutions } from "@/model/timer";
import { ws } from "@/api/socket";
export default {
  name: "KLineWidget",
  props: {
    symbolInfo: {
      type: Object,
      required: true,
    },
    symbol: {
      type: String,
    },
  },
  setup(props) {
    const widget = ref(null);
    const interval = ref("60min");
    const { symbol, symbolInfo } = toRefs(props);
    /** 订阅websocket */
    // const subscribeKLine = () => {
    //   ws.subscribe(
    //     `market.${symbol.value.toLocaleLowerCase()}.kline.${interval.value}`,
    //     {
    //       id: "react-tv",
    //       sub: `market.${symbol.value.toLocaleLowerCase()}.kline.${interval.value}`,
    //     },
    //     (data) => {
    //       const tick = data.tick;
    //       datafeed.value.updateKLine({
    //         time: tick.id * 1000,
    //         open: tick.open,
    //         high: tick.high,
    //         low: tick.low,
    //         close: tick.close,
    //         volume: tick.vol,
    //       });
    //     }
    //   );
    // };
    // /** websocket取消订阅 */
    // const unsubscribeKLine = () => {
    //   ws.unsubscribe(`market.${symbol.value}.kline.${interval.value}`);
    // };
    /** 取得数据订阅数据 */
    const getBars = async (params) => {
      try {
        console.log("params: ", params);
        const size = window.innerWidth;
        // 是否第一次请求历史数据
        if (!params.firstDataRequest) {
          return {
            bars: [],
            meta: {
              noData: true,
            },
          };
        }
        if (params.resolution !== intervalMap[interval.value]) {
          // unsubscribeKLine();
          for (let key in intervalMap) {
            if (intervalMap[key] === params.resolution) {
              interval.value = key;
            }
          }
        }

        // do api get history
        const [list] = await getKlineHistory({
          symbol: symbol.value.toLocaleLowerCase(),
          period: interval.value,
          size: size > 2000 ? 2000 : size,
        });

        if (
          params.resolution === intervalMap[interval.value] &&
          params.firstDataRequest &&
          list
        ) {
          // subscribeKLine();
        }

        if (!list) {
          return {
            bars: [],
            meta: { noData: true },
          };
        }
        return {
          bars: list,
          meta: {
            noData: !list.length,
          },
        };
      } catch (error) {
        console.log("getBars error:", error);
      }
    };
    /** 配置trading-view */
    const resolveSymbol = () => {
      return new Promise((resolve) => {
        resolve({
          name: symbol.value,
          full_name: symbol.value,
          description: symbol.value,
          type: "stock",
          session: "24x7",
          exchange: "Chen",
          listed_exchange: symbol.value,
          timezone: "Asia/Shanghai",
          format: "price",
          pricescale: Math.pow(10, symbolInfo.value["price-precision"]),
          minmov: 1,
          volume_precision: symbolInfo.value["value-precision"],
          has_intraday: true,
          supported_resolutions: supported_resolutions,
        });
      });
    };
    const datafeed = ref(
      new DataFeed({
        getBars: (params) => getBars(params),
        fetchResolveSymbol: () => resolveSymbol(),
        fetchConfiguration: () => {
          return new Promise((resolve) => {
            resolve({
              supported_resolutions,
            });
          });
        },
      })
    );
    /** 初始化trading-view */
    const initTradingView = () => {
      const tv = new TvWidget({
        fullscreen: true,
        symbol: symbol.value,
        interval: intervalMap[interval.value],
        container_id: "tv_chart_container",
        datafeed: datafeed.value,
        library_path: "/charting_library/",
        locale: "zh",
        theme: "light",
        timezone: "Asia/Shanghai",
      });
      tv.onChartReady(function() {
        tv.chart().createStudy("MACD");
        tv.chart().createStudy("Stochastic RSI");
        tv.chart().createStudy("Average Directional Index");
        tv.chart().createStudy("Moving Average", false, false, 5);
        tv.chart().createStudy("Moving Average", false, false, 10);
        tv.chart().createStudy("Moving Average", false, false, 20);
        tv.chart().createStudy("Bollinger Bands");
        tv.applyOverrides({ 'timeScale.rightOffset': '2' });
        console.log(tv)
        console.log('okkkkkkkkk')
        widget.value = tv;
      });
    };
    const setSymbol = (newSymbol) => {
      // unsubscribeKLine();
      symbol.value = newSymbol;
      widget.value.setSymbol(
        newSymbol.toLocaleUpperCase(),
        intervalMap[interval.value],
        () => {
          console.log("------setSymbol---------", symbol.value);
        }
      );
    };
    onMounted(() => {
      initTradingView();
    });

    console.log();
    return {
      widget,
      setSymbol,
    };
  },
};
</script>
<style>
#tv_chart_container {
  position: fixed;
  top: 0;
  /* bottom: 0; */
  left: 0;
  width: 75%;
}
</style>
