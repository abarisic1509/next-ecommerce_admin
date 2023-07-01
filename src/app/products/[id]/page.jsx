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
	const [featuredImgUrl, setFeaturedImgUrl] = useState("");
	const [imagesUrls, setImagesUrls] = useState([]);
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

			setProduct({
				name: productData[0].name,
				shortDesc: productData[0].shortDesc,
				longDesc: productData[0].longDesc,
				price: productData[0].price,
				featuredImg: "",
				images: [],
			});
			setFeaturedImgUrl(productData[0].featuredImg);
			setImagesUrls(productData[0].images);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const editProduct = async (values, setSubmitting) => {
		setSubmitting(true);

		if (values.featuredImg) {
			const imgId = getPublicIdFromUrl(featuredImgUrl);
			await deleteImageFromCloud(featuredImgUrl, imgId);
			const featuredImgUrlNew = await uploadImageToCloudinary(
				values.featuredImg.file
			);

			setFeaturedImgUrl(featuredImgUrlNew);
		}

		if (values.images) {
			const imagesUrlsNew = await Promise.all(
				values.images.map(async (image) => {
					const imageUrl = await uploadImageToCloudinary(image);
					return imageUrl;
				})
			);

			setImagesUrls((prev) => [...prev, ...imagesUrlsNew]);
		}

		try {
			const response = await fetch("/api/products", {
				method: "PUT",
				body: JSON.stringify({
					name: values.name,
					shortDesc: values.shortDesc,
					longDesc: values.longDesc,
					price: values.price,
					featuredImg: featuredImgUrl,
					images: imagesUrls,
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
	const getPublicIdFromUrl = (url) => {
		const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
		const match = url.match(regex);
		return match ? match[1] : null;
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

	const deleteImageFromCloud = async (imageUrl, publicId) => {
		try {
			const cloudinaryDeleteUrl = `https://api.cloudinary.com/v1_1/duipztnnd/delete_by_token/${publicId}`;
			const response = await fetch(cloudinaryDeleteUrl, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					imageUrl,
				}),
			});

			if (response.ok) {
				// Image successfully deleted from Cloudinary
				console.log("Image deleted from Cloudinary");
			} else {
				// Error occurred while deleting the image
				console.log("Error deleting image from Cloudinary");
			}
		} catch (error) {
			console.log(error);
		}
	};

	console.log(product);

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
					featuredImgUrl={featuredImgUrl}
					setFeaturedImgUrl={setFeaturedImgUrl}
					imagesUrls={imagesUrls}
					setImagesUrls={setImagesUrls}
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
