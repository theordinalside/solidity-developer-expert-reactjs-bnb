import * as React from "react";
import "./index.css";
import Datafeed from "./api/";
// import { widget } from "../../../public/charting_library";

import { widget } from "src/charting_library/";

// function getLanguageFromURL() {
//   const regex = new RegExp("[\\?&]lang=([^&#]*)");
//   const results = regex.exec(window.location.search);
//   return results === null
//     ? null
//     : decodeURIComponent(results[1].replace(/\+/g, " "));
// }

export function TVChartContainer({ searchToken, tokenName, tokenPrice }) {
  let tokenV = localStorage.getItem("tokenV");
  const [defaultProps, setDefaultProps] = React.useState({
    // symbol: 'Coinbase:BTC/USD',
    searchToken: "0xef2ec90e0b8d4cdfdb090989ea1bc663f0d680bf",
    symbol: `PcSv${tokenV}:BORE/BNB`,
    interval: "15",
    containerId: "tv_chart_container",
    libraryPath: "/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "bsc",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  });

  React.useEffect(() => {
    let tokenV = localStorage.getItem("tokenV");
    if (tokenName.length > 0 && searchToken.length > 0) {
      localStorage.removeItem("searchToken");
      localStorage.setItem("searchToken", searchToken);
      const temp = {
        ...defaultProps,
        symbol: `PcSv${tokenV}:${tokenName}`,
        searchToken: searchToken,
      };
      setDefaultProps(temp);
    }
  }, [tokenName, searchToken]); // eslint-disable-line

  React.useEffect(() => {
    const widgetOptions = {
      theme: "dark",
      debug: false,
      symbol: `${defaultProps.symbol}-${tokenPrice}`,
      datafeed: Datafeed,
      interval: defaultProps.interval,
      container_id: defaultProps.containerId,
      library_path: defaultProps.libraryPath,
      locale: "en",
      disabled_features: [
        "header_symbol_search",
        "header_compare",
        "symbol_info",
        "display_market_status",
        "edit_buttons_in_legend",
        "context_menus",
        "control_bar",
        "border_around_the_chart",
      ],
      enabled_features: ["hide_left_toolbar_by_default"],
      charts_storage_url: defaultProps.chartsStorageUrl,
      charts_storage_api_version: defaultProps.chartsStorageApiVersion,
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      time_frames: [
        {
          text: "1d",
          resolution: "1D",
          description: "1 Day",
        },
        {
          text: "15m",
          resolution: "15",
          description: "1 Minutes",
        },
      ],

      studies_overrides: defaultProps.studiesOverrides,
      overrides: {
        // "mainSeriesProperties.showCountdown": true,
        "paneProperties.background": "#131722",
        "paneProperties.vertGridProperties.color": "#363c4e",
        "paneProperties.horzGridProperties.color": "#363c4e",
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "#AAA",
        "mainSeriesProperties.candleStyle.wickUpColor": "#336854",
        "mainSeriesProperties.candleStyle.wickDownColor": "#7f323f",
      },
    };

    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&& widgetOptions", widgetOptions);

    const tvWidgetBase = new widget(widgetOptions);
    let tvWidget = tvWidgetBase;

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          })
        );

        button.innerHTML = "Check API";
      });
    });

    return () => {
      if (tvWidget !== null) {
        tvWidget.remove();
        tvWidget = null;
      }
    };
  }, [defaultProps]); // eslint-disable-line

  return <div id={defaultProps.containerId} className={"TVChartContainer"} />;
}
