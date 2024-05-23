const { ethers, getAddress } = require("ethers");
const UNISWAP = require("@uniswap/sdk");
const ABI = require("./abi.json");
const fs = require("fs");
const {
  Token,
  WETH,
  Fetcher,
  Route,
  Trade,
  TokenAmount,
  TradeType,
  Percent,
  Pair,
} = require("@uniswap/sdk");
require("dotenv").config();
let provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const UNISWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
const UNISWAP_ROUTER_CONTRACT = new ethers.Contract(
  UNISWAP_ROUTER_ADDRESS,
  ABI,
  provider
);
// console.log(UNISWAP_ROUTER_CONTRACT);
const MATIC = new Token(
  137,
  "0x0000000000000000000000000000000000001010",
  18,
  "MATIC",
  "Matic Token"
);
const USDT = new Token(
  137,
  // "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  6,
  "USDT",
  "Tether USD"
);
async function swapTokens(token1, token2, amount, slippage = "50") {
  try {
    async function getPair() {
      const pairAddress = Pair.getAddress(token1, token2);
      const pairContract = new ethers.Contract(
        pairAddress,
        [
          {
            constant: true,
            inputs: [],
            name: "getReserves",
            outputs: [
              { internalType: "uint112", name: "_reserve0", type: "uint112" },
              { internalType: "uint112", name: "_reserve1", type: "uint112" },
              {
                internalType: "uint32",
                name: "_blockTimestampLast",
                type: "uint32",
              },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
          },
        ],
        provider
      );
      const reserves = await pairContract["getReserves"]();
      const [reserve0, reserve1] = [
        reserves._reserve0.toString(),
        reserves._reserve1.toString(),
      ];

      const tokens = [token1, token2[137]];
      const [t0, t1] = tokens[0].sortsBefore(tokens[1])
        ? tokens
        : [tokens[1], tokens[0]];

      const pair = new Pair(
        new TokenAmount(t0, reserve0),
        new TokenAmount(t1, reserve1)
      );
      console.log("pair:", pair);
      return pair;
    }
    console.log("HJ GCDAYUHJB");
    const pair1 = await getPair();
    console.log("pAIR 1:", pair1);
    const pair = await Fetcher.fetchPairData(token1, token2, provider); //creating instances of a pair
    const route = new Route([pair], token2); // a fully specified path from input token to output token
    let amountIn = ethers.utils.parseEther(amount.toString()); //helper function to convert ETH to Wei
    amountIn = amountIn.toString();

    const slippageTolerance = new Percent(slippage, "10000"); // 50 bips, or 0.50% - Slippage tolerance

    const trade = new Trade( //information necessary to create a swap transaction.
      route,
      new TokenAmount(token2, amountIn),
      TradeType.EXACT_INPUT
    );

    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw; // needs to be converted to e.g. hex
    const amountOutMinHex = ethers.BigNumber.from(
      amountOutMin.toString()
    ).toHexString();
    const path = [token2.address, token1.address]; //An array of token addresses
    const to = wallet.address; // should be a checksummed recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
    const value = trade.inputAmount.raw; // // needs to be converted to e.g. hex
    const valueHex = ethers.BigNumber.from(value.toString()).toHexString(); //convert to hex string

    //Return a copy of transactionRequest, The default implementation calls checkTransaction and resolves to if it is an ENS name, adds gasPrice, nonce, gasLimit and chainId based on the related operations on Signer.
    const rawTxn =
      // UNISWAP_ROUTER_CONTRACT.populateTransaction.swapExactTokensForTokens
      await UNISWAP_ROUTER_CONTRACT.populateTransaction.swapExactTokensForTokens(
        amountOutMinHex,
        path,
        to,
        deadline,
        {
          value: valueHex,
        }
      );

    //Returns a Promise which resolves to the transaction.
    let sendTxn = wallet.sendTransaction(rawTxn);

    //Resolves to the TransactionReceipt once the transaction has been included in the chain for x confirms blocks.
    let reciept = (await sendTxn).wait();

    //Logs the information about the transaction it has been mined.
    if (reciept) {
      console.log(
        " - Transaction is mined - " + "\n" + "Transaction Hash:",
        (await sendTxn).hash +
          "\n" +
          "Block Number: " +
          (await reciept).blockNumber +
          "\n" +
          "Navigate to https://rinkeby.etherscan.io/txn/" +
          (await sendTxn).hash,
        "to see your transaction"
      );
    } else {
      console.log("Error submitting transaction");
    }
  } catch (e) {
    console.log(e);
  }
}
swapTokens(MATIC, USDT, 0.1);
// require("dotenv").config();
// const { ethers } = require("ethers");
// const {
//   Token,
//   Fetcher,
//   Route,
//   Trade,
//   TokenAmount,
//   TradeType,
//   Percent,
// } = require("@uniswap/sdk");

// // Initialize provider and wallet
// const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// // Uniswap V2 router address on Polygon
// const UNISWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

// // ABI of the Uniswap V2 router
// const UNISWAP_ROUTER_ABI = [
//   // Add the ABI JSON of Uniswap V2 router
// ];

// // Create an instance of the Uniswap V2 router contract
// const uniswapRouter = new ethers.Contract(
//   UNISWAP_ROUTER_ADDRESS,
//   UNISWAP_ROUTER_ABI,
//   wallet
// );

// // MATIC and USDT token addresses on Polygon
// const MATIC = new Token(
//   137,
//   "0x0000000000000000000000000000000000001010",
//   18,
//   "MATIC",
//   "Matic Token"
// );
// const USDT = new Token(
//   137,
//   "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
//   6,
//   "USDT",
//   "Tether USD"
// );

// async function swapExactTokensForTokens(
//   token1,
//   token2,
//   amount,
//   slippage = "50"
// ) {
//   try {
//     // Fetch pair data for the tokens
//     const pair = await Fetcher.fetchPairData(token1, token2, provider);

//     // Create a route for the trade
//     const route = new Route([pair], token1);

//     // Define the amount to swap
//     const amountIn = ethers.utils.parseUnits(
//       amount.toString(),
//       token1.decimals
//     );

//     // Set up slippage tolerance
//     const slippageTolerance = new Percent(slippage, "10000"); // 50 bips, or 0.50%

//     // Create the trade instance
//     const trade = new Trade(
//       route,
//       new TokenAmount(token1, amountIn.toString()),
//       TradeType.EXACT_INPUT
//     );

//     // Calculate minimum amount out with slippage tolerance
//     const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
//     const amountOutMinHex = ethers.BigNumber.from(
//       amountOutMin.toString()
//     ).toHexString();

//     // Define path, recipient, deadline, and value for the transaction
//     const path = [token1.address, token2.address];
//     const to = wallet.address;
//     const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current time
//     const value = trade.inputAmount.raw;
//     const valueHex = ethers.BigNumber.from(value.toString()).toHexString();

//     // Populate transaction for swapExactTokensForTokens
//     const rawTxn =
//       await uniswapRouter.populateTransaction.swapExactTokensForTokens(
//         valueHex,
//         amountOutMinHex,
//         path,
//         to,
//         deadline
//       );

//     // Send the transaction
//     const txResponse = await wallet.sendTransaction(rawTxn);
//     console.log("Transaction Hash:", txResponse.hash);

//     // Wait for the transaction to be mined
//     const receipt = await txResponse.wait();
//     console.log("Transaction was mined in block:", receipt.blockNumber);
//   } catch (error) {
//     console.error("Error executing swap:", error);
//   }
// }

// // Swap 1 MATIC for USDT
// swapExactTokensForTokens(MATIC, USDT, 1).catch(console.error);
