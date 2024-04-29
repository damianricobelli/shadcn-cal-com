import { type NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
	if (!req.nextUrl.searchParams.has("date")) {
		const url = req.nextUrl.clone();
		const today = new Date();
		today.setDate(today.getDate());
		url.searchParams.set("date", today.toISOString().split("T")[0].toString());
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}
