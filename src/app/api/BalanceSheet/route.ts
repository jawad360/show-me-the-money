import { BalanceSheetResponseType } from "@/app/types";
import { produce } from "immer";

export const getBalanceSheetReports = (data: BalanceSheetResponseType) => {
  if (data?.Reports?.[0]) {
    return data?.Reports?.[0];
  }
  return { message: "Not found" };
};

export const getBalanceSheetReportWithType = (balanceSheetReport: Report) => {
  return produce(balanceSheetReport, (draft) => {
    let currentType = '';
    draft.Rows.forEach((row) => {
      if (row.RowType === "Section") {
        if(row.Title === "Assets" || row.Title === "Liabilities" || row.Title === "Equity") {
          currentType = row.Title;
        }
        row.Type = currentType;
      }
    });
  });
};

export async function GET(request: Request) {
  const res = await fetch(
    "http://localhost:8080/api.xro/2.0/Reports/BalanceSheet"
  );
  const data: BalanceSheetResponseType = await res.json();

  const balanceSheetReport = getBalanceSheetReports(data);

  if (balanceSheetReport && !balanceSheetReport.hasOwnProperty("message")) {
    const balanceSheetReportWithType =
      getBalanceSheetReportWithType(balanceSheetReport);
    return Response.json(balanceSheetReportWithType);
  }
  return Response.json(balanceSheetReport);
}
