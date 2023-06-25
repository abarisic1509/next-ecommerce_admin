"use client";
import { useState } from "react";
import ProductForm from "@/components/ProductForm";
import PageWrapper from "@/wrappers/PageWrapper";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/session";

export default function NewProduct() {
	const router = useRouter();
	const session = getSession();
	const [product, setProduct] = useState({
		name: "",
		shortDesc: "",
		longDesc: "",
		price: 0,
		featuredImg: "",
		images: [],
	});

	//console.log(session);

	const createProduct = async (values, setSubmitting) => {
		setSubmitting(true);

		console.log(values);

		// try {
		// 	const response = await fetch("/api/products", {
		// 		method: "POST",
		// 		body: JSON.stringify({
		// 			name: values.name,
		// 			shortDesc: values.shortDesc,
		// 			longDesc: values.longDesc,
		// 			price: values.price,
		// 			creatorId: session?.user.id,
		// 		}),
		// 	});

		// 	if (response.ok) {
		// 		router.push("/products");
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// } finally {
		// 	setSubmitting(false);
		// }
	};

	return (
		<PageWrapper>
			<h1 className="text-2xl font-bold mb-4">New Product</h1>

			<ProductForm
				type="addProduct"
				product={product}
				handleFormSubmit={createProduct}
			/>
		</PageWrapper>
	);
}
