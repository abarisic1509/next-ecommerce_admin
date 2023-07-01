"use client";
import { productSchema } from "@/schemas/productSchema";
import { Formik } from "formik";
import ImageUpload from "./ImageUpload";

export default function ProductForm({
	type,
	product,
	handleFormSubmit,
	featuredImgUrl,
	imagesUrls,
	setFeaturedImgUrl,
	setImagesUrls,
}) {
	//console.log(product);
	return (
		<Formik
			initialValues={product}
			validationSchema={productSchema}
			onSubmit={(values, { setSubmitting }) =>
				handleFormSubmit(values, setSubmitting)
			}
		>
			{({
				errors,
				touched,
				values,
				handleSubmit,
				handleChange,
				isSubmitting,
			}) => (
				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
					<div className="flex flex-col md:flex-row gap-3">
						<label htmlFor="name" className="flex flex-col gap-2 w-full">
							<span>Product name</span>

							<input
								type="text"
								name="name"
								id="name"
								value={values.name}
								onChange={handleChange}
								className="bg-transparent outline-none border border-slate-300 py-2 px-3"
							/>
							{errors.name && touched.name && (
								<p className=" text-red-600">{errors.name}</p>
							)}
						</label>
						<label htmlFor="price" className="flex flex-col gap-2 w-full">
							<span>Product Price (in €)</span>

							<input
								type="number"
								name="price"
								id="price"
								value={values.price}
								onChange={handleChange}
								className="bg-transparent outline-none border border-slate-300 py-2 px-3 appearance-none"
							/>
							{errors.price && touched.price && (
								<p className=" text-red-600">{errors.price}</p>
							)}
						</label>
					</div>
					<label htmlFor="shortDesc" className="flex flex-col gap-2">
						<span>Short description</span>

						<input
							type="text"
							name="shortDesc"
							id="shortDesc"
							value={values.shortDesc}
							onChange={handleChange}
							className="bg-transparent outline-none border border-slate-300 py-2 px-3 w-full"
						/>
						{errors.shortDesc && touched.shortDesc && (
							<p className=" text-red-600">{errors.shortDesc}</p>
						)}
					</label>
					<label htmlFor="longDesc" className="flex flex-col gap-2">
						<span>Long description</span>

						<textarea
							type="text"
							name="longDesc"
							id="longDesc"
							rows={10}
							value={values.longDesc}
							onChange={handleChange}
							className="bg-transparent outline-none border border-slate-300 py-2 px-3 w-full"
						/>
						{errors.longDesc && touched.longDesc && (
							<p className=" text-red-600">{errors.longDesc}</p>
						)}
					</label>
					{/* <label htmlFor="featuredImg" className="flex flex-col gap-2">
						<span>Featured image</span>

						<input
							type="file"
							name="featuredImg"
							id="featuredImg"
							rows={10}
							value={values.featuredImg}
							onChange={handleChange}
							className="bg-transparent outline-none border border-slate-300 py-2 px-3 w-full"
						/>
						{errors.featuredImg && touched.featuredImg && (
							<p className=" text-red-600">{errors.featuredImg}</p>
						)}
					</label> */}

					<ImageUpload
						name="featuredImg"
						id="featuredImg"
						type="single"
						value={values.featuredImg}
						errors={errors.featuredImg}
						touched={touched.featuredImg}
						product={product}
						featuredImgUrl={featuredImgUrl}
						imagesUrls={imagesUrls}
						setFeaturedImgUrl={setFeaturedImgUrl}
						setImagesUrls={setImagesUrls}
					/>
					<ImageUpload
						name="images"
						id="images"
						type="multiple"
						value={values.images}
						errors={errors.images}
						touched={touched.images}
						product={product}
						featuredImgUrl={featuredImgUrl}
						imagesUrls={imagesUrls}
						setFeaturedImgUrl={setFeaturedImgUrl}
						setImagesUrls={setImagesUrls}
					/>

					<div className="flex justify-between">
						<button
							type="submit"
							disabled={isSubmitting}
							className="bg-slate-300 text-slate-800 hover:bg-slate-200 px-4 py-2 h-fit w-fit disabled:opacity-50 disabled:pointer-events-none"
						>
							{type === "addProduct" ? "Create new product" : "Save changes"}
						</button>
					</div>
				</form>
			)}
		</Formik>
	);
}
