// const url = "https://borecoin.app";

//local

// let url = "https://node.bitcoinlands.xyz";
let url = "https://node.theordinalside.com"; //Live

// let url = "https://node-solidityexpert.mobiloitte.io"; //Stage
// let url = "http://172.16.6.106:1832"; //loc
export const NETWORK_TYPE = "Testnet";
// export const NETWORK_TYPE = "Mainnet";

export const adminWalletAddress = "bc1qc74k3s5v5392fzsvnr49ktkznz6lf9cy5uypef";
// let url = "http://172.16.2.13:1832";
// let url = "https://api-blockchaindeveloper.mobiloitte.com";
// let socket = "wss://api-blockchaindeveloper.mobiloitte.com";
// let socketlive = "wss://borecoin.app";

const ApiConfig = {
  listAdvertisement: `${url}/api/v1/user/listAdvertisement`,
  connectWallet: `${url}/api/v1/user/connectWallet`,
  addVotes: `${url}/api/v1/user/addVotes`,
  topVotes: `${url}/api/v1/user/topVotes`,
  inscriptionsList: `${url}/api/v1/user/inscriptionsList`,
  contactUsList: `${url}/api/v1/contactUs/contactUsList`,
  listVetted: `${url}/api/v1/user/listVetted`,
  topCoins: `${url}/api/v1/user/topCoins`,
  listTopRightAdd: `${url}/api/v1/user/listTopRightAdd`,
  buySlot: `${url}/api/v1/user/buySlot`,
  uploadImage: `${url}/api/v1/user/uploadImage`,
  profile: `${url}/api/v1/user/profile`,

  // socket: "wss://api-blockchaindeveloper.mobiloitte.com",
  // socket: "wss://node-solidityexpert.mobiloitte.io",
  socket: "wss://node.bitcoinlands.xyz",
};

export default ApiConfig;
