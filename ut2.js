const { ethers } = require("ethers");
const {
  abi: IUniswapV3PoolABI,
} = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const {
  abi: SwapRouterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");
const { getPoolImmutables, getPoolState } = require("./helper");
const ERC20ABI = require("./abi.json");

require("dotenv").config();
const INFURA_URL = process.env.INFURA_URL;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const WALLET_SECRET = process.env.PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(INFURA_URL); // Ropsten
const poolAddress = "0x4D7C363DED4B3b4e1F954494d2Bc3955e49699cC"; // UNI/WETH
const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

const name0 = "Matic Token";
const symbol0 = "MATIC";
const decimals0 = 18;
const address0 = "0x0000000000000000000000000000000000001010";

const name1 = "Tether USD";
const symbol1 = "USDT";
const decimals1 = 6;
const address1 = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

async function main() {
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    provider
  );

  const immutables = await getPoolImmutables(poolContract);
  const state = await getPoolState(poolContract);

  const wallet = new ethers.Wallet(WALLET_SECRET);
  const connectedWallet = wallet.connect(provider);

  const swapRouterContract = new ethers.Contract(
    swapRouterAddress,
    SwapRouterABI,
    provider
  );

  const inputAmount = 0.001;
  const amountIn = ethers.utils.parseUnits(inputAmount.toString(), decimals0);

  const approvalAmount = (amountIn * 100000).toString();
  const tokenContract0 = new ethers.Contract(address0, ERC20ABI, provider);
  const approvalResponse = await tokenContract0
    .connect(connectedWallet)
    .approve(swapRouterAddress, approvalAmount);

  const params = {
    tokenIn: immutables.token1,
    tokenOut: immutables.token0,
    fee: immutables.fee,
    recipient: WALLET_ADDRESS,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10,
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  };

  const transaction = swapRouterContract
    .connect(connectedWallet)
    .exactInputSingle(params, {
      gasLimit: ethers.utils.hexlify(1000000),
    })
    .then((transaction) => {
      console.log(transaction);
    });
}

main();
