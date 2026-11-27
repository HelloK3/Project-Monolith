"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
	const query = window.matchMedia(reducedMotionQuery);
	query.addEventListener("change", onChange);
	return () => query.removeEventListener("change", onChange);
}

/** True when the visitor has asked their OS to minimise motion. */
export function usePrefersReducedMotion() {
	return useSyncExternalStore(
		subscribe,
		() => window.matchMedia(reducedMotionQuery).matches,
		// The server can't know, so render the default and correct on the client.
		() => false,
	);
}

type AmbientVideoProps = {
	src: string;
	className?: string;
	/**
	 * Decorative background clips stay paused (showing their first frame) for
	 * reduced-motion visitors. Content clips show player controls instead, so
	 * the visitor can still choose to play them.
	 */
	decorative?: boolean;
	preload?: "auto" | "metadata" | "none";
};

/**
 * A muted, looping video that autoplays, unless the visitor prefers reduced
 * motion, in which case it starts paused.
 */
export default function AmbientVideo({
	src,
	className,
	decorative = true,
	preload = "metadata",
}: AmbientVideoProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const reduceMotion = usePrefersReducedMotion();

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		if (reduceMotion) {
			video.pause();
		} else {
			// play() rejects if the browser blocks autoplay; the first frame still shows.
			video.play().catch(() => {});
		}
	}, [reduceMotion, src]);

	return (
		<video
			ref={videoRef}
			src={src}
			className={className}
			autoPlay={!reduceMotion}
			controls={reduceMotion && !decorative}
			muted
			loop
			playsInline
			preload={preload}
			aria-hidden={decorative ? true : undefined}
		/>
	);
}
