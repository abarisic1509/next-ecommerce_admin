import {
	LoginButton,
	LoginGoogleButton,
	LogoutButton,
} from "@/components/buttons";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
	const session = await getServerSession(authOptions);
	console.log(session);

	if (!session) {
		return (
			<main className="min-h-screen bg-blue-800 flex flex-col items-center justify-center gap-3">
				<LoginButton />
			</main>
		);
	}
	return (
		<main className="min-h-screen bg-blue-800 grid place-items-center">
			Logged in successfully
			<LogoutButton />
		</main>
	);
}
