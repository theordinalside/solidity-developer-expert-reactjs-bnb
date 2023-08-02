import { useEffect, useState } from "react";
import useIsMountedRef from "./useIsMountedRef";

export default function useChainId() {
  const [chainId, setChainId] = useState(null);
  const isMountedRef = useIsMountedRef();

  const onChangeNetwark = (id) => {
    if (isMountedRef.current) {
      setChainId(id);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", onChangeNetwark);
    }
  });
  useEffect(() => {
    const checkNetwork = async () => {
      const id = await window.ethereum.request({ method: "eth_chainId" });
      if (isMountedRef.current) {
        setChainId(id);
      }
    };
    if (window.ethereum) {
      checkNetwork();
    }
  }, []); //eslint-disable-line
  return chainId;
}
