import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateScale({
	name,
	isOverlay = false,
}: { name: string; isOverlay?: boolean }) {
	const scale = Array.from({ length: 12 }, (_, i) => {
		const id = i + 1;
		if (isOverlay) {
			return [[`a${id}`, `var(--${name}-a${id})`]];
		}
		return [
			[id, `var(--${name}-${id})`],
			[`a${id}`, `var(--${name}-a${id})`],
		];
	}).flat();

	return Object.fromEntries(scale);
}
