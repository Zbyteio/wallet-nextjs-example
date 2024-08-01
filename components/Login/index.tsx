// Import necessary modules and assets
import { signIn } from 'next-auth/react'; // Import signIn from next-auth for authentication
import Image from 'next/image'; // Import Image component from next/image for optimized image loading
import logo from '@/assets/images/logo.svg'; // Import zByte logo image
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import './style.scss'; // Import stylesheet
import { useState } from 'react'; // Import useState for state management
import { setChainId } from '@/components/globals'; // Import global variable functions

// Define the Login component
export default function Login() {
  const router = useRouter(); // Initialize useRouter for navigation
  const [localChainId, setLocalChainId] = useState(''); // State to store selected chain ID

  // Function to handle authentication redirection
  const authRedirect = async (idp?: string) => {
    try {
      const params: any = {}; // Initialize parameters object
      if (idp) params.kc_idp_hint = idp; // Add identity provider hint if provided
      const response = await signIn('keycloak', {}, params); // Attempt to sign in using Keycloak
      if (!response || response.error) router.push('/'); // Redirect to home if there's an error
	  setChainId(localChainId);
    } catch (e) {
      console.log('Exception in login', e); // Log any exceptions
    }
  };

  // Function to handle chain ID selection
  const handleChainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalChainId(event.target.value); // Update state with selected chain ID
  };

  // Render the login page
  return (
    <main className="login-container">
      <Image src={logo} alt="zByte logo" /> {/* Display the zByte logo */}
      <p className="description">
        zbyte wallet simplifies your wallet creation and login.
      </p>

      {/* Dropdown for selecting Chain ID */}
      <select
        id="chainId"
        className="chain-dropdown"
        value={localChainId}
        onChange={handleChainChange}
      >
        <option value="" disabled>Select a chain</option>
        <option value="polygon">Polygon</option>
        <option value="hedera">Hedera</option>
        <option value="avalanche">Avalanche</option>
      </select>

      {/* Buttons to login with Google or Microsoft */}
      <button
        className="button"
        onClick={() => authRedirect('google')}
        disabled={!localChainId} // Disable button if no chain is selected
      >
        Login with Google
      </button>
      <button
        className="button"
        onClick={() => authRedirect('microsoft')}
        disabled={!localChainId} // Disable button if no chain is selected
      >
        Login with Microsoft
      </button>
    </main>
  );
}