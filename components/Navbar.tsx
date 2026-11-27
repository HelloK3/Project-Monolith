"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/heroes", label: "Heroes" },
	{ href: "/cards", label: "Cards" },
];

export default function Navbar() {
	const [scrollDirection, setScrollDirection] = useState("top");
	const [menuOpen, setMenuOpen] = useState(false);
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const pathname = usePathname();

	// "/" only matches the home page itself; other links also match their
	// sub-pages, so "Heroes" stays highlighted on /heroes/rampage.
	const isActive = (href: string) =>
		href === "/" ? pathname === "/" : pathname.startsWith(href);

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

	// Escape closes the mobile menu and puts focus back on its button.
	useEffect(() => {
		if (!menuOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMenuOpen(false);
				menuButtonRef.current?.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [menuOpen]);

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
					{navLinks.map((link) => (
						<NavLink
							key={link.href}
							href={link.href}
							isActive={isActive(link.href)}
						>
							{link.label}
						</NavLink>
					))}
				</div>

				{/* Mobile Menu Button */}
				<button
					ref={menuButtonRef}
					type="button"
					aria-label={menuOpen ? "Close menu" : "Open menu"}
					aria-expanded={menuOpen}
					aria-controls="mobile-menu"
					onClick={() => setMenuOpen(!menuOpen)}
					className="-mr-2 flex flex-col gap-1.5 p-2 focus-visible:outline focus-visible:outline-1 focus-visible:outline-amber-400 md:hidden"
				>
					<span className="block h-px w-6 bg-white" />
					<span className="block h-px w-6 bg-white" />
					<span className="block h-px w-6 bg-white" />
				</button>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div
					id="mobile-menu"
					className="border-t border-white/10 bg-black/95 px-6 py-6 backdrop-blur-md md:hidden"
				>
					<div className="flex flex-col gap-5">
						{navLinks.map((link) => (
							<MobileNavLink
								key={link.href}
								href={link.href}
								isActive={isActive(link.href)}
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</MobileNavLink>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}

function NavLink({
	href,
	isActive,
	children,
}: {
	href: string;
	isActive: boolean;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			aria-current={isActive ? "page" : undefined}
			className={`text-sm uppercase tracking-wider transition-colors hover:text-amber-400 ${
				isActive ? "text-amber-400" : "text-white/70"
			}`}
		>
			{children}
		</Link>
	);
}

function MobileNavLink({
	href,
	isActive,
	onClick,
	children,
}: {
	href: string;
	isActive: boolean;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			onClick={onClick}
			aria-current={isActive ? "page" : undefined}
			className={`text-sm uppercase tracking-wider transition-colors hover:text-amber-400 ${
				isActive ? "text-amber-400" : "text-white/80"
			}`}
		>
			{children}
		</Link>
	);
}
