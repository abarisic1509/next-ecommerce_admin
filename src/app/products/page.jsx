import PageWrapper from "@/wrappers/PageWrapper";
import Link from "next/link";
import React from "react";

export default function Products() {
	return (
		<PageWrapper className="flex bg-slate-700 p-4">
			<Link
				href="/products/new"
				className="bg-slate-300 text-slate-800 hover:bg-slate-200 px-4 py-2 h-fit w-fit"
			>
				Add new product
			</Link>
		</PageWrapper>
	);
}
