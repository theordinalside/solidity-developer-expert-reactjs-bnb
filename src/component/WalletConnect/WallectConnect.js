import React, { useState, useRef } from "react";

import bitcore from "bitcore-lib";

const BitcoinWallet = () => {
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const windowRef = useRef(null);

  const generateWallet = ({ boundMove, handleDrag }) => {
    const privateKey = new bitcore.PrivateKey();
    const address = privateKey.toAddress();

    setAddress(address.toString());
    setPrivateKey(privateKey.toString());
  };

  return (
    <>
      {/* <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      bounds={boundMove}
      position={null}
      onDrag={handleDrag}
      allowAnyClick={true}
      handle=".move"
    >
      <Window
        className="window borebnb"
        ref={windowRef}
        // style={active ? { zIndex: 129 } : { zIndex: 109 }}
      >
        <WindowHeader className="window-header"
        //  active={active}
         >
          Collections
          <div className="displayEnd">
            <Button onClick={() => close()} className="closeButton">
              <span className="close-icon" />
            </Button>
          </div>
        </WindowHeader>
        <WindowContent className="window-content"> */}
      <div>
        <button onClick={generateWallet}>Generate Wallet</button>
        <div>Address: {address}</div>
        <div>Private Key: {privateKey}</div>
      </div>
      {/* </WindowContent>
      </Window>
    </Draggable> */}
    </>
  );
};

export default BitcoinWallet;
