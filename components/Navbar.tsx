"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
	const [scrollDirection, setScrollDirection] = useState("top");
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY <= 20) {
				setScrollDirection("top");
			} else if (currentScrollY > lastScrollY) {
				setScrollDirection("down");
			} else if (currentScrollY < lastScrollY) {
				setScrollDirection("up");
			}

			lastScrollY = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const navbarStyle =
		scrollDirection === "top"
			? "bg-black/70 border-white/10 backdrop-blur-md"
			: scrollDirection === "up"
				? "bg-black/85 border-white/10 backdrop-blur-md"
				: "bg-black/35 border-white/5 backdrop-blur-sm";

	return (
		<nav
			className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-300 ${navbarStyle}`}
		>
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
				{/* Logo */}
				<Link
					href="/"
					className="text-xl font-bold tracking-[0.3em] text-white transition-colors hover:text-amber-400"
				>
					MONOLITH
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden items-center gap-8 md:flex">
					<NavLink href="/">Home</NavLink>
					<NavLink href="/heroes">Heroes</NavLink>
					<NavLink href="/items">Items</NavLink>
					<NavLink href="/cards">Cards</NavLink>
					<NavLink href="/builds">Builds</NavLink>
				</div>

				{/* Desktop Search */}
				<button
					type="button"
					className="hidden text-sm uppercase tracking-wider text-white/70 transition-colors hover:text-amber-400 md:block"
				>
					Search
				</button>

				{/* Mobile Menu Button */}
				<button
					type="button"
					aria-label="Toggle menu"
					aria-expanded={menuOpen}
					onClick={() => setMenuOpen(!menuOpen)}
					className="flex flex-col gap-1.5 md:hidden"
				>
					<span className="block h-px w-6 bg-white" />
					<span className="block h-px w-6 bg-white" />
					<span className="block h-px w-6 bg-white" />
				</button>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="border-t border-white/10 bg-black/95 px-6 py-6 backdrop-blur-md md:hidden">
					<div className="flex flex-col gap-5">
						<MobileNavLink href="/" onClick={() => setMenuOpen(false)}>
							Home
						</MobileNavLink>

						<MobileNavLink href="/heroes" onClick={() => setMenuOpen(false)}>
							Heroes
						</MobileNavLink>

						<MobileNavLink href="/items" onClick={() => setMenuOpen(false)}>
							Items
						</MobileNavLink>

						<MobileNavLink href="/cards" onClick={() => setMenuOpen(false)}>
							Cards
						</MobileNavLink>

						<MobileNavLink href="/builds" onClick={() => setMenuOpen(false)}>
							Builds
						</MobileNavLink>

						<button
							type="button"
							className="text-left text-sm uppercase tracking-wider text-white/70 transition-colors hover:text-amber-400"
						>
							Search
						</button>
					</div>
				</div>
			)}
		</nav>
	);
}

function NavLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="text-sm uppercase tracking-wider text-white/70 transition-colors hover:text-amber-400"
		>
			{children}
		</Link>
	);
}

function MobileNavLink({
	href,
	onClick,
	children,
}: {
	href: string;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className="text-sm uppercase tracking-wider text-white/80 transition-colors hover:text-amber-400"
		>
			{children}
		</Link>
	);
}
