export interface BalanceSheetResponseType {
  Status: string;
  Reports: Report[];
}

export interface Report {
  ReportID: string;
  ReportName: string;
  ReportType: string;
  ReportTitles: string[];
  ReportDate: string;
  UpdatedDateUTC: string;
  Fields: any[];
  Rows: Row[];
}

export interface Row {
  RowType: string;
  Cells?: Cell[];
  Title?: string;
  Type?: string;
  Rows?: Row2[];
}

export interface Cell {
  Value: string;
}

export interface Row2 {
  RowType: string;
  Cells: Cell2[];
}

export interface Cell2 {
  Value: string;
  Attributes?: Attribute[];
}

export interface Attribute {
  Value: string;
  Id: string;
}
