import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** Social preview size recommended by Open Graph and LinkedIn. */
export const ogSize = { width: 1200, height: 630 };

/** Reads an image from public/ as a data URL that next/og can embed. */
export async function publicImage(publicPath: string) {
	const data = await readFile(join(process.cwd(), "public", publicPath));
	const type = publicPath.endsWith(".png") ? "image/png" : "image/jpeg";
	return `data:${type};base64,${data.toString("base64")}`;
}

type OgCardProps = {
	eyebrow: string;
	title: string;
	subtitle: string;
	/** Full-bleed background, as a data URL. */
	background: string;
	/** Optional cut-out art layered on the right, as a data URL. */
	foreground?: string;
};

/**
 * The shared layout for every social preview: full-bleed art darkened toward
 * the left, the site name, and a large title in the site's style.
 */
export function ogCard({ eyebrow, title, subtitle, background, foreground }: OgCardProps) {
	return new ImageResponse(
		(
			<div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "#080b0f", position: "relative" }}>
				{/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain img elements */}
				<img src={background} width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} alt="" />
				{foreground && (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={foreground} height={630} style={{ position: "absolute", right: 0, bottom: 0, height: 630, objectFit: "contain" }} alt="" />
				)}
				{/* next/og doesn't support `inset`, so the overlay is sized explicitly */}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: 1200,
						height: 630,
						display: "flex",
						backgroundImage: "linear-gradient(90deg, rgba(8,11,15,0.92) 0%, rgba(8,11,15,0.75) 40%, rgba(8,11,15,0.15) 75%, rgba(8,11,15,0) 100%)",
					}}
				/>

				<div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
					<div style={{ display: "flex", fontSize: 26, letterSpacing: 10, color: "white", fontWeight: 700 }}>MONOLITH</div>

					<div style={{ display: "flex", flexDirection: "column" }}>
						<div style={{ display: "flex", alignItems: "center", gap: 20, color: "#fbbf24", fontSize: 24, letterSpacing: 8, textTransform: "uppercase" }}>
							<div style={{ width: 56, height: 2, backgroundColor: "#fbbf24" }} />
							{eyebrow}
						</div>
						<div style={{ display: "flex", marginTop: 20, fontSize: title.length > 12 ? 96 : 128, fontWeight: 700, color: "white", textTransform: "uppercase", lineHeight: 0.9, letterSpacing: -4, maxWidth: 760 }}>
							{title}
						</div>
						<div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "rgba(255,255,255,0.65)", maxWidth: 700 }}>
							{subtitle}
						</div>
					</div>
				</div>
			</div>
		),
		ogSize,
	);
}
