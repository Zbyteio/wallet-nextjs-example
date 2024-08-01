// Import necessary modules and assets
import Image from 'next/image'; // Import Image component from next/image for optimized image loading
import { useSession, signOut } from 'next-auth/react'; // Import useSession and signOut hooks from next-auth for session management
import zbyteLogo from '@/assets/images/logo-inline.svg'; // Import zByte logo image
import './style.scss'; // Import stylesheet

// Define the Nav component
export default function Nav() {
	const session = useSession(); // Use the useSession hook to get the current session state

	// Render the navigation bar
	return (
		<nav className="nav">
			{/* Link to zbyte.io with the zByte logo */}
			<a href="https://zbyte.io">
				<Image className="logo" src={zbyteLogo} alt="zByte logo"/>
			</a>

			{/* Navigation links */}
			<ul className="links">
				{/* GitHub link */}
				<li><a className="link bold" href="https://github.com/Zbyteio/wallet-nextjs-example">GitHub</a></li>
				{/* Logout button if the user is authenticated */}
				{session.status === 'authenticated' && (
					<li><button className="link bold" onClick={() => signOut()}>Logout</button></li>
				)}
			</ul>
		</nav>
	);
}