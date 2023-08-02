import historyProvider from "./historyProvider";

const supportedResolutions = ["15", "D"];

const config = {
  supported_resolutions: supportedResolutions,
};
// eslint-disable-next-line
export default {
  onReady: (cb) => {
    // console.log("=====onReady running");
    setTimeout(() => cb(config), 0);
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    // console.log("====Search Symbols running");
  },
  resolveSymbol: (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    // expects a symbolInfo object in response
    // console.log("======resolveSymbol running");

    var descriptionTemp = symbolName.split("-");
    const tokenPrice = localStorage.getItem("tokenPrice");
    const value = Math.ceil(tokenPrice * 1e18);
    const crtIndex = value.toString().length;
    const crtValue = "1e" + crtIndex;
    // console.log("resolveSymbol:", { value, crtIndex, crtValue });
    const token = localStorage.getItem("searchToken");

    var split_data = descriptionTemp[0].split(/[:/]/);
    // console.log({split_data})
    var symbol_stub = {
      token: token,
      name: descriptionTemp[0],
      description: "",
      type: "crypto",
      // session: "24x7",
      timezone: "Etc/UTC",
      // ticker: descriptionTemp[0],
      // exchange: split_data[0],
      minmov: 1,
      pricescale: Number(crtValue) > 1e16 ? 1e16 : Number(crtValue),
      has_intraday: true,
      intraday_multipliers: ["1", "1D"],
      supported_resolution: [supportedResolutions],
      // volume_precision: 8,
      data_status: "streaming",
    };

    // console.log("symbol_stub1111111111111", symbol_stub);

    if (split_data[2].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
      symbol_stub.pricescale = 100;
    }
    setTimeout(function () {
      onSymbolResolvedCallback(symbol_stub);
      // console.log("Resolving that symbol....", symbol_stub);
    }, 0);

    // onResolveErrorCallback('Not feeling it today')
  },
  getBars: function (
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest
  ) {
    // console.log("=====getBars running", {
    //   symbolInfo,
    //   resolution,
    //   from,
    //   to,
    //   onHistoryCallback,
    //   onErrorCallback,
    //   firstDataRequest,
    // });

    // console.log('function args',arguments)
    // console.log(`Requesting bars between ${new Date(from * 1000).toISOString()} and ${new Date(to * 1000).toISOString()}`)
    historyProvider
      .getBars(symbolInfo, resolution, from, to, firstDataRequest)
      .then((bars) => {
        if (bars.length) {
          onHistoryCallback(bars, { noData: false });
        } else {
          onHistoryCallback(bars, { noData: true });
        }
      })
      .catch((err) => {
        console.log({ err });
        onErrorCallback(err);
      });
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    // console.log("=====subscribeBars runnning");
  },
  unsubscribeBars: (subscriberUID) => {
    // console.log("=====unsubscribeBars running");
  },
  calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
    //optional
    // console.log("=====calculateHistoryDepth running resolution0", resolution);
    // while optional, this makes sure we request 24 hours of minute data at a time
    // CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
    return resolution < 60
      ? { resolutionBack: "D", intervalBack: "1" }
      : undefined;
  },
  getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    //optional
    // console.log("=====getMarks running");
  },
  getTimeScaleMarks: (
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution
  ) => {
    //optional
    // console.log("=====getTimeScaleMarks running");
  },
  getServerTime: (cb) => {
    // console.log("=====getServerTime running");
  },
};
