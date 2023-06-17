import { LoginButton } from "@/components/buttons";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Header from "./Header";
import Navigation from "./Navigation";

export default async function MainLayout({ children }) {
	const session = await getServerSession(authOptions);
	console.log(session);

	if (!session) {
		return (
			<main className="min-h-screen bg-slate-800 flex flex-col items-center justify-center gap-3">
				<h1>AWESOME ADMIN DASHBOARD</h1>
				<p>Sign in to continue</p>
				<LoginButton />
			</main>
		);
	}
	return (
		<div
			className="min-h-screen bg-slate-800 grid"
			style={{ gridTemplateRows: "auto 1fr" }}
		>
			<Header />
			<main
				className="grid w-full max-w-screen-xl xl:max-w-screen-2xl mx-auto py-10 px-6 lg:px-10 xl:px-20 gap-6"
				style={{ gridTemplateColumns: "auto 1fr" }}
			>
				<Navigation />

				{children}
			</main>
		</div>
	);
}
