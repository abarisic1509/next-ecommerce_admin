"use client";

import Modal from "@/components/Modal";
import ProductForm from "@/components/ProductForm";
import PageWrapper from "@/wrappers/PageWrapper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function EditProduct({ params: { id } }) {
	const router = useRouter();
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [submittingDelete, setSubmittingDelete] = useState(false);

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

	const handleModalOpen = (id) => {
		setIsModalOpen(true);
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleProductDelete = async (id) => {
		setSubmittingDelete(true);
		try {
			const response = await fetch(`/api/products?_id=${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});

			if (response.ok) {
				handleModalClose();
				router.push("/products");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmittingDelete(false);
		}
	};

	//console.log(product);

	return (
		<PageWrapper>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Edit {product.name}</h1>
				<button
					onClick={() => {
						handleModalOpen(id);
					}}
					className="bg-red-400 text-slate-800 hover:bg-red-500 px-4 py-2 h-fit w-fit flex items-center gap-2"
				>
					<MdDelete />
					<span>Delete product</span>
				</button>
			</div>

			{loading || !Object.keys(product).length ? (
				<p>Loading...</p>
			) : (
				<ProductForm
					type="editProduct"
					product={product}
					handleFormSubmit={editProduct}
				/>
			)}

			{isModalOpen && (
				<Modal
					handleConfirm={handleProductDelete}
					productId={id}
					handleClose={handleModalClose}
					submitting={submittingDelete}
				/>
			)}
		</PageWrapper>
	);
}
