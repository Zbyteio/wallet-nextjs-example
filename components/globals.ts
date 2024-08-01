// globals.ts
import { CHAIN_ID_MATIC_MAINNET, CHAIN_ID_HBAR_MAINNET, CHAIN_ID_AVAX_MAINNET } from '@zbyteio/zbyte-common'; // Import chain ID for Matic Mainnet

// Functions to get and set the global chain ID
export const getChainId = () => localStorage.getItem("chain");
export const setChainId = (chainId: string) => {
    if (chainId == "polygon")
        localStorage.setItem("chain", CHAIN_ID_MATIC_MAINNET.toString());

    if (chainId == "avalanche")
        localStorage.setItem("chain", CHAIN_ID_AVAX_MAINNET.toString());

    if (chainId == "hedera")
        localStorage.setItem("chain", CHAIN_ID_HBAR_MAINNET.toString());
};