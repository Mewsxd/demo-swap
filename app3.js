// const { ethers } = require("ethers");
// require("dotenv").config();

// // Define provider (using Infura or Alchemy)
// const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

// // Wallet setup with your private key (NEVER SHARE YOUR REAL PRIVATE KEY)
// const privateKey = process.env.PRIVATE_KEY;
// const wallet = new ethers.Wallet(privateKey, provider);

// // Addresses for the Uniswap V2 Router, MATIC token, and USDT token on Ethereum Mainnet
// const uniswapV2RouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
// // const MATIC_ADDRESS = "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"; // Placeholder, adjust if needed
// const WMATIC_ADDRESS = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
// const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

// // Setup the Uniswap router interface
// const uniswapV2RouterABI = [
//   "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
// ];
// const router = new ethers.Contract(
//   uniswapV2RouterAddress,
//   uniswapV2RouterABI,
//   wallet
// );

// // Define the swap parameters
// const amountIn = ethers.utils.parseUnits("0.3", 18); // MATIC has 18 decimal places
// const amountOutMin = 0; // Set to 0 for the example, ideally use a proper slippage calculation
// const path = [WMATIC_ADDRESS, USDT_ADDRESS];
// const to = wallet.address; // Recipient of the USDT
// const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

// async function swapTokens() {
//   try {
//     const tx = await router.swapExactTokensForTokens(
//       amountIn,
//       amountOutMin,
//       path,
//       to,
//       deadline,
//       { gasLimit: 250000, gasPrice: ethers.utils.parseUnits("70", "gwei") }
//     );
//     console.log(`Transaction hash: ${tx.hash}`);
//     // console.log(tx);
//     // const receipt = await tx.wait();
//     tx.wait().then((a) => {
//       console.log(a);
//     });
//     // console.log("Transaction confirmed in block:", receipt.blockNumber);
//   } catch (error) {
//     console.error("Transaction Error:", error);
//   }
// }

// swapTokens().catch((error) => {
//   console.error("Unhandled Error:", error);
// });
const { ethers } = require("ethers");
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

// Define the swap parameters
const amountIn = ethers.utils.parseUnits("0.3", 18); // WMATIC has 18 decimal places
const amountOutMin = 0; // Set to 0 for the example, ideally use a proper slippage calculation
const path = [WMATIC_ADDRESS, USDT_ADDRESS];
const to = wallet.address; // Recipient of the USDT
const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

async function swapTokens() {
  try {
    // Fetch current gas price
    let gasPrice = await provider.getGasPrice();
    price = ethers.utils.formatUnits(gasPrice, "gwei");
    console.log(gasPrice);
    console.log(`Current gas price: ${price} gwei`);

    // Fetch current nonce for the wallet address
    const nonce = await provider.getTransactionCount(wallet.address);
    console.log(`Current nonce: ${nonce}`);

    const tx = await router.swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      path,
      to,
      deadline,
      {
        gasLimit: 250000,
        gasPrice,
        nonce, // Add the nonce here
      }
    );

    console.log(`Transaction hash: ${tx.hash}`);
    // const receipt = await tx.wait();
    tx.wait().then((a) => console.log(a));
    // console.log("Transaction confirmed in block:", receipt.blockNumber);
  } catch (error) {
    console.error("Transaction Error:", error);
  }
}

swapTokens().catch((error) => {
  console.error("Unhandled Error:", error);
});
