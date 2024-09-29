import "@testing-library/jest-dom";

import { mockData } from "./mockData";
import {
  getBalanceSheetReports,
  getBalanceSheetReportWithType,
} from "@/app/api/BalanceSheet/helper";

describe("getBalanceSheetReports", () => {
  it("should return the first report", () => {
    const result = getBalanceSheetReports(mockData);
    expect(result).toEqual(mockData.Reports[0]);
  });

  it("should return the error message when there is no report", () => {
    const result = getBalanceSheetReports({
      Reports: [],
      Status: "Failure",
    });
    expect(result).toEqual({ message: "No report found" });
  });
});

describe("getBalanceSheetReportWithType", () => {
  it("should return a report with updated rows", () => {
    const balanceSheetReport = getBalanceSheetReportWithType(
      mockData.Reports[0]
    );
    expect(balanceSheetReport.Rows[0].Type).toBeUndefined();
    expect(balanceSheetReport.Rows[1].Type).toBe("Assets");
    expect(balanceSheetReport.Rows[2].Type).toBe("Assets");
    expect(balanceSheetReport.Rows[3].Type).toBe("Assets");
    expect(balanceSheetReport.Rows[4].Type).toBe("Assets");
    expect(balanceSheetReport.Rows[5].Type).toBe("Assets");
    expect(balanceSheetReport.Rows[6].Type).toBe("Assets");
    expect(balanceSheetReport.Rows[7].Type).toBe("Liabilities");
    expect(balanceSheetReport.Rows[8].Type).toBe("Liabilities");
    expect(balanceSheetReport.Rows[9].Type).toBe("Liabilities");
    expect(balanceSheetReport.Rows[10].Type).toBe("Liabilities");
    expect(balanceSheetReport.Rows[11].Type).toBe("Liabilities");
    expect(balanceSheetReport.Rows[12].Type).toBe("Equity");
  });
});
