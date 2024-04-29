import type { AriaButtonProps } from "@react-aria/button";
import { useDateFormatter } from "@react-aria/i18n";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import type { CalendarState } from "@react-stately/calendar";
import type { DOMAttributes, FocusableElement } from "@react-types/shared";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./calendar-button";

export function CalendarHeader({
	state,
	calendarProps,
	prevButtonProps,
	nextButtonProps,
}: {
	state: CalendarState;
	calendarProps: DOMAttributes<FocusableElement>;
	prevButtonProps: AriaButtonProps<"button">;
	nextButtonProps: AriaButtonProps<"button">;
}) {
	const monthDateFormatter = useDateFormatter({
		month: "long",
		year: "numeric",
		timeZone: state.timeZone,
	});

	const [monthName, _, year] = monthDateFormatter
		.formatToParts(state.visibleRange.start.toDate(state.timeZone))
		.map((part) => part.value);

	return (
		<div className="flex items-center pb-4">
			<VisuallyHidden>
				<h2>{calendarProps["aria-label"]}</h2>
			</VisuallyHidden>
			{/* biome-ignore lint/a11y/useHeadingContent: <explanation> */}
			<h2
				aria-hidden
				className="flex-1 align-center font-bold text-md text-gray-12"
			>
				{monthName} <span className="text-gray-11">{year}</span>
			</h2>
			<Button {...prevButtonProps}>
				<ChevronLeftIcon className="size-4" />
			</Button>
			<Button {...nextButtonProps}>
				<ChevronRightIcon className="size-4" />
			</Button>
		</div>
	);
}
