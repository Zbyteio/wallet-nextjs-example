// Import necessary hooks and libraries
import { useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Import ethers for handling Ethereum-related functions
import { PendingState } from '@/types'; // Import PendingState enum/type from your types
import { WalletContext } from '@/contexts/Wallet'; // Import WalletContext for accessing wallet state
import './style.scss'; // Import stylesheet

// Default export function named WalletInfo
export default function WalletInfo() {
    // Use the useContext hook to get the current wallet context
    const wallet = useContext(WalletContext);

    // State to store the wallet address
    const [address, setAddress] = useState<string>('');
    // State to store the DPLAT token balance, initialized to -1 (indicating loading)
    const [dplatBalance, setDplatBalance] = useState<number>(-1);
    // State to store the pending state of the wallet connection
    const [pending, setPending] = useState<PendingState>(PendingState.No);

    // useEffect to fetch and set the wallet address when the wallet is connected
    useEffect(() => {
        (async () => {
            if (!wallet.core || wallet.connected !== PendingState.Yes) return;
            // Set the address state to the address fetched from the wallet
            setAddress(await wallet.core.getAddress());
        })();
    }, [wallet]); // Dependency array ensures this effect runs when the wallet state changes

    // useEffect to fetch and set the DPLAT token balance when the wallet is connected
    useEffect(() => {
        (async () => {
            if (!wallet.core || wallet.connected !== PendingState.Yes) return;
            // Fetch the DPLAT token balance from the wallet
            const dplat = await wallet.core.getTokenBalance();
            // Convert the balance from Wei to Ether and set the dplatBalance state
            setDplatBalance(parseFloat(ethers.formatEther(dplat ?? '0')));
        })();
    }, [wallet]); // Dependency array ensures this effect runs when the wallet state changes

    // Render the wallet information
    return (
        <div className="wallet-info">
            {/* Display the wallet address or a loading message */}
            <p className="address">Address: {address ? address : 'Loading...'}</p>
            {/* Display the DPLAT token balance or a loading message */}
            <p>DPLAT: {dplatBalance === -1 ? 'Loading...' : dplatBalance.toFixed(2)}</p>
        </div>
    );
};