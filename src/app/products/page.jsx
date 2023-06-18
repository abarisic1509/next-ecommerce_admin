import PageWrapper from "@/wrappers/PageWrapper";
import Link from "next/link";
import React from "react";

export default async function Products() {
	const res = await fetch(`${process.env.BASE_URL}/api/products`, {
		method: "GET",
	});
	const products = await res.json();

	console.log(products);

	return (
		<PageWrapper className="flex bg-slate-700 p-4">
			<div className="flex justify-between items-center">
				<h1>Products</h1>
				<Link
					href="/products/new"
					className="bg-slate-300 text-slate-800 hover:bg-slate-200 px-4 py-2 h-fit w-fit"
				>
					Add new product
				</Link>
			</div>

			<table>
				<thead>
					<tr>
						<th>Product name</th>
						<th>Product price</th>
						<th>Creator</th>
					</tr>
				</thead>
				<tbody>
					{products.length &&
						products.map((product) => (
							<tr key={product._id}>
								<td>{product.name}</td>
								<td>{product.price}</td>
								<td>{product.creator.email}</td>
							</tr>
						))}
				</tbody>
			</table>
		</PageWrapper>
	);
}
