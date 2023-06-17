import Link from "next/link";
import {
	MdInsertChartOutlined,
	MdSpaceDashboard,
	MdSupervisorAccount,
	MdAssignment,
	MdSettings,
	MdShoppingCart,
} from "react-icons/md";
import ActiveNavLink from "./ActiveNavLink";

const links = [
	{
		id: "products",
		icon: "MdShoppingCart",
	},
	{
		id: "orders",
		icon: "MdAssignment",
	},
	{
		id: "users",
		icon: "MdSupervisorAccount",
	},
	{
		id: "web",
		icon: "MdSpaceDashboard",
	},
	{
		id: "settings",
		icon: "MdSettings",
	},
];

export default function Navigation() {
	function getIcon(iconId) {
		switch (iconId) {
			case "MdShoppingCart":
				return <MdShoppingCart size={32} />;
			case "MdAssignment":
				return <MdAssignment size={32} />;
			case "MdSupervisorAccount":
				return <MdSupervisorAccount size={32} />;
			case "MdSpaceDashboard":
				return <MdSpaceDashboard size={32} />;
			case "MdSettings":
				return <MdSettings size={32} />;
			default:
				return null;
		}
	}

	return (
		<nav>
			<ul className="flex flex-col border-x border-x-slate-400 bg-slate-700">
				<li className="border-y border-y-slate-400">
					<ActiveNavLink href="/">
						<MdInsertChartOutlined size={32} />
						Dashboard
					</ActiveNavLink>
				</li>
				{links.map((link) => (
					<li key={link.id} className="border-y border-y-slate-400">
						<ActiveNavLink href={`/${link.id}`}>
							{getIcon(link.icon)}
							{link.id}
						</ActiveNavLink>
					</li>
				))}
			</ul>
		</nav>
	);
}
