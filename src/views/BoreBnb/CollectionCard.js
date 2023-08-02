import React from "react";
import { Button } from "react95";
import CollectionData from "src/hooks/CollectionData.json";

export default function VettedTable() {
  return (
    <>
      {" "}
      <div className="contentgrid">
        {CollectionData.map((item) => {
          return (
            <div className="collectionBox">
              <div className="imageSection">
                <img
                  src={item.image}
                  alt="CollectionImage"
                  className="collectionImg"
                />
              </div>
              <div className="contentBox">
                {/* <p>{item.description}</p> */}
                <h1 style={{ fontSize: "20px" }}>{item.name}</h1>
                <div
                  style={{
                    marginTop: "7px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    disabled
                    style={{ marginRight: "5px", marginBottom: "5px" }}
                  >
                    Buy
                  </Button>
                  {/* <Button
                    disabled
                    style={{ marginRight: "5px", marginBottom: "5px" }}
                  >
                    Game
                  </Button> */}
                  <Button disabled style={{ marginBottom: "5px" }}>
                    Stash
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
