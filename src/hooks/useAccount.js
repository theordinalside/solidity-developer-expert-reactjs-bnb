import { useEffect, useState } from "react";

export default function useAccount() {
  const [changeAccout, setChangeAccount] = useState(
    window.sessionStorage.getItem("account")
  );

  const OnChangeAccount = (accounts) => {
    let currentAccount = null;
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
      window.sessionStorage.removeItem("account");
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      window.sessionStorage.setItem("account", currentAccount);
      // Do any other work!
    }
    setChangeAccount(currentAccount);
  };
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", OnChangeAccount);
    }
  });
  return changeAccout;
}
