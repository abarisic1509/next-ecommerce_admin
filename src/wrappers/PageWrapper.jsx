import React from "react";

export default function PageWrapper({ children }) {
	return <div className="flex flex-col gap-3 bg-slate-700 p-4">{children}</div>;
}
