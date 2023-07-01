import { connectToDb } from "@/lib/mongodb";
import Product from "@/models/product";

//get all products
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

//create new product
export const POST = async (req) => {
	const { name, shortDesc, longDesc, price, featuredImg, images, creatorId } =
		await req.json();

	try {
		await connectToDb();

		const newProduct = new Product({
			name,
			shortDesc,
			longDesc,
			price,
			featuredImg,
			images,
			creator: creatorId,
		});

		await newProduct.save();

		return new Response(JSON.stringify(newProduct), { status: 201 });
	} catch (error) {
		console.log(error);
		return new Response("Failed to create new product", { status: 500 });
	}
};

//update new product
export const PUT = async (req) => {
	const { name, shortDesc, longDesc, price, featuredImg, images, _id } =
		await req.json();

	try {
		await connectToDb();
		const updatedProductObj = {
			name,
			shortDesc,
			longDesc,
			price,
			featuredImg,
			images,
		};
		await Product.updateOne({ _id }, updatedProductObj);

		return new Response(JSON.stringify(updatedProductObj), { status: 201 });
	} catch (error) {
		console.log(error);
		return new Response("Failed to update product", { status: 500 });
	}
};

//delete product
export const DELETE = async (req) => {
	console.log(req.url);
	//const { _id } = await req.json();
	const { searchParams } = new URL(req.url);
	const _id = searchParams.get("_id") || "";

	try {
		await connectToDb();
		await Product.deleteOne({ _id });

		return new Response(
			JSON.stringify(`Product with the id of ${_id} deleted successfully`),
			{ status: 201 }
		);
	} catch (error) {
		console.log(error);
		return new Response("Failed to delete product", { status: 500 });
	}
};
