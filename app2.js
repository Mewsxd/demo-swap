require("dotenv").config();
const { ethers } = require("ethers");
const { AlphaRouter } = require("@uniswap/smart-order-router");
const {
  ChainId,
  Percent,
  TradeType,
  Token,
  CurrencyAmount,
} = require("@uniswap/sdk-core");

// Infura URL and private key from .env file
const INFURA_URL = process.env.INFURA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Provider and Wallet setup
const provider = new ethers.JsonRpcProvider(INFURA_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Uniswap V3 router address on Polygon
const UNISWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

// MATIC and USDT token addresses on Polygon
const MATIC_ADDRESS = "0x0000000000000000000000000000000000001010"; // Native MATIC
const USDT_ADDRESS = "0x3813e82e6f7098b9583FC0F33a962D02018B6803";

// Token details
const MATIC = new CoreToken(ChainId.POLYGON, MATIC_ADDRESS, 18, "MATIC");
const USDT = new CoreToken(ChainId.POLYGON, USDT_ADDRESS, 6, "USDT");

async function swapMaticForUsdt(amountIn) {
  // Setup Uniswap Router
  const router = new AlphaRouter({ chainId: ChainId.POLYGON, provider });

  // Create the trade
  const amountInCurrency = CurrencyAmount.fromRawAmount(
    MATIC,
    ethers.utils.parseUnits(amountIn.toString(), 18)
  );
  const route = await router.route(
    amountInCurrency,
    USDT,
    TradeType.EXACT_INPUT,
    {
      recipient: wallet.address,
      slippageTolerance: new Percent(50, 10000), // 0.5%
      deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current time
    }
  );

  // Execute the trade
  const transaction = {
    to: UNISWAP_ROUTER_ADDRESS,
    value: ethers.utils.parseUnits(amountIn.toString(), 18),
    data: route.methodParameters.calldata,
    gasLimit: ethers.utils.hexlify(1000000), // Adjust gas limit as necessary
  };

  const signedTx = await wallet.signTransaction(transaction);
  const txResponse = await provider.sendTransaction(signedTx);

  console.log("Transaction Hash:", txResponse.hash);
  const receipt = await txResponse.wait();
  console.log("Transaction was mined in block:", receipt.blockNumber);
}

// Swap 1 MATIC for USDT
swapMaticForUsdt(1).catch(console.error);
