"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

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
	/** Still frame shown until the video has loaded. */
	poster?: string;
	className?: string;
	/**
	 * Decorative background clips stay paused (showing their poster or first
	 * frame) for reduced-motion visitors. Content clips show player controls
	 * instead, so the visitor can still choose to play them.
	 */
	decorative?: boolean;
	/**
	 * Wait until the video is near the viewport before downloading it. Leave
	 * off for videos that are visible as soon as the page loads.
	 */
	lazy?: boolean;
	preload?: "auto" | "metadata" | "none";
};

/**
 * A muted, looping video that autoplays, unless the visitor prefers reduced
 * motion, in which case it starts paused. With `lazy`, nothing is downloaded
 * until the video scrolls within 300px of the screen.
 */
export default function AmbientVideo({
	src,
	poster,
	className,
	decorative = true,
	lazy = false,
	preload = "metadata",
}: AmbientVideoProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const reduceMotion = usePrefersReducedMotion();
	const [nearViewport, setNearViewport] = useState(!lazy);

	// Lazy videos get their source only once they come close to the screen.
	useEffect(() => {
		const video = videoRef.current;
		if (!lazy || nearViewport || !video) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					setNearViewport(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "300px" },
		);

		observer.observe(video);
		return () => observer.disconnect();
	}, [lazy, nearViewport]);

	useEffect(() => {
		const video = videoRef.current;
		if (!video || !nearViewport) return;

		if (reduceMotion) {
			video.pause();
		} else {
			// play() rejects if the browser blocks autoplay; the poster still shows.
			video.play().catch(() => {});
		}
	}, [reduceMotion, src, nearViewport]);

	return (
		<video
			ref={videoRef}
			src={nearViewport ? src : undefined}
			poster={poster}
			className={className}
			autoPlay={nearViewport && !reduceMotion}
			controls={reduceMotion && !decorative}
			muted
			loop
			playsInline
			preload={nearViewport ? preload : "none"}
			aria-hidden={decorative ? true : undefined}
		>
			{/* The clips are silent; the caption track says so for anyone who turns captions on. */}
			{!decorative && (
				<track kind="captions" src="/videos/no-audio.vtt" srcLang="en" label="English" />
			)}
		</video>
	);
}
