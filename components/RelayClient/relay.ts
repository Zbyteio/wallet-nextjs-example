// Import the RelayClient class from the zbyte-relay-client package
import { RelayClient } from "@zbyteio/zbyte-relay-client";

// Define the RelayOptions interface to specify the shape of the options object
interface RelayOptions {
    relayBaseUrl?: string;  // Optional URL for the relay base
    nativeChainId?: number; // Optional native chain ID
    pollWait: number;       // Time to wait between polls in milliseconds
    pollTimeOut: number;    // Timeout for polling in milliseconds
}

// Default export function named Relay
export default function Relay(
    walletCore: any, // The walletCore object, any type
    relayOptions: RelayOptions = {
        pollWait: 5000,        // Default poll wait time of 5000 milliseconds (5 seconds)
        pollTimeOut: 300000    // Default poll timeout of 300000 milliseconds (5 minutes)
    }
) {
    // Default relay options with a base URL
    const DEFAULT_RELAY_OPTIONS = { relayBaseURL: 'https://dplat.zbyte.io/relay/v1' };
    
    // Merge default options with user-provided options
    const options = { ...DEFAULT_RELAY_OPTIONS, ...relayOptions };
    
    // Ensure nativeChainId is set to 80002 for Testnet or 137 for Mainnet
    options.nativeChainId ||= 137;
    
    // Return a new instance of RelayClient with the configured options and walletCore
    return new RelayClient(options, walletCore);
};
