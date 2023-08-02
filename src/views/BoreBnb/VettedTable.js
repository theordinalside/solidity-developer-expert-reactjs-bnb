import React, { useState, useEffect } from "react";
import axios from "axios";
import useIsMountedRef from "src/hooks/useIsMountedRef";
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
import ApiConfig from "src/config/APIConfig";
export default function VettedTable({ openTeken }) {
  const isMountedRef = useIsMountedRef();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(ApiConfig.listVetted).then((result) => {
      if (result.data.response_code === 200) {
        if (isMountedRef.current) {
          // console.log("New data==>", result.data.result);
          setData(result.data.result);
        }
      }
      setIsLoading(false);
    });
  }, []); //eslint-disable-line
  // console.log("data new change==>", data);
  return (
    <div style={{ width: "25%" }}>
      <h3 className="m-b-10 p-t-5">
        <strong>Promoted</strong>
      </h3>
      {isLoading ? (
        <Hourglass />
      ) : (
        <Table className="table-data">
          <TableHead>
            <TableRow head>
              <TableHeadCell>Tokens</TableHeadCell>
              <TableHeadCell>Visit</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableDataCell>
                    <Anchor onClick={() => openTeken(item.tokenId)}>
                      {item.name}
                    </Anchor>
                  </TableDataCell>
                  <TableDataCell style={{ textAlign: "right" }}>
                    <Anchor
                      href={item.websiteUrl}
                      target="_blank"
                      style={{ marginRight: 10 }}
                    >
                      <img
                        src="images/glob.png"
                        alt=""
                        width="20"
                        style={{ verticalAlign: "middle" }}
                      />
                    </Anchor>
                    <Anchor href={item.telegramUrl} target="_blank">
                      <img
                        src="images/telegram-32x32.png"
                        alt=""
                        width="20"
                        style={{ verticalAlign: "middle" }}
                      />
                    </Anchor>
                  </TableDataCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
