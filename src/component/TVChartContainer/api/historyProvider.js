import axios from "axios";
import moment from "moment";

const history = {};

const getData = async (resolution, from, to) => {
  let token = localStorage.getItem("searchToken");
  let tokenV = localStorage.getItem("tokenV");
  let exchangeAddress =
    tokenV == 1 // eslint-disable-line
      ? "0xbcfccbde45ce874adcb698cc183debcf17952812"
      : "0xca143ce32fe78f1f7019d7d551a6402fc5350c73";
  // console.log("tokenV===>", resolution);
  // console.log("too===>", moment(to * 1000).format("YYYY-MM-DD"));
  // console.log(moment(from * 1000).format("YYYY-MM-DD"));
  const interval =
    resolution === "1D" ? "hour(count: 24)" : "minute(count: 15)";

  const timeIntervalText =
    resolution === "1D" ? "timeInterval.hour" : "timeInterval.minute";

  const res = await axios.post("https://graphql.bitquery.io", {
    query: `query {
        ethereum(network: bsc) {
          dexTrades(
            options: {limit: 2000, asc: "${timeIntervalText}"}
            date: { since: "${moment(from * 1000).format(
              "YYYY-MM-DD"
            )}", till: "${moment(to * 1000).format("YYYY-MM-DD")}" }
            baseCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}
            quoteCurrency: { is: "${token}" }
            exchangeAddress: { is: "${exchangeAddress}" }
          ) {
            timeInterval {
              ${interval}
            }
            baseCurrency {
              symbol
              address
            }
            baseAmount
            quoteCurrency {
              symbol
              address
            }
            quoteAmount
            trades: count
            tradeAmount(in: USDT)
            maximum_price: quotePrice(calculate: maximum)
            minimum_price: quotePrice(calculate: minimum)
            open_price: minimum(of: block, get: quote_price)
            close_price: maximum(of: block, get: quote_price)
            exchange {
              address {
                address
              }
            }
          }
        }
      }
      `,
  });

  return res.data.data.ethereum.dexTrades;
};
// eslint-disable-next-line
export default {
  history: history,

  getBars: function (symbolInfo, resolution, from, to, first, limit) {
    const interval = resolution === "1D" ? "hour" : "minute";
    const fromDate = first ? moment().subtract(60, "days").unix() : from;
    return getData(resolution, fromDate, to).then((data) => {
      if (data.length) {
        var bars = data.map((el, i) => {
          return {
            time: moment(el.timeInterval[interval]).unix() * 1000, //TradingView requires bar time in ms
            low: parseFloat(el.minimum_price / 1e18),
            high: parseFloat(el.maximum_price / 1e18),
            open: parseFloat(el.open_price / 1e18),
            close: parseFloat(el.close_price / 1e18),
            volume: el.tradeAmount,
          };
        });
        // console.log("Barrrdrrtdsfgadfgsadgsagr====>>>>>>>", bars);
        if (first) {
        }
        return bars;
        // return [];
      } else {
        return [];
      }
    });
  },
};
