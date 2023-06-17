import Link from "next/link";

const links = [
	{
		id: "products",
	},
	{
		id: "orders",
	},
	{
		id: "users",
	},
	{
		id: "web",
	},
	{
		id: "settings",
	},
];

export default function Navigation() {
	return (
		<nav>
			<ul>
				<li>
					<Link href="/" className=" font-medium ">
						Dashboard
					</Link>
				</li>
				{links.map((link) => (
					<li key={link.id}>
						<Link href={`/${link.id}`} className=" font-medium ">
							{link.id}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
