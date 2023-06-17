"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
	return (
		<button
			className=" bg-slate-200 py-2 px-4 rounded-lg text-lg text-slate-900 hover:bg-slate-300"
			onClick={() => signIn()}
		>
			Sign in
		</button>
	);
};
export const LoginGoogleButton = () => {
	return (
		<button
			className=" bg-slate-200 py-2 px-4 rounded-lg text-lg text-slate-900 hover:bg-slate-300"
			onClick={() => signIn("google")}
		>
			Sign in with Google
		</button>
	);
};

export const LogoutButton = () => {
	return (
		<button
			className=" bg-slate-200 py-2 px-4 rounded-lg text-lg text-slate-900 hover:bg-slate-300"
			style={{ marginRight: 10 }}
			onClick={() => signOut()}
		>
			Sign Out
		</button>
	);
};
