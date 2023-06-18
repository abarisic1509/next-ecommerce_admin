"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ActiveNavLink({ href, children }) {
	const pathname = usePathname();
	let isActive = false;

	if (pathname === "/" && href === "/") {
		isActive = true;
	} else if (href !== "/" && pathname.startsWith(href)) {
		isActive = true;
	}
	return (
		<Link
			href={href}
			className={`text-xs uppercase font-medium flex flex-col gap-2 px-2 py-3 text-center items-center hover:bg-slate-800 ${
				isActive ? "bg-slate-900 pointer-events-none" : ""
			}`}
		>
			{children}
		</Link>
	);
}
