import React, { useState, useEffect } from "react";

import {
  Anchor,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeadCell,
  TableDataCell,
  Hourglass,
} from "react95";
import { formatMoney } from "src/hooks/operations";
import ApiConfig from "src/config/APIConfig";
import moment from "moment";

export default function VettedTable({ searchToken }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // console.log(searchToken);
  const pcV2 = "0xca143ce32fe78f1f7019d7d551a6402fc5350c73";
  useEffect(() => {
    // console.log(searchToken);
    const web = new WebSocket(ApiConfig.socket);
    try {
      setData();
      setIsLoading(true);
      web.onopen = () => {
        // console.log("connect");
        const dataToSend = {
          contractAddress: searchToken,
        };
        web.send(JSON.stringify(dataToSend));
        web.onmessage = async (event) => {
          // console.log("event", event);
          if (event.data !== "[object Promise]" && event.data !== "null") {
            let obj = JSON.parse(event.data);
            if (obj.responseCode === 200) {
              // console.log(obj);
              setData(obj.responseResult);
              setIsLoading(false);
            }
          }
        };
      };
      return () => {
        web.close();
      };
    } catch (err) {
      console.log("err", err);
      // setIsLoading(false);
    }
  }, [searchToken]);

  return (
    <>
      {isLoading ? (
        <Hourglass />
      ) : (
        <Table className="table-data">
          <TableHead>
            <TableRow head style={{ textAlign: "left" }}>
              <TableHeadCell></TableHeadCell>
              <TableHeadCell>Tokens</TableHeadCell>
              <TableHeadCell>Price</TableHeadCell>
              <TableHeadCell>Price / Token</TableHeadCell>
              <TableHeadCell>Time</TableHeadCell>
              <TableHeadCell>Tx</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.transactions.map((item, index) => {
                const bonPrice =
                  item.exchange.address.address === pcV2
                    ? data.bnbDataV2.price
                    : data.bnbDataV1.price;

                // console.log(item.exchange.address.address);
                return (
                  <TableRow
                    key={`txn${index}`}
                    style={
                      item.sellCurrency.address === searchToken
                        ? { color: "#6bfd00" }
                        : { color: "#ec403c" }
                    }
                  >
                    <TableDataCell>
                      {item.sellCurrency.address === searchToken
                        ? "Buy"
                        : "Sell"}
                    </TableDataCell>
                    <TableDataCell>
                      {item.sellCurrency.address === searchToken
                        ? `${
                            item.sellAmount > 10
                              ? formatMoney(item.sellAmount)
                              : item.sellAmount.toFixed(6)
                          } ${item.sellCurrency.symbol}`
                        : `${
                            item.buyAmount > 10
                              ? formatMoney(item.buyAmount)
                              : item.buyAmount.toFixed(6)
                          } ${item.buyCurrency.symbol}`}
                    </TableDataCell>
                    <TableDataCell>
                      $
                      {item.sellCurrency.address === searchToken
                        ? parseFloat(item.buyAmount * bonPrice).toFixed(6)
                        : parseFloat(item.sellAmount * bonPrice).toFixed(6)}
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                      {item.sellCurrency.address === searchToken
                        ? parseFloat(item.buyAmount).toFixed(9)
                        : parseFloat(item.sellAmount).toFixed(9)}
                      &nbsp;BNB
                    </TableDataCell>
                    <TableDataCell>
                      $
                      {item.sellCurrency.address === searchToken
                        ? parseFloat(
                            (item.buyAmount * bonPrice) / item.sellAmount
                          ).toFixed(11)
                        : parseFloat(
                            (item.sellAmount * bonPrice) / item.buyAmount
                          ).toFixed(11)}
                    </TableDataCell>
                    <TableDataCell>
                      {moment(item.block.timestamp.time).format("LTS")}
                    </TableDataCell>
                    <TableDataCell>
                      <Anchor
                        href={`https://bscscan.com/tx/${item.transaction.hash}`}
                        target="_blank"
                      >
                        {item.transaction.hash.slice(0, 6)}
                      </Anchor>
                    </TableDataCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
    </>
  );
}
