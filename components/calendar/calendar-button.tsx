import { cn } from "@/lib/utils";
import { type AriaButtonProps, useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import type { CalendarState } from "@react-stately/calendar";
import { useRef } from "react";

export function Button(
	props: AriaButtonProps<"button"> & {
		state?: CalendarState;
		side?: "left" | "right";
	},
) {
	const ref = useRef<HTMLButtonElement>(null);
	const { buttonProps } = useButton(props, ref);
	const { focusProps, isFocusVisible } = useFocusRing();
	return (
		<button
			{...mergeProps(buttonProps, focusProps)}
			ref={ref}
			className={cn(
				"p-2 rounded-lg outline-none text-gray-12",
				props.isDisabled ? "text-gray-7" : "hover:bg-gray-4 active:bg-gray-5",
				isFocusVisible && "ring-2 ring-offset-2 ring-gray-9",
			)}
		>
			{props.children}
		</button>
	);
}
