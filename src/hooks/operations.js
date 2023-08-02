import { ethers } from "ethers";
import vault from "./abis/vault";
import coreAbi from "./abis/coreAbi";
import pair from "./abis/pair";
import { coreAdd, coreVault, corePair } from "./address";

export function onDragWindow(elmnt) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  let zoom = 1;
  if (width >= 767) {
    const s = Math.min(width / 1280, height / 900);
    zoom = Math.max(0.621, Math.min(s, 1));
  }

  const right = width / zoom - elmnt.offsetLeft - elmnt.offsetWidth;
  const bottom = height / zoom - (elmnt.offsetTop + elmnt.offsetHeight + 44);

  return { left: -elmnt.offsetLeft, top: -elmnt.offsetTop, right, bottom };
}

export function checkMetaMask() {
  let isMetaMask = false;
  if (window.ethereum) {
    isMetaMask = true;
  }
  return isMetaMask;
}

export function sortAddress(add) {
  const sortAdd = `${add.slice(0, 6)}...${add.slice(add.length - 4)}`;
  return sortAdd;
}

export async function getProvider() {
  const provider = await new ethers.providers.Web3Provider(window.ethereum);
  return provider;
}

const getMyAccount = () => {
  const myAdd = window.sessionStorage.getItem("account");
  return myAdd;
};

export async function connectToWallet() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = await getProvider();
  const signer = await provider.getSigner();
  let myAddress = await signer.getAddress();
  window.sessionStorage.setItem("account", myAddress);
  return "connected";
}

const getTotalStake = async () => {
  const myAdd = getMyAccount();
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(coreVault, vault, provider);
  const contractWithSigner = contract.connect(signer);
  const totalStake = await contractWithSigner.userInfo(0, myAdd);
  return totalStake.amount;
};

export async function getCoreData(add, abi, type) {
  const myAdd = getMyAccount();
  const provider = await getProvider();
  const contract = new ethers.Contract(add, abi, provider);
  const totalSupply = await contract.totalSupply();
  const totalWallet = await contract.balanceOf(myAdd);
  let totalClaimable = 0;
  let allowance = 0;
  let totalStake = 0;
  let ethContributed = 0;
  let totalEthContributed = 0;
  const providerBalance = await provider.getBalance(myAdd);

  if (type === "core") {
    const contractVault = new ethers.Contract(coreVault, vault, provider);
    totalClaimable = await contractVault.pendingBore(0, myAdd);

    ethContributed = await contract.ethContributed(myAdd);
    totalEthContributed = await contract.totalETHContributed();
  } else {
    allowance = await contract.allowance(myAdd, coreVault);
    totalStake = await getTotalStake();
  }
  return {
    total: ethers.utils.formatEther(totalSupply),
    wallet: ethers.utils.formatEther(totalWallet),
    totalClaimable: ethers.utils.formatEther(totalClaimable),
    allowance: ethers.utils.formatEther(allowance),
    totalStake: ethers.utils.formatEther(totalStake),
    providerBalance: ethers.utils.formatEther(providerBalance),
    ethContributed: ethers.utils.formatEther(ethContributed),
    totalEthContributed: ethers.utils.formatEther(totalEthContributed),
  };
}

export async function stakeLP(val) {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(coreVault, vault, provider);
  const contractWithSigner = contract.connect(signer);
  const deposit = await contractWithSigner.deposit(
    0,
    ethers.utils.parseEther(val)
  );
  await deposit.wait();
  return deposit;
}

export async function approveLP() {
  const myAdd = getMyAccount();
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(corePair, pair, provider);
  const contractWithSigner = contract.connect(signer);
  const totalWallet = await contract.balanceOf(myAdd);
  const approve = await contractWithSigner.approve(coreVault, totalWallet);
  await approve.wait();
  return approve;
}

export async function claimLPToken() {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(coreAdd, coreAbi, provider);
  const contractWithSigner = contract.connect(signer);
  const claim = await contractWithSigner.claimLPTokens();
  await claim.wait();
  return claim;
}

export async function unStakeLP(val) {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(coreVault, vault, provider);
  const contractWithSigner = contract.connect(signer);
  const withdraw = await contractWithSigner.withdraw(
    0,
    ethers.utils.parseEther(val)
  );
  await withdraw.wait();
  return withdraw;
}

export async function createLGE(msg, val) {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(coreAdd, coreAbi, provider);
  const contractWithSigner = contract.connect(signer);
  let data;
  if (msg === "") {
    data = {
      msg: await contractWithSigner.liquidityGenerationParticipationAgreement(),
      type: "condition",
    };
  } else {
    data = {
      msg: await contractWithSigner.addLiquidity(true, {
        value: ethers.utils.parseEther(val),
      }),
      type: "lge",
    };
    await data.wait();
  }

  return data;
}

export async function getPairInfo() {
  const provider = await getProvider();
  const contract = new ethers.Contract(corePair, vault, provider);
  const coreContract = new ethers.Contract(coreAdd, coreAbi, provider);
  const getReserves = await contract.getReserves();
  const lpTokens = await coreContract.totalLPTokensMinted();
  const totalSupply = await coreContract.totalSupply();
  const lpPerUnit = await coreContract.LPperETHUnit();
  return {
    corePrice: ethers.utils.formatEther(getReserves[0]),
    wEth: ethers.utils.formatEther(getReserves[1]),
    lpTokens: ethers.utils.formatEther(lpTokens),
    totalSupply: ethers.utils.formatEther(totalSupply),
    lpPerUnit: ethers.utils.formatEther(lpPerUnit),
  };
}

export const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatMoney(number) {
  return number.toLocaleString("en-US");
}

export const calculateTimeLeft = (endDate) => {
  if (endDate) {
    let difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  } else {
    return false;
  }
};
