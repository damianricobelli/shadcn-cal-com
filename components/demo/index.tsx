"use client";

import {
	type CalendarDate,
	getLocalTimeZone,
	getWeeksInMonth,
	today,
} from "@internationalized/date";
import type { DateValue } from "@react-aria/calendar";
import { CalendarIcon, Clock4 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { Calendar } from "../calendar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { availableTimes } from "./available-times";
import { timeZones } from "./time-zones";

export function Demo() {
	const router = useRouter();

	const searchParams = useSearchParams();
	const dateParam = searchParams.get("date");
	const slotParam = searchParams.get("slot");

	const [timeZone, setTimeZone] = React.useState("America/New_York");
	const [date, setDate] = React.useState(
		today(getLocalTimeZone()).add({ days: 1 }),
	);
	const [focusedDate, setFocusedDate] = React.useState<CalendarDate | null>(
		date,
	);

	const [dayNumber, dayName] = date
		.toDate(timeZone)
		.toLocaleDateString("en-US", {
			weekday: "short",
			day: "numeric",
		})
		.split(" ");

	const weeksInMonth = getWeeksInMonth(focusedDate as DateValue, "en-US");

	const handleChangeDate = (date: DateValue) => {
		setDate(date as CalendarDate);
		const url = new URL(window.location.href);
		url.searchParams.set(
			"date",
			date.toDate(timeZone).toISOString().split("T")[0],
		);
		router.push(url.toString());
	};

	const handleChangeAvailableTime = (time: string) => {
		const timeString = time.split(":").join("").replace(/\D/g, "");
		const currentDate = date.toDate(timeZone);
		currentDate.setHours(Number.parseInt(timeString.slice(2, 4)));

		const url = new URL(window.location.href);
		url.searchParams.set("slot", currentDate.toISOString());
		router.push(url.toString());
	};

	const showForm = dateParam && slotParam;

	return (
		<div className="w-full bg-gray-1 px-8 py-6 rounded-md max-w-max mx-auto">
			<div className="flex gap-6">
				<div className="flex flex-col gap-4 w-[280px] border-r pr-6">
					<div className="grid gap-1">
						<Tooltip>
							<TooltipTrigger asChild>
								<img
									alt="Shadcn Cal"
									src="/avatar.jpeg"
									className="rounded-full border"
									width={24}
									height={24}
								/>
							</TooltipTrigger>
							<TooltipContent>Shadcn Cal</TooltipContent>
						</Tooltip>
						<p className="text-gray-11 text-sm font-semibold">Shadcn Cal</p>
					</div>
					<div className="grid gap-3">
						<p className="text-gray-12 text-2xl font-bold">Demo</p>
						{showForm && (
							<div className="flex items-center text-gray-12">
								<CalendarIcon className="size-4 mr-2" />
								<p className="text-sm font-semibold">
									{new Date(slotParam as string).toLocaleString("en-US")}
								</p>
							</div>
						)}
						<div className="flex items-center text-gray-12">
							<Clock4 className="size-4 mr-2" />
							<p className="text-sm font-semibold">15 mins</p>
						</div>
						<div className="flex items-center text-gray-12">
							<img
								alt="Cal video"
								src="/cal-video.svg"
								className="mr-2"
								width={16}
								height={16}
							/>
							<Tooltip>
								<TooltipTrigger asChild>
									<p className="text-sm font-semibold">Cal video</p>
								</TooltipTrigger>
								<TooltipContent>Cal video</TooltipContent>
							</Tooltip>
						</div>
						<Select value={timeZone} onValueChange={setTimeZone}>
							<SelectTrigger className="w-fit">
								<SelectValue placeholder="Select time zone">
									{timeZone.replace(/_/g, " ").split("(")[0].trim()}
								</SelectValue>
							</SelectTrigger>
							<SelectContent className="w-fit dark:bg-gray-5">
								{timeZones.map((timeZone) => (
									<SelectItem
										key={timeZone.label}
										value={timeZone.tzCode}
										className="dark:focus:bg-gray-2"
									>
										{timeZone.label.replace(/_/g, " ")}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				{!showForm ? (
					<>
						<Calendar
							minValue={today(getLocalTimeZone()).add({ days: 1 })}
							defaultValue={today(getLocalTimeZone()).add({ days: 1 })}
							value={date}
							onChange={handleChangeDate}
							onFocusChange={(focused) => setFocusedDate(focused)}
						/>
						<Tabs
							defaultValue="12"
							className="flex flex-col gap-4 w-[280px] border-l pl-6"
						>
							<div className="flex justify-between items-center">
								<p
									aria-hidden
									className="flex-1 align-center font-bold text-md text-gray-12"
								>
									{dayName} <span className="text-gray-11">{dayNumber}</span>
								</p>
								<TabsList className="grid w-fit grid-cols-2">
									<TabsTrigger value="12">12h</TabsTrigger>
									<TabsTrigger value="24">24h</TabsTrigger>
								</TabsList>
							</div>
							{["12", "24"].map((time) => (
								<TabsContent key={time} value={time}>
									<ScrollArea
										type="always"
										className="h-full"
										style={{
											maxHeight: weeksInMonth > 5 ? "380px" : "320px",
										}}
									>
										<div className="grid gap-2 pr-3">
											{availableTimes.map((availableTime) => (
												<Button
													variant="outline"
													onClick={() =>
														handleChangeAvailableTime(
															availableTime[time as "12" | "24"],
														)
													}
													key={availableTime[time as "12" | "24"]}
												>
													{availableTime[time as "12" | "24"]}
												</Button>
											))}
										</div>
									</ScrollArea>
								</TabsContent>
							))}
						</Tabs>
					</>
				) : (
					<form className="flex flex-col gap-6 w-[360px]">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Your name *</Label>
							<Input id="name" defaultValue="Damián Ricobelli" />
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="email">Email address *</Label>
							<Input
								id="email"
								type="email"
								defaultValue="dricobelli@gmail.com"
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="email">Additional notes</Label>
							<Textarea
								id="notes"
								placeholder="Please share anything that will help prepare for our meeting"
							/>
						</div>
						<p className="text-gray-11 text-xs my-4">
							By proceeding, you agree to our{" "}
							<span className="text-gray-12">Terms</span> and{" "}
							<span className="text-gray-12">Privacy Policy</span>.
						</p>
						<div className="flex justify-end gap-2">
							<Button
								variant="ghost"
								onClick={() => {
									router.back();
								}}
							>
								Back
							</Button>
							<Button asChild type="button">
								<Link href="https://github.com/damianricobelli/shadcn-cal-com">
									Continue
								</Link>
							</Button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
