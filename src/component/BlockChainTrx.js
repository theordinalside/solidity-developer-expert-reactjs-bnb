// import { NETWORK_TYPE } from "src/config/APIConfig";
// import axios from "axios";
// import { getAddress, signTransaction, signMessage } from "sats-connect";

// ************************************ Xverse Wallet trxn ************************************
// export const signXverseTrx = async (address, amount) => {
//   try {
//     // SendRawTransaction();
//     // console.log(window.btc, "=====>> 7", address);

//     // //************************** */
//     // const resp = await window.btc?.request("sendTransfer", {
//     //   address: "tb1qkzvk9hr7uvas23hspvsgqfvyc8h4nngeqjqtnj",
//     //   amount: "10000",
//     // });
//     // console.log("----- resp", resp);
//     // //************************** */
//     const signPsbtOptions = {
//       payload: {
//         network: {
//           type: NETWORK_TYPE,
//         },
//         message: "Sign Transaction",
//         psbtBase64: `cHNidP8BAKcCAAAAAtJVbmYvrS64adekw4rhCtbWQNNs9IhWFyNrhYIdkG5dAAAAAAD/////hNCzRVacJR32LJ/chDNUO9B0C3/ci9ZJzHIClfjHLSAAAAAAAP////8CoIYBAAAAAAAiUSCjXEwEb409zg9tZ4NJlmnPqVZaF2TYm9Q1txG7GQ/Q3dB+AQAAAAAAF6kUBE+9kGn9tJlLagtxL54ozfiuyqGHAAAAAAABASughgEAAAAAACJRIDmZV7+7TrMlgI87KFqU2MFVtCS9fmg3f4ZF8zwLgUEtARcguZB1Id24Xg5qN2IrfGhe+9yK5TozSSitvRLPIErU5xcAAQEgoIYBAAAAAAAXqRS9FdmY/QjP0cXH1/+o/144F2orn4ciAgN1Cual4w1uAxLWT+SalvUzyZpqp5eYW7Hlychubra2iEcwRAIgOHUp0YFRZXOrpz5V90PLaPDF/uhCPKLTLbEwVtA7wjsCICPkH0tjb3bS+jmqv/6R746ASxFWGcB8/N41rSHO+4cVAQEEFgAUGAo7GWfcpwS2XI7SsZEN06q8yTIAAAA=`,
//         broadcast: false,
//         inputsToSign: [
//           {
//             address: address[0].address,
//             signingIndexes: [1],
//           },
//         ],
//       },
//       onFinish: (response) => {
//         console.log(response.psbtBase64);
//         onSignMessage(address);
//         alert(response.psbtBase64);
//       },
//       onCancel: () => alert("Canceled"),
//     };

//     await signTransaction(signPsbtOptions);
//   } catch (error) {
//     console.error("error--", error);
//   }
// };
// export const onSignMessage = async (address) => {
//   try {
//     const signMessageOptions = {
//       payload: {
//         network: {
//           type: NETWORK_TYPE,
//         },
//         address: address[0].address,
//         message: "Sign Transaction",
//       },
//       onFinish: (response) => {
//         alert(response);
//       },
//       onCancel: () => alert("Canceled"),
//     };
//     // await signMessage(signMessageOptions);
//   } catch (error) {
//     console.error("error--", error);
//   }
// };
// export const signPsbtRequest = async () => {
//   try {
//   } catch (error) {}
// };

//  *****************************************************************************
//  *****************************************************************************

// const createTransaction = async () => {
//   // Create a Bitcoin network instance (mainnet or testnet)
//   const network = bitcoin.networks.testnet;

//   // Set up your private key and address
//   const privateKey = "your_private_key";
//   const publicKey = "your_public_key";

//   // Set up the transaction inputs and outputs
//   const transaction = new bitcoin.TransactionBuilder(network);
//   transaction.setVersion(1);

//   // Add the transaction inputs (UTXOs) to spend
//   transaction.addInput("previous_txid", "previous_output_index");

//   // Add the transaction outputs
//   transaction.addOutput("recipient_address", "amount_in_satoshi");

//   // Sign the transaction input with your private key
//   const keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, "hex"));
//   transaction.sign(0, keyPair);

//   // Build the transaction
//   const builtTransaction = transaction.build();

//   // Serialize the transaction to hex
//   const serializedTransaction = builtTransaction.toHex();

//   try {
//     // Broadcast the transaction using a Bitcoin API
//     // For testnet, you can use a service like Blockstream's Testnet Explorer
//     // For mainnet, you would use a service like Blockstream's Block Explorer
//     const response = await axios.post(
//       "https://testnet.blockexplorer.com/api/tx/send",
//       {
//         rawtx: serializedTransaction,
//       }
//     );

//     console.log("Transaction sent! TXID:", response.data.txid);
//   } catch (error) {
//     console.error("Error sending transaction:", error);
//   }
// };
//  *****************************************************************************
//  *****************************************************************************
