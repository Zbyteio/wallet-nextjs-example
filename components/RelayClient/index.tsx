// Import necessary modules and components
import { useContext, useState } from 'react';
import { CHAIN_ID_MATIC_MAINNET, CHAIN_ID_HBAR_MAINNET, CHAIN_ID_AVAX_MAINNET } from '@zbyteio/zbyte-common'; // Import chain ID for Matic Mainnet
import { PendingState } from '@/types'; // Import PendingState enum/type from your types
import { WalletContext } from '@/contexts/Wallet'; // Import WalletContext for accessing wallet state
import Spinner from '@/components/Spinner'; // Import Spinner component for loading state
import relay from './relay'; // Import relay function
import './style.scss'; // Import stylesheet
import {
	abi,
	bytecode,
	functionSignature,
	exampleContractAddressPolygon,
	exampleContractAddressAvalanche,
	exampleContractAddressHedera,
	exampleWalletAddress,
	exampleURI
} from './constants'; // Import constants
import { ethers } from 'ethers'; // Import ethers for handling Ethereum-related functions
import { getChainId } from '@/components/globals'; // Import global variable functions

// Define the RelayButtons component
export default function RelayButtons() {
	const wallet = useContext(WalletContext); // Use the WalletContext to get the current wallet state
	const [loading, setLoading] = useState({ // State to manage loading states for different operations
		deploy: false,
		invoke: false,
		convert: false
	});
	const [operationResult, setOperationResult] = useState<any>(null); // State to store the result of operations

	const chain = parseInt(getChainId() || ""); //Set chain ID

	// Function to deploy a contract
	const deployContract = async () => {
		if (!wallet.core || wallet.connected !== PendingState.Yes) { // Check if the wallet is connected
			console.error('Wallet not connected or core is missing');
			return;
		}

		try {
			setLoading(prev => ({ ...prev, deploy: true })); // Set loading state for deploy operation
			setOperationResult(null); // Clear previous operation result
			const result = await relay(wallet.core).deployContract(bytecode, abi, [], chain); // Deploy contract
			console.log('Deploy Contract Result:', result);
			setOperationResult(result); // Set operation result state
		} catch (error) {
			console.error('Error deploying contract:', error);
		} finally {
			setLoading(prev => ({ ...prev, deploy: false })); // Reset loading state for deploy operation
		}
	};


	// Function to invoke a contract
	const invokeContract = async () => {
		if (!wallet.core || wallet.connected !== PendingState.Yes) { // Check if the wallet is connected
			console.error('Wallet not connected or core is missing');
			return;
		}

		try {
			setLoading(prev => ({ ...prev, invoke: true })); // Set loading state for invoke operation
			setOperationResult(null); // Clear previous operation result

			const chainId = getChainId();
			const contractAddress = {
				[CHAIN_ID_MATIC_MAINNET]: exampleContractAddressPolygon,
				[CHAIN_ID_AVAX_MAINNET]: exampleContractAddressAvalanche,
				[CHAIN_ID_HBAR_MAINNET]: exampleContractAddressHedera,
			}[chainId as string];

			if (!contractAddress) throw new Error(`Unable find contract for chain "${chainId}".`);

			const result = await relay(wallet.core).invokeContract(functionSignature, contractAddress, abi, [exampleWalletAddress, exampleURI], chain); // Invoke contract
			console.log('Invoke Contract Result:', result);
			setOperationResult(result); // Set operation result state
		} catch (error) {
			console.error('Error invoking contract:', error);
		} finally {
			setLoading(prev => ({ ...prev, invoke: false })); // Reset loading state for invoke operation
		}
	};

	// Function to convert DPLAT to vZBYTE
	const convertVZbyte = async (amount: string) => {
		if (!wallet.core || wallet.connected !== PendingState.Yes) { // Check if the wallet is connected
			console.error('Wallet not connected or core is missing');
			return;
		}

		try {
			setLoading(prev => ({ ...prev, convert: true })); // Set loading state for convert operation
			setOperationResult(null); // Clear previous operation result
			const DPLAT = ethers.parseEther(amount).toString(); // Convert amount to DPLAT in Wei
			const result = await relay(wallet.core).depositDplat(DPLAT, chain); // Convert DPLAT to vZBYTE
			console.log('Convert to vZBYTE Result:', result);
			setOperationResult(result); // Set operation result state
		} catch (error) {
			console.error('Error converting to vZBYTE:', error);
		} finally {
			setLoading(prev => ({ ...prev, convert: false })); // Reset loading state for convert operation
		}
	};

	// Render the buttons and operation result
	return (
		<div className="relay-client">
			{/* Button to deploy a contract */}
			<button className="button" onClick={deployContract} disabled={loading.deploy}>
				{loading.deploy ? 'Deploying...' : 'Deploy'}
			</button>
			{/* Button to invoke a contract */}
			<button className="button" onClick={invokeContract} disabled={loading.invoke}>
				{loading.invoke ? 'Invoking...' : 'Invoke'}
			</button>
			{/* Button to convert 1 DPLAT to vZBYTE */}
			<button className="button" onClick={() => convertVZbyte("1")} disabled={loading.convert}>
				{loading.convert ? 'Converting...' : 'Convert 1 DPLAT to VZBYTE'}
			</button>
			{/* Display the operation result */}
			{operationResult && (
				<div>
					<h3>Operation Result:</h3>
					<pre>{JSON.stringify(operationResult, null, 2)}</pre>
				</div>
			)}
			{/* Display the spinner if any operation is loading */}
			{Object.values(loading).some(b => !!b) && (
				<div className="loader">
					<Spinner/>
				</div>
			)}
		</div>
	);
}
