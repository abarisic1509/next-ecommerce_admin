import { LogoutButton } from "./buttons";

export default function Header() {
	return (
		<header className="bg-slate-700">
			<div className=" max-w-screen-xl mx-auto xl:max-w-screen-2xl py-4 px-6 lg:px-10 xl:px-20 flex items-center justify-between">
				<p className=" font-bold text-slate-100 text-xl md:text-2xl">
					Ecommerce-Admin
				</p>
				<LogoutButton />
			</div>
		</header>
	);
}
