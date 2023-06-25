import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "./mongodb";
import Admin from "@/models/users";

export const authOptions = {
	//adapter: MongoDBAdapter(clientPromise),
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		// CredentialsProvider({
		// 	name: "Email",
		// 	credentials: {
		// 		email: {
		// 			label: "Email",
		// 			type: "email",
		// 			placeholder: "example@example.com",
		// 		},
		// 		password: { label: "Password", type: "password" },
		// 	},
		// 	async authorize(credentials) {
		// 		const user = { id: "1", name: "Admin", email: "admin@admin.com" };
		// 		return user;
		// 	},
		// }),
	],
	callbacks: {
		async session({ session }) {
			console.log(session);
			const sessionUser = await Admin.findOne({
				email: session.user.email,
			});

			session.user.id = sessionUser._id.toString();
			return session;
		},

		async signIn({ profile }) {
			try {
				await connectToDb();

				//check if user exists
				const adminExists = await Admin.findOne({
					email: profile.email,
				});

				//if not, create a new user
				if (!adminExists) {
					//create new admin
					await Admin.create({
						email: profile.email,
						image: profile.picture,
					});
				}

				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
};
