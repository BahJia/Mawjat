import { connect, Contract, keyStores, WalletConnection } from "near-api-js";

import getConfig from "./config";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer; // https://github.com/isaacs/core-util-is/issues/27#issuecomment-878969583

const nearConfig = getConfig("development");

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  window.near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig
    )
  );

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(window.near);

  window.accountId = window.walletConnection.getAccountId();

  window.mawjat_nft_marketplace = await new Contract(
    window.walletConnection.account(),
    "nft_mawjat.testnet",
    {
      viewMethods: ["get_music_nft"],
      changeMethods: ["mint_music_nft", "mint_fraction", "redeem_rewards",],
    }
  );
}
export function logout() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

export async function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName);
}

export function accountId() {
  return {
    accountId: window.accountId,
  };
}

export async function mint_music_nft(token_id, metadata, total_fractions) {
  return window.mawjat_nft_marketplace.mint_music_nft({
    token_id,
    metadata,
    total_fractions,
  });
}

export async function mint_fraction(music_nft_id, fraction_id, percentage) {
  return window.mawjat_nft_marketplace.mint_fraction({
    music_nft_id,
    fraction_id,
    percentage,
  });
}

export async function redeem_rewards(music_nft_id) {
  return window.mawjat_nft_marketplace.redeem_rewards({
    music_nft_id,
  });
}

export function get_music_nft(token_id) {
  return window.mawjat_nft_marketplace.get_music_nft({ token_id });
}
