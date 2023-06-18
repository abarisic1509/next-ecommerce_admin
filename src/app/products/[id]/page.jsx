"use client";

import ProductForm from "@/components/ProductForm";
import PageWrapper from "@/wrappers/PageWrapper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditProduct({ params: { id } }) {
	const router = useRouter();
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchProduct(id);
	}, []);

	const fetchProduct = async (id) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/products?productId=${id}`);
			const data = await res.json();
			const productData = data.filter((product) => product._id === id);

			setProduct(productData[0]);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const editProduct = async (values, setSubmitting) => {
		setSubmitting(true);

		try {
			const response = await fetch("/api/products", {
				method: "PUT",
				body: JSON.stringify({
					name: values.name,
					shortDesc: values.shortDesc,
					longDesc: values.longDesc,
					price: values.price,
					_id: id,
				}),
			});

			if (response.ok) {
				router.push("/products");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	//console.log(product);

	return (
		<PageWrapper>
			<h1 className="text-2xl font-bold mb-4">Edit Product</h1>

			{loading || !Object.keys(product).length ? (
				<p>Loading...</p>
			) : (
				<ProductForm
					type="editProduct"
					product={product}
					handleFormSubmit={editProduct}
				/>
			)}
		</PageWrapper>
	);
}
