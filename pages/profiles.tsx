import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

const images = [
	"/images/default-blue.png",
	"/images/default-red.png",
	"/images/default-slate.png",
	"/images/default-green.png",
];

interface UserCardProps {
	name: string;
}

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

const UserCard: React.FC<UserCardProps> = ({ name }) => {
	const imgSrc = images[Math.floor(Math.random() * 4)];

	return (
		<div className='group flex-row w-44 mx-auto'>
			<div
				className='
					w-44
					h-44
					rounded-md
					flex
					items-center
					justify-center
					border-2
					border-transparent
					group-hover:cursor-pointer
					group-hover:border-white
					overflow-hidden'
			>
				<Image
					draggable={false}
					className='w-max h-max object-contain'
					alt=''
					src={imgSrc}
					width={100}
					height={100}
				/>
			</div>
			<div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
				{name}
			</div>
		</div>
	);
};

function App() {
	const router = useRouter();
	const { data: currentUser } = useCurrentUser();

	const selectProfile = useCallback(() => {
		router.push("/");
	}, [router]);

	return (
		<div className='flex items-center h-full justify-center'>
			<div className='flex flex-col'>
				<h1 className='text-3xl md:text-6xl text-white text-center'>
					Who&#39;s watching?
				</h1>
				<div className='flex items-center justify-center gap-8 mt-10'>
					<div onClick={() => selectProfile()}>
						<UserCard name={currentUser?.name} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
