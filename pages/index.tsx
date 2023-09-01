import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

import useCurrentUser from "@/hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default function Home() {
	const { data: user } = useCurrentUser();
	console.log("Index: ", user?.name);
	return (
		<>
			<h1 className='text-green-600'>Netflix Clone</h1>
			{/* <p>Logged in as : {user}</p> */}
			<button
				className='bg-white'
				onClick={() => signOut()}
			>
				Logout!
			</button>
		</>
	);
}
