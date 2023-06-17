import { LoginButton } from "@/components/buttons";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Dashboars() {
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
	return <div>Dashboard</div>;
}
