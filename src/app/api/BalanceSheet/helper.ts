import { BalanceSheetResponseType, Report } from "@/app/types";
import { produce } from "immer";
export const getBalanceSheetReports = (data: BalanceSheetResponseType) => {
    if (data?.Reports?.[0]) {
      return data?.Reports?.[0];
    }
    return { message: "No report found" };
  };
  
  export const getBalanceSheetReportWithType = (balanceSheetReport: Report) => {
    return produce(balanceSheetReport, (draft) => {
      let currentType = "";
      draft.Rows.forEach((row) => {
        if (row.RowType === "Section") {
          if (
            row.Title === "Assets" ||
            row.Title === "Liabilities" ||
            row.Title === "Equity"
          ) {
            currentType = row.Title;
          }
          row.Type = currentType;
        }
      });
    });
  };