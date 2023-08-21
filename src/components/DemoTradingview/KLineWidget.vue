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
          // exchange: "stock",
          listed_exchange: symbol.value,
          // timezone: "Asia/Shanghai",
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
        custom_indicators_getter: function (PineJS) {
          return Promise.resolve([

            {
              name: "Bar Colorer Demo",
              metainfo: {
                _metainfoVersion: 42,

                id: "BarColoring@tv-basicstudies-1",

                name: "BarColoring",
                description: "Bar Colorer Demo",
                shortDescription: "BarColoring",
                scriptIdPart: "",
                is_price_study: true,
                is_hidden_study: false,
                isCustomIndicator: true,

                isTVScript: false,
                isTVScriptStub: false,
                defaults: {
                  precision: 4,
                  palettes: {
                    palette_0: {
                      // 调色板颜色
                      // 将其更改为您喜欢的默认颜色，
                      // 但请注意，用户可以在“样式”选项卡中更改它们
                      // 指标属性
                      colors: [
                        { color: "#FFFF00" },
                        { color: "#0000FF" }
                      ]
                    }
                  }
                },
                inputs: [],
                plots: [{
                  id: "plot_0",

                  // plot类型应设置为 'bar_colorer'
                  type: "bar_colorer",

                  // 这是定义的调色板的名称
                  // 在 'palettes' 和 'defaults.palettes' 部分
                  palette: "palette_0"
                },
                {
                  id: "line_plot",
                  type: "line", // 设置类型为线
                  value: "lineValue" // 指定用于绘制线的值的键名
                }],
                palettes: {
                  palette_0: {
                    colors: [
                      { name: "Color 0" },
                      { name: "Color 1" }
                    ],

                    // 值之间的映射
                    // 返回脚本和调色板颜色
                    valToIndex: {
                      100: 0,
                      200: 1
                    }
                  }
                }
              },
              constructor: function () {
                this.init = function (context, input) {
                  this.fakeData = [
                    4, 9, 2, 5, 8,
                    1, 7, 6, 3, 10,
                    7, 5, 2, 4, 8,
                    9, 3, 1, 6, 10
                  ]
                };
                this.main = function (context, input) {
                  this._context = context;
                  this._input = input;

                  var valueForColor0 = 100;
                  var valueForColor1 = 200;

                  // 在这里执行计算并返回其中一个常量
                  // 在'valToIndex'映射中指定为键
                  var result =
                    Math.random() * 100 % 2 > 1 ? // 我们随机选择一个颜色值
                      valueForColor0 : valueForColor1;
                  
                  console.log(context.symbol)
                  var lineValue = context.symbol.close/2 // 根据您的需求自定义此函数

                  return [result, lineValue];
                }
              }
            }
          ]);
        },
        // timezone: "Asia/Shanghai",
      });
      function calculateLineValue(context, input) {
        // 您可以访问 context 和 input 来获取所需的数据
        // 下面是一个简单示例，使用两个不同周期的简单移动平均线

        // 获取输入价格数据（您可能需要调整以匹配您的数据结构）
        var prices = input || [];
        // console.log(prices)

        // 计算两个不同周期的移动平均线
        var maShort = movingAverage(prices, 5);
        var maLong = movingAverage(prices, 10);

        // 返回两个移动平均线的差异
        return maShort - maLong;
      }

      // 辅助函数，计算简单移动平均线
      function movingAverage(data, period) {
        if (data.length < period) return 0;
        var sum = 0;
        for (var i = data.length - period; i < data.length; i++) {
          sum += data[i];
        }
        return sum / period;
      }
      tv.onChartReady(function () {
        tv.chart().createStudy("MACD", false, false, [10, 20, 'close', 7]);
        tv.chart().createStudy("Stochastic RSI");
        // tv.chart().createStudy("Average Directional Index");
        tv.chart().createStudy("Moving Average", false, false, 5);
        tv.chart().createStudy("Moving Average", false, false, 10);
        tv.chart().createStudy("Moving Average", false, false, 20);
        tv.chart().createStudy('Bar Colorer Demo', false, true);
        // tv.chart().createStudy("Bollinger Bands");
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
