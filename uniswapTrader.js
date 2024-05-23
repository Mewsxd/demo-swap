// const { ethers } = require("ethers");
// const {
//   abi: IUniswapV3PoolABI,
// } = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
// const {
//   abi: SwapRouterABI,
// } = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");
// const { getPoolImmutables, getPoolState } = require("./helper");
// const ERC20ABI = require("./abi.json");

// require("dotenv").config();
// const INFURA_URL_TESTNET = process.env.INFURA_URL_TESTNET;
// const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
// const WALLET_SECRET = process.env.WALLET_SECRET;

// const provider = new ethers.JsonRpcProvider(INFURA_URL_TESTNET); // Ropsten
// const poolAddress = "0x4D7C363DED4B3b4e1F954494d2Bc3955e49699cC"; // UNI/WETH
// const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

// const name0 = "Wrapped Ether";
// const symbol0 = "WETH";
// const decimals0 = 18;
// const address0 = "0xc778417e063141139fce010982780140aa0cd5ab";

// const name1 = "Uniswap Token";
// const symbol1 = "UNI";
// const decimals1 = 18;
// const address1 = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";

// async function main() {
//   const poolContract = new ethers.Contract(
//     poolAddress,
//     IUniswapV3PoolABI,
//     provider
//   );

//   const immutables = await getPoolImmutables(poolContract);
//   const state = await getPoolState(poolContract);

//   const wallet = new ethers.Wallet(WALLET_SECRET);
//   const connectedWallet = wallet.connect(provider);

//   const swapRouterContract = new ethers.Contract(
//     swapRouterAddress,
//     SwapRouterABI,
//     provider
//   );

//   const inputAmount = 0.001;
//   // .001 => 1 000 000 000 000 000
//   const amountIn = ethers.utils.parseUnits(inputAmount.toString(), decimals0);

//   const approvalAmount = (amountIn * 100000).toString();
//   const tokenContract0 = new ethers.Contract(address0, ERC20ABI, provider);
//   const approvalResponse = await tokenContract0
//     .connect(connectedWallet)
//     .approve(swapRouterAddress, approvalAmount);

//   const params = {
//     tokenIn: immutables.token1,
//     tokenOut: immutables.token0,
//     fee: immutables.fee,
//     recipient: WALLET_ADDRESS,
//     deadline: Math.floor(Date.now() / 1000) + 60 * 10,
//     amountIn: amountIn,
//     amountOutMinimum: 0,
//     sqrtPriceLimitX96: 0,
//   };

//   const transaction = swapRouterContract
//     .connect(connectedWallet)
//     .exactInputSingle(params, {
//       gasLimit: ethers.utils.hexlify(1000000),
//     })
//     .then((transaction) => {
//       console.log(transaction);
//     });
// }

// main();

// const { ethers } = require("ethers");
// const {
//   abi: IUniswapV3PoolABI,
// } = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
// const {
//   abi: SwapRouterABI,
// } = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");
// const { getPoolImmutables, getPoolState } = require("./helpers");
// const ERC20ABI = require("./abi.json");

// require("dotenv").config();
// const INFURA_URL_TESTNET = process.env.INFURA_URL_TESTNET;
// const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
// const WALLET_SECRET = process.env.WALLET_SECRET;

// const provider = new ethers.providers.JsonRpcProvider(INFURA_URL_TESTNET); // Ropsten
// const poolAddress = "0x4D7C363DED4B3b4e1F954494d2Bc3955e49699cC"; // UNI/WETH
// const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

// const name0 = "MATIC";
// const symbol0 = "MATIC";
// const decimals0 = 18;
// const address0 = "0x0000000000000000000000000000000000001010";

// const name1 = "Uniswap Token";
// const symbol1 = "UNI";
// const decimals1 = 18;
// const address1 = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";

// async function main() {
//   const poolContract = new ethers.Contract(
//     poolAddress,
//     IUniswapV3PoolABI,
//     provider
//   );

//   const immutables = await getPoolImmutables(poolContract);
//   const state = await getPoolState(poolContract);

//   const wallet = new ethers.Wallet(WALLET_SECRET);
//   const connectedWallet = wallet.connect(provider);

//   const swapRouterContract = new ethers.Contract(
//     swapRouterAddress,
//     SwapRouterABI,
//     provider
//   );

//   const inputAmount = 0.01;
//   // .001 => 1 000 000 000 000 000
//   const amountIn = ethers.utils.parseUnits(inputAmount.toString(), decimals0);

//   const approvalAmount = (amountIn * 100000).toString();
//   const tokenContract0 = new ethers.Contract(address0, ERC20ABI, provider);
//   const approvalResponse = await tokenContract0
//     .connect(connectedWallet)
//     .approve(swapRouterAddress, approvalAmount);

//   const params = {
//     tokenIn: immutables.token1,
//     tokenOut: immutables.token0,
//     fee: immutables.fee,
//     recipient: WALLET_ADDRESS,
//     deadline: Math.floor(Date.now() / 1000) + 60 * 10,
//     amountIn: amountIn,
//     amountOutMinimum: 0,
//     sqrtPriceLimitX96: 0,
//   };

//   const transaction = swapRouterContract
//     .connect(connectedWallet)
//     .exactInputSingle(params, {
//       gasLimit: ethers.utils.hexlify(1000000),
//     })
//     .then((transaction) => {
//       console.log(transaction);
//     });
// }

// main();

// require("dotenv").config();
// const { Web3 } = require("web3");
// const {
//   Token,
//   WETH,
//   Fetcher,
//   Trade,
//   Route,
//   TokenAmount,
//   TradeType,
//   Percent,
//   Pair,
// } = require("@uniswap/sdk");
// const ABI = require("./abi.json");
// const { ethers } = require("ethers");
// const { AlphaRouter } = require("@uniswap/v3-sdk");

// const web3 = new Web3(process.env.INFURA_URL);
// // const provider = ethers.JsonRpcProvider()
// web3.eth
//   .getBlockNumber()
//   .then((blockNumber) => {
//     console.log(
//       "Connected to Polygon mainnet. Latest block number:",
//       blockNumber
//     );
//   })
//   .catch((error) => {
//     console.error("Error connecting to Polygon mainnet:", error);
//   });
// const wallet = web3.eth.accounts.wallet.create(); // Create a new wallet
// wallet.add(web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY)); // Add private key to the wallet
// // console.log(wallet);
// const MATIC = new Token(
//   137,
//   "0x0000000000000000000000000000000000001010",
//   18,
//   "MATIC",
//   "Matic Token"
// );
// const USDT = new Token(
//   137,
//   // "0xdAC17F958D2ee523a2206206994597C13D831ec7",
//   "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
//   6,
//   "USDT",
//   "Tether USD"
// );

// async function swapMaticForUsdt(amountIn) {
//   // const router = new AlphaRouter({
//   //   chainId: 137,
//   //   provider: new ethers.JsonRpcProvider(process.env.INFURA_URL),
//   // });
//   console.log("Starting swap");
//   const pairAddress = Pair.getAddress(MATIC, USDT);
//   console.log(pairAddress);
//   const pair = await Fetcher.fetchPairData(MATIC, USDT);
//   const route = new Route([pair], MATIC);

//   const trade = new Trade(
//     route,
//     new TokenAmount(MATIC, amountIn),
//     TradeType.EXACT_INPUT
//   );
//   // ("OTH");
//   // console.log();
//   const slippageTolerance = new Percent("50", "10000"); // 0.5%
//   const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
//   const path = [MATIC.address, USDT.address];
//   const to = wallet.address;
//   const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

//   const value = trade.inputAmount.raw;
//   console.log("FIRST");
//   const routerContract = new web3.eth.Contract(
//     [
//       {
//         name: "swapExactTokensForTokens",
//         type: "function",
//         inputs: [
//           { type: "uint256", name: "amountIn" },
//           { type: "uint256", name: "amountOutMin" },
//           { type: "address[]", name: "path" },
//           { type: "address", name: "to" },
//           { type: "uint256", name: "deadline" },
//         ],
//         outputs: [{ type: "uint256[]", name: "amounts" }],
//       },
//     ],
//     // ABI,

//     "0xE592427A0AEce92De3Edee1F18E0157C05861564" // Uniswap V3 Router address on Polygon
//   );
//   console.log("SECOND");
//   const tx = routerContract.methods.swapExactTokensForTokens(
//     amountIn,
//     amountOutMin,
//     path,
//     to,
//     deadline
//   );

//   const gas = await tx.estimateGas({ from: wallet.address });
//   const gasPrice = await web3.eth.getGasPrice();

//   const txData = {
//     from: wallet.address,
//     to: routerContract.options.address,
//     data: tx.encodeABI(),
//     gas,
//     gasPrice,
//   };

//   const receipt = await web3.eth.sendTransaction(txData);
//   console.log("Transaction receipt:", receipt);
// }

// // Convert 0.1 MATIC to wei (0.1 * 10^18)
// const amountIn = web3.utils.toWei("0.1", "ether");
// swapMaticForUsdt(amountIn);

// const { Web3 } = require("web3");
// const {
//   Token,
//   WETH,
//   Fetcher,
//   Trade,
//   Route,
//   TokenAmount,
//   TradeType,
//   Percent,
// } = require("@uniswap/sdk");
// const { ethers } = require("ethers");

// const web3 = new Web3(process.env.INFURA_URL);

// web3.eth
//   .getBlockNumber()
//   .then((blockNumber) => {
//     console.log(
//       "Connected to Polygon mainnet. Latest block number:",
//       blockNumber
//     );
//   })
//   .catch((error) => {
//     console.error("Error connecting to Polygon mainnet:", error);
//   });

// const wallet = web3.eth.accounts.wallet.create();
// wallet.add(web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY));
// // console.log(wallet);
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

// async function swapMaticForUsdt(amountIn) {
//   console.log("Starting swap");

//   // Ensure Uniswap Router contract has approval to spend MATIC tokens
//   const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
//   const erc20Abi = [
//     {
//       name: "approve",
//       type: "function",
//       inputs: [
//         { type: "address", name: "spender" },
//         { type: "uint256", name: "amount" },
//       ],
//       outputs: [{ type: "bool", name: "success" }],
//     },
//   ];
//   const maticContract = new web3.eth.Contract(erc20Abi, MATIC.address);
//   await maticContract.methods
//     .approve(routerAddress, amountIn)
//     .send({ from: wallet[0].address });

//   // Fetch pair data
//   const pair = await Fetcher.fetchPairData(MATIC, USDT);
//   const route = new Route([pair], MATIC);

//   const trade = new Trade(
//     route,
//     new TokenAmount(MATIC, amountIn),
//     TradeType.EXACT_INPUT
//   );
//   const slippageTolerance = new Percent("50", "10000"); // 0.5%
//   const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
//   const path = [MATIC.address, USDT.address];
//   const to = wallet.address;
//   const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

//   const value = trade.inputAmount.raw;

//   // Uniswap V3 Router contract ABI
//   const routerAbi = [
//     {
//       name: "swapExactTokensForTokens",
//       type: "function",
//       inputs: [
//         { type: "uint256", name: "amountIn" },
//         { type: "uint256", name: "amountOutMin" },
//         { type: "address[]", name: "path" },
//         { type: "address", name: "to" },
//         { type: "uint256", name: "deadline" },
//       ],
//       outputs: [{ type: "uint256[]", name: "amounts" }],
//     },
//   ];

//   const routerContract = new web3.eth.Contract(routerAbi, routerAddress);

//   const tx = routerContract.methods.swapExactTokensForTokens(
//     amountIn,
//     amountOutMin,
//     path,
//     to,
//     deadline
//   );

//   const gas = await tx.estimateGas({ from: wallet.address });
//   const gasPrice = await web3.eth.getGasPrice();

//   const txData = {
//     from: wallet.address,
//     to: routerContract.options.address,
//     data: tx.encodeABI(),
//     gas,
//     gasPrice,
//   };

//   const receipt = await web3.eth.sendTransaction(txData);
//   console.log("Transaction receipt:", receipt);
// }

// const amountIn = web3.utils.toWei("0.1", "ether");
// swapMaticForUsdt(amountIn);
require("dotenv").config();
const { ethers } = require("ethers");
const {
  Token,
  CurrencyAmount,
  TradeType,
  Percent,
} = require("@uniswap/sdk-core");
const { Pool, Route, Trade } = require("@uniswap/v3-sdk");
const { AlphaRouter } = require("@uniswap/v3-periphery");

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Ensure PRIVATE_KEY is set in your .env

const MATIC = new Token(
  137,
  "0x0000000000000000000000000000000000001010",
  18,
  "MATIC",
  "Matic Token"
);
const USDT = new Token(
  137,
  "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  6,
  "USDT",
  "Tether USD"
);

async function swapMaticForUsdt(amountIn) {
  const router = new AlphaRouter({ chainId: 137, provider });

  const maticAmountIn = CurrencyAmount.fromRawAmount(MATIC, amountIn);
  const route = await router.route(maticAmountIn, USDT, TradeType.EXACT_INPUT, {
    slippageTolerance: new Percent(50, 10000), // 0.5%
  });

  const transaction = await router.swapCallParameters(route, {
    recipient: wallet.address,
    slippageTolerance: new Percent(50, 10000),
    deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from now
  });

  const txResponse = await wallet.sendTransaction(transaction);
  const receipt = await txResponse.wait();
  console.log("Transaction receipt:", receipt);
}

// Convert 0.1 MATIC to wei using ethers utils
const amountIn = ethers.utils.parseUnits("0.1", "ether");
swapMaticForUsdt(amountIn);
