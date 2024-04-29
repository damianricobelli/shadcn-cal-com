import {
	type DateDuration,
	endOfMonth,
	getWeeksInMonth,
} from "@internationalized/date";
import { useCalendarGrid } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import type { CalendarState } from "@react-stately/calendar";
import { CalendarCell } from "./calendar-cell";

export function CalendarGrid({
	state,
	offset = {},
}: {
	state: CalendarState;
	offset?: DateDuration;
}) {
	const { locale } = useLocale();
	const startDate = state.visibleRange.start.add(offset);
	const endDate = endOfMonth(startDate);
	const { gridProps, headerProps, weekDays } = useCalendarGrid(
		{
			startDate,
			endDate,
			weekdayStyle: "short",
		},
		state,
	);

	// Get the number of weeks in the month so we can render the proper number of rows.
	const weeksInMonth = getWeeksInMonth(startDate, locale);

	return (
		<table {...gridProps} cellPadding="0" className="flex-1">
			<thead {...headerProps}>
				<tr>
					{weekDays.map((day, index) => (
						<th key={index} className="uppercase text-xs text-gray-11 pb-4">
							{day}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{[...new Array(weeksInMonth).keys()].map((weekIndex) => (
					<tr key={weekIndex}>
						{state.getDatesInWeek(weekIndex, startDate).map((date, index) => {
							if (!date) {
								return <td key={index} />;
							}

							return (
								<CalendarCell
									key={index}
									state={state}
									date={date}
									currentMonth={startDate}
								/>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}
