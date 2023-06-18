import { connectToDb } from "@/lib/mongodb";
import Product from "@/models/product";

export async function GET(req) {
	try {
		await connectToDb();

		const products = await Product.find({}).populate("creator");

		const body = JSON.stringify(products);
		const headers = { "Content-Type": "application/json" };

		return new Response(body, { status: 200, headers });
	} catch (err) {
		console.log(err);
		return new Response("Failed to fetch products", { status: 500 });
	}
}
