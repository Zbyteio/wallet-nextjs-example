'use client';

import { useSession} from 'next-auth/react';
import Login from '@/components/Login';
import Nav from '@/components/Nav';
import Main from '@/components/Main';

declare global {
	var apiBaseUrl: string;
}

export default function Page() {
	const { data: session } = useSession();
	globalThis.apiBaseUrl = 'https://dplat.zbyte.io';

	if (!session) return <Login/>;

	return (
		<>
			<Nav/>
			<Main/>
		</>
	);
}
