// Import necessary modules and hooks
import { ReactNode, useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { getBlockchainNetwork } from '@zbyteio/zbyte-common';
import { WalletCore, Web3AuthProvider, TORUS_NETWORK_TYPE } from '@zbyteio/zbyte-wallet-sdk-core';
import { PendingState } from '@/types';
import { WalletContext } from '@/contexts/Wallet';
import { getChainId } from '@/components/globals'; // Import global variable functions

// Declare a global variable for WalletCore
declare global {
	var walletCore: WalletCore;
}

const chain = parseInt(getChainId() || ""); //Set chain ID

// Connecting to WalletCore using Web3Auth requires a unique access token for every connection.
// An ancestor component must ensure the user is authenticated and that the access token in session is unique.
// This can be done via session.update('keycloak:refresh') endpoint.
export default function Wallet({ children }: { children: ReactNode }) {
	const session = useSession(); // Use the session hook to get session data

	// State to store WalletCore instance
	const [core, setCore] = useState<WalletCore | null>(null);
	// State to store the connection status
	const [connected, setConnected] = useState<PendingState>(PendingState.No);

	// useEffect to handle the connection process when the session changes
	useEffect(() => {
		(async () => {
			// Function to connect using the session's access token
			const connectFromSession = async () => {
				await session.update('keycloak:refresh'); // Refresh the session

				if (!session.data?.access_token) {
					return [new Error('No access token found on session.'), null];
				}

				// Connect using the global walletCore and access token
				return connect(globalThis.walletCore, session.data.access_token);
			};

			// Ensure only one instance of WalletCore during React strict mode
			const walletExists = !!globalThis.walletCore;
			globalThis.walletCore ||= createWallet(); // Create WalletCore if it doesn't exist
			setCore(globalThis.walletCore); // Set the WalletCore state

			if (!walletExists && session.data?.access_token) {
				const [error, connected] = await connectFromSession(); // Attempt to connect

				if (error) {
					console.warn(error); // Log any errors
					return signOut(); // Sign out if there is an error
				}

				setConnected(connected ? PendingState.Yes : PendingState.No); // Update connection status
			}
		})();
	}, [session]); // Dependency array ensures this effect runs when the session changes

	// Provide the WalletCore and connection status to the context
	return <WalletContext.Provider value={{ core, connected }}>{children}</WalletContext.Provider>;
}

// Function to create a new WalletCore instance
function createWallet() {
	const provider = new Web3AuthProvider({
		networkType: process.env.WEB3_AUTH_NETWORK_TYPE as TORUS_NETWORK_TYPE, // Network type for Web3Auth
		web3AuthClientId: process.env.WEB3_AUTH_CLIENT_ID as string, // Client ID for Web3Auth
		enableLogging: (process.env.WEB3_ENABLE_LOGGING as string) === "true", // Enable logging based on environment variable
		verifierName: process.env.WEB3_VERIFIER as string, // Verifier name for Web3Auth
		clientId: process.env.WEB3_CLIENT_ID as string, // Client ID for the application
		domain: process.env.WEB3_DOMAIN as string, // Domain for the application
	});

	const network = getBlockchainNetwork(chain); // Get the blockchain network configuration

	return new WalletCore(provider, network); // Return a new WalletCore instance
}

// Function to connect WalletCore using an access token
async function connect(walletCore: WalletCore, accessToken: string) {
	walletCore.injectAuthVerifier({
		tokenExpiry: Number(process.env.WEB3_TOKEN_EXPIRY || ''), // Token expiry time from environment variable
		typeOfToken: process.env.WEB3_TYPE_OF_TOKEN, // Type of token from environment variable
		accessToken // Access token
	});

	try {
		await walletCore.connect(); // Attempt to connect WalletCore
	} catch(e) {
		return [e]; // Return error if connection fails
	}

	return [null, walletCore.isConnected()]; // Return success and connection status
}