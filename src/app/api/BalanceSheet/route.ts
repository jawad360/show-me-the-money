import { BalanceSheetResponseType } from "@/app/types";
import { getBalanceSheetReports, getBalanceSheetReportWithType } from "./helper";
import { NextResponse, NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams.toString()
  const res = await fetch(
    `${process.env.XERO_API}/api.xro/2.0/Reports/BalanceSheet?${params}`
  );
  const data: BalanceSheetResponseType = await res.json();

  const balanceSheetReport = getBalanceSheetReports(data);

  if (balanceSheetReport && !("message" in balanceSheetReport)) {
    const balanceSheetReportWithType =
      getBalanceSheetReportWithType(balanceSheetReport);
    return NextResponse.json(balanceSheetReportWithType);
  }
  return NextResponse.json(balanceSheetReport);
}
