// // Import required libraries
// const { Web3 } = require("web3");
// require("dotenv").config();
// const {
//   Token,
//   WETH,
//   Fetcher,
//   Route,
//   Trade,
//   TokenAmount,
//   TradeType,
//   Percent,
// } = require("@uniswap/sdk-core");
// const {
//   Pool,
//   Position,
//   NonfungiblePositionManager,
//   SwapRouter,
// } = require("@uniswap/v3-sdk");
// const { ChainId, CurrencyAmount } = require("@uniswap/sdk-core");

// // Connect to the Ethereum network (Polygon Mainnet for WMATIC)
// const web3 = new Web3(process.env.INFURA_URL);

// // Define token details (WMATIC and USDC)
// const WMATIC = new Token(
//   ChainId.MAINNET,
//   "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
//   18,
//   "WMATIC",
//   "Wrapped Matic"
// );
// const USDC = new Token(
//   ChainId.MAINNET,
//   "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
//   6,
//   "USDC",
//   "USD Coin"
// );

// // Set up wallet details (replace with your own private key and address)
// const privateKey = process.env.PRIVATE_KEY;
// const account = web3.eth.accounts.privateKeyToAccount(privateKey);
// web3.eth.accounts.wallet.add(account);
// const walletAddress = account.address;
// // ABI for ERC20 approve function
// const erc20Abi = [
//   // Only including the approve function
//   {
//     constant: false,
//     inputs: [
//       {
//         name: "_spender",
//         type: "address",
//       },
//       {
//         name: "_value",
//         type: "uint256",
//       },
//     ],
//     name: "approve",
//     outputs: [
//       {
//         name: "",
//         type: "bool",
//       },
//     ],
//     type: "function",
//   },
// ];

// // Address for Uniswap V3 router
// const uniswapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

// // Approve WMATIC
// async function approveWmatic(spender, amount) {
//   const contract = new web3.eth.Contract(erc20Abi, WMATIC.address);
//   const tx = contract.methods.approve(spender, amount);
//   const gas = await tx.estimateGas({ from: walletAddress });
//   const gasPrice = await web3.eth.getGasPrice();

//   const data = tx.encodeABI();
//   const txData = {
//     from: walletAddress,
//     to: WMATIC.address,
//     data,
//     gas,
//     gasPrice,
//   };

//   const receipt = await web3.eth.sendTransaction(txData);
//   console.log("Approval receipt: ", receipt);
// }

// const amountToApprove = web3.utils.toWei("1", "ether"); // Approve 1 WMATIC
// approveWmatic(uniswapRouterAddress, amountToApprove);
// const swapRouterAbi = require("@uniswap/v3-sdk/abis/SwapRouter.json");

// async function swapWmaticToUsdc(amountIn, amountOutMin) {
//   const contract = new web3.eth.Contract(swapRouterAbi, uniswapRouterAddress);

//   const params = {
//     tokenIn: WMATIC.address,
//     tokenOut: USDC.address,
//     fee: 3000, // 0.3% fee tier
//     recipient: walletAddress,
//     deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current time
//     amountIn,
//     amountOutMinimum: amountOutMin,
//     sqrtPriceLimitX96: 0,
//   };

//   const tx = contract.methods.exactInputSingle(params);
//   const gas = await tx.estimateGas({ from: walletAddress });
//   const gasPrice = await web3.eth.getGasPrice();

//   const data = tx.encodeABI();
//   const txData = {
//     from: walletAddress,
//     to: uniswapRouterAddress,
//     data,
//     gas,
//     gasPrice,
//   };

//   const receipt = await web3.eth.sendTransaction(txData);
//   console.log("Swap receipt: ", receipt);
// }

// // Example swap: 1 WMATIC to minimum 0.9 USDC (you need to calculate a reasonable amountOutMin)
// const amountIn = web3.utils.toWei("1", "ether");
// const amountOutMin = web3.utils.toWei("0.9", "mwei"); // 0.9 USDC (USDC has 6 decimals)

// swapWmaticToUsdc(amountIn, amountOutMin);
const { ethers } = require("ethers");
const {
  Fetcher,
  Route,
  Trade,
  TokenAmount,
  TradeType,
  Percent,
} = require("@uniswap/sdk");
const { Token } = require("@uniswap/sdk-core");
require("dotenv").config();

// Define provider (using Infura or Alchemy)
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

// Wallet setup with your private key (NEVER SHARE YOUR REAL PRIVATE KEY)
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

// Addresses for the Uniswap V2 Router, WMATIC token, and USDT token on Ethereum Mainnet
const uniswapV2RouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const WMATIC_ADDRESS = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

// Setup the Uniswap router interface
const uniswapV2RouterABI = [
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
];
const router = new ethers.Contract(
  uniswapV2RouterAddress,
  uniswapV2RouterABI,
  wallet
);

// Define the slippage tolerance
const slippageTolerance = new Percent("50", "10000"); // 0.5%

async function getAmountOutMin() {
  // Define tokens
  const WMATIC = new Token(137, WMATIC_ADDRESS, 18, "WMATIC", "Wrapped Matic");
  const USDT = new Token(137, USDT_ADDRESS, 6, "USDT", "USD Coin");

  // Fetch pair data
  const pair = await Fetcher.fetchPairData(WMATIC, USDT, provider);
  const route = new Route([pair], WMATIC);

  // Define the trade
  const amountIn = ethers.utils.parseUnits("0.3", 18);
  const trade = new Trade(
    route,
    new TokenAmount(WMATIC, amountIn.toString()),
    TradeType.EXACT_INPUT
  );

  // Calculate amountOutMin considering slippage
  const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw.toString();

  return amountOutMin;
}

async function swapTokens() {
  try {
    const amountIn = ethers.utils.parseUnits("0.3", 18); // WMATIC has 18 decimal places
    const amountOutMin = await getAmountOutMin(); // Get minimum amount out

    console.log(
      `amountOutMin: ${ethers.utils.formatUnits(amountOutMin, 6)} USDT`
    );

    // Fetch current gas price and nonce
    const gasPrice = await provider.getGasPrice();
    console.log(
      `Current gas price: ${ethers.utils.formatUnits(gasPrice, "gwei")} gwei`
    );

    const nonce = await provider.getTransactionCount(wallet.address, "latest");
    console.log(`Current nonce: ${nonce}`);

    const tx = await router.swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      [WMATIC_ADDRESS, USDT_ADDRESS],
      wallet.address,
      Math.floor(Date.now() / 1000) + 60 * 20,
      {
        gasLimit: 250000,
        gasPrice,
        nonce, // Include the nonce here
      }
    );

    console.log(`Transaction hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
  } catch (error) {
    console.error("Transaction Error:", error);

    // Handle replaced transaction error
    if (error.code === "TRANSACTION_REPLACED") {
      console.error(
        "Transaction was replaced. New transaction hash:",
        error.replacement.hash
      );
      const receipt = await provider.getTransactionReceipt(
        error.replacement.hash
      );
      if (receipt && receipt.status === 1) {
        console.log(
          "Replacement transaction confirmed in block:",
          receipt.blockNumber
        );
      } else {
        console.log("Replacement transaction failed.");
      }
    }
  }
}

swapTokens().catch((error) => {
  console.error("Unhandled Error:", error);
});
