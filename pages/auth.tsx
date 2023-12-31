import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Input } from "@/components";

function Auth() {
	const router = useRouter();
	const [variant, setVariant] = useState("login");

	const nameInputRef = useRef<HTMLInputElement | null>(null);
	const emailInputRef = useRef<HTMLInputElement | null>(null);
	const passwordInputRef = useRef<HTMLInputElement | null>(null);

	const variantToggle = useCallback(() => {
		setVariant((currentVariant) =>
			currentVariant === "login" ? "register" : "login"
		);
	}, []);

	const login = useCallback(async () => {
		try {
			await signIn("credentials", {
				email: emailInputRef.current?.value,
				password: passwordInputRef.current?.value,
				redirect: false,
				callbackUrl: "/",
			});
			router.push("/profiles");
		} catch (error) {
			console.log(error);
		}
	}, [router]);

	const register = useCallback(async () => {
		try {
			const body = {
				name: nameInputRef.current?.value,
				email: emailInputRef.current?.value,
				password: passwordInputRef.current?.value,
			};
			await axios.post("/api/register", body);
			login();
		} catch (error) {
			console.log(error);
		}
	}, [login]);

	return (
		<div
			className={`
        relative
        h-full
        w-full
        bg-[url('/images/hero.jpg')]
        bg-no-repeat
        bg-center
        bg-fixed
        bg-cover
      `}
		>
			<div className='bg-black w-full h-full lg:bg-opacity-50'>
				<nav className='px-12 py-5'>
					<Image
						src='/images/logo.png'
						width={144}
						height={48}
						alt='Logo'
						className='h-12'
					/>
				</nav>
				<div className='flex justify-center'>
					<div
						className='
              bg-black
              bg-opacity-70
              px-16
              py-16
              self-center
              mt-2
              w-full
              rounded-md
              lg:w-2/5
              lg:max-w-md
            '
					>
						<h2 className='text-white text-4xl mb-8 font-semibold'>
							{variant === "login" ? "Sign in" : "Register"}
						</h2>
						<div className='flex flex-col gap-4'>
							{variant === "register" && (
								<Input
									id='name'
									type='text'
									label='Username'
									ref={nameInputRef}
								/>
							)}
							<Input
								id='email'
								type='email'
								label='Email address or phone number'
								ref={emailInputRef}
							/>
							<Input
								id='password'
								type='password'
								label='Password'
								ref={passwordInputRef}
							/>
						</div>
						<button
							onClick={variant === "login" ? login : register}
							className='
                bg-red-600
                py-3
                text-white
                rounded-md
                w-full
                mt-10
                transition
                hover:bg-red-700
              '
						>
							{variant === "login" ? "Login" : "Sign up"}
						</button>
						<div className='flex flex-row items-center gap-4 mt-8 justify-center'>
							<div
								onClick={() => signIn("google", { callbackUrl: "/" })}
								className='
									w-10
									h-10
									bg-white
									rounded-full
									flex
									items-center
									justify-center
									cursor-pointer
									hover:opacity-80
									transition
								'
							>
								<FcGoogle size={32} />
							</div>
							<div
								onClick={() => signIn("github", { callbackUrl: "/" })}
								className='
									w-10
									h-10
									bg-white
									rounded-full
									flex
									items-center
									justify-center
									cursor-pointer
									hover:opacity-80
									transition'
							>
								<FaGithub size={32} />
							</div>
						</div>
						<p className='text-neutral-500 mt-12'>
							{variant === "login"
								? "First time using Netflix?"
								: "Already have an account? "}
							<span
								onClick={variantToggle}
								className='text-white ml-1 hover:underline cursor-pointer'
							>
								{variant === "login" ? "Create an account" : "Login"}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Auth;
