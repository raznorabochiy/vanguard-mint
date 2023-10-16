import cli from "cli";
import { JsonRpcProvider, Wallet } from "ethers";
import random from "lodash/random";
import fetch from "node-fetch";
import {
  DELAY_FROM_SEC,
  DELAY_TO_SEC,
  KEYS_FILENAME,
  RPC_URL,
} from "./constants";
import { delayProgress, loadKeys } from "./utils";

const provider = new JsonRpcProvider(RPC_URL);
const keys = await loadKeys(KEYS_FILENAME);

async function mint(key: string, tokenIndex: number) {
  const wallet = new Wallet(key, provider);
  const signature = await wallet.signMessage("Xai Testnet Drop");

  cli.spinner(`Start mint nft number ${tokenIndex}`);

  try {
    const response = await fetch(
      "https://util.expopulus.com/vanguard-nft-drop/remote-mint",
      {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "ru-RU,ru;q=0.5",
          "content-type": "application/json",
          "sec-ch-ua":
            '"Not/A)Brand";v="99", "Brave";v="115", "Chromium";v="115"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "sec-gpc": "1",
        },
        "referrer": "https://xai.games/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{"signature":"${signature}","tokenIndex":${tokenIndex}}`,
        "method": "POST",
      },
    );

    const results = await response.json();

    if (results["transactionHash"]) {
      const transactionHash = results["transactionHash"];
      cli.spinner(
        `https://testnet-explorer.xai-chain.net/tx/${transactionHash}`,
        true,
      );
    } else if (
      results["error"] === "This address has already minted the requested nft today."
    ) {
      cli.spinner(results["error"], true);
    } else if (results["error"].includes("Failed to mint NFT")) {
      cli.spinner("Mint error, retry", true);
      return mint(key, tokenIndex);
    }
  } catch (_) {
    cli.spinner("Mint error, retry", true);
    return mint(key, tokenIndex);
  }
}

for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const count = i + 1;
  const { length } = keys;
  const last = i === keys.length - 1;
  const { address } = new Wallet(key);

  console.log(`${count}/${length} address: ${address}`);

  for (let tokenIndex = 1; tokenIndex <= 42; tokenIndex++) {
    await mint(key, tokenIndex);
    const delayTimeout = random(DELAY_FROM_SEC, DELAY_TO_SEC);
    await delayProgress(delayTimeout);
  }

  if (!last) {
    const delayTimeout = random(DELAY_FROM_SEC, DELAY_TO_SEC);
    await delayProgress(delayTimeout);
  }
}
