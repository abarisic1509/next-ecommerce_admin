import { connectToDb } from "@/lib/mongodb";
import Product from "@/models/product";

export const POST = async (req) => {
	const { name, shortDesc, longDesc, price, creatorId } = await req.json();

	try {
		await connectToDb();

		const newProduct = new Product({
			name,
			shortDesc,
			longDesc,
			price,
			creator: creatorId,
		});

		await newProduct.save();

		return new Response(JSON.stringify(newProduct), { status: 201 });
	} catch (error) {
		console.log(error);
	}
};
