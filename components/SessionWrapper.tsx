'use client'; //Indicates that this module is a client-side component

// Import necessary modules
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

// Define the SessionWrapper component, which wraps its children with the SessionProvider
export default function SessionWrapper({ children }: { children: ReactNode }) {
	return (
		//Render the children elements passed to this component
		<SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
	);
}
