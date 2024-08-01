// Import necessary modules
import { createContext } from 'react';
import { WalletCore } from '@zbyteio/zbyte-wallet-sdk-core'; // Import WalletCore from the zbyte wallet SDK
import { PendingState } from '@/types'; // Import PendingState enum/type from your types

// Define the interface for the WalletContext
export interface IWalletContext {
	core: WalletCore | null; // WalletCore instance or null if not connected
	connected: PendingState; // Connection state of the wallet
}

// Create a context for the wallet with default values
export const WalletContext = createContext<IWalletContext>({
	core: null, // Default WalletCore value is null
	connected: PendingState.No // Default connection state is No (not connected)
});
