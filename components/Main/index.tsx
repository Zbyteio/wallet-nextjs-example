// Import necessary modules and components
import dynamic from 'next/dynamic'; // Import dynamic for dynamic imports
import { useSession } from 'next-auth/react'; // Import useSession from next-auth for session management
import WalletInfo from '@/components/WalletInfo'; // Import WalletInfo component
import RelayButtons from '../RelayClient'; // Import RelayButtons component
import './style.scss'; // Import stylesheet
import { getChainId } from '@/components/globals'; // Import global variable functions

// Dynamically import the Wallet component, disabling server-side rendering (ssr)
const Wallet = dynamic(() => import('@/components/Wallet'), { ssr: false });

// Define the Home component
export default function Home() {
	const session = useSession(); // Use the useSession hook to get the current session state
	const id = getChainId();

	// Render the main content
	return (
		<main className="main">
			<h1 className="bold">zbyte wallet sdk example using Next.js</h1>
			{/* Display user info if authenticated */}
			{session.status === 'authenticated' && (
				<p>Signed in as {session.data.user?.name} {session.data.user?.email}.</p>
			)}

			<h2>zbyte wallet info:</h2>

			{/* Render Wallet component and its children if authenticated */}
			<Wallet>
				<WalletInfo/>
				<RelayButtons/>
			</Wallet>
		</main>
	);
}