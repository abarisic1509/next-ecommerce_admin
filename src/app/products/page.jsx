import PageWrapper from "@/wrappers/PageWrapper";
import Link from "next/link";
import React from "react";
import { MdDelete, MdEditDocument } from "react-icons/md";

export default async function Products() {
	const res = await fetch(`${process.env.BASE_URL}/api/products`, {
		method: "GET",
		cache: "no-store",
	});
	const products = await res.json();

	return (
		<PageWrapper className="flex bg-slate-700 p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Products</h1>
				<Link
					href="/products/new"
					className="bg-slate-300 text-slate-800 hover:bg-slate-200 px-4 py-2 h-fit w-fit"
				>
					Add new product
				</Link>
			</div>

			<table className="border border-slate-300">
				<thead className="bg-slate-600 border-b border-slate-300">
					<tr>
						<th className="py-2 px-4 text-left border-r border-slate-300">
							Product name
						</th>
						<th className="py-2 px-4 text-center border-r border-slate-300">
							Product price
						</th>
						<th className="py-2 px-4 text-left border-r border-slate-300">
							Creator
						</th>
						<th className="py-2 px-4 text-left">Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.length &&
						products.map((product) => (
							<tr key={product._id}>
								<td className="py-2 px-4 border-b border-x border-slate-500">
									{product.name}
								</td>
								<td className="py-2 px-4 text-center border-b border-x border-slate-500">
									{product.price}
								</td>
								<td className="py-2 px-4 border-b border-x border-slate-500">
									{product.creator.email}
								</td>
								<td className="py-2 px-4 border-b border-x border-slate-500">
									<p className="flex gap-2">
										<Link
											href={`products/${product._id}`}
											className=" w-10 h-10 grid place-items-center text-2xl hover:bg-slate-600"
										>
											<MdEditDocument />
										</Link>
										<button className=" w-10 h-10 grid place-items-center text-2xl hover:bg-slate-600">
											<MdDelete />
										</button>
									</p>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</PageWrapper>
	);
}
