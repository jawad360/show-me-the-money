"use client";
import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import _ from "lodash";
import DashboardCard from "../shared/DashboardCard";
import { DatePicker } from "@mui/x-date-pickers";
import { BalanceSheetResponseType, Row } from "@/app/types";
import dayjs, { Dayjs } from "dayjs";

export const RowRenderer: React.FC<{
  row: Row;
}> = ({ row }) => {
  if (row.RowType === "Header") {
    return (
      <TableRow>
        {row.Cells?.map((cell, index) => (
          <TableCell key={index} align={index === 0 ? "inherit" : "right"}>
            {cell.Value}
          </TableCell>
        ))}
      </TableRow>
    );
  } else if (row.RowType === "Row") {
    return (
      <TableRow>
        {row.Cells?.map((cell, index) => (
          <TableCell key={index} align={index === 0 ? "inherit" : "right"}>
            {cell.Value}
          </TableCell>
        ))}
      </TableRow>
    );
  } else if (row.RowType === "SummaryRow") {
    return (
      <TableRow sx={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}>
        {row.Cells?.map((cell, index) => (
          <TableCell
            key={index}
            sx={{ fontWeight: "bold" }}
            align={index === 0 ? "inherit" : "right"}
          >
            {cell.Value}
          </TableCell>
        ))}
      </TableRow>
    );
  } else if (row.RowType === "Section") {
    return <SectionGroup section={row} />;
  }
};

export const SectionGroup: React.FC<{
  section: Row;
}> = ({ section }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sectionSummaryRow = useMemo(
    () => section.Rows?.find((row) => row.RowType === "SummaryRow"),
    [section.Rows]
  );

  if (section.Rows?.length === 0) {
    return null;
  }

  if (!section.Title && section.Rows?.length === 1) {
    return <RowRenderer row={section.Rows[0]} />;
  }
  return (
    <>
      <TableRow
        sx={{
          backgroundColor: "#e0e0e0",
          cursor: "pointer",
          "&:hover": { backgroundColor: "#d0d0d0" },
        }}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <TableCell colSpan={1}>
          <Box display="flex" alignItems="center">
            <IconButton size="small">
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", ml: 1 }}>
              {section.Title}
            </Typography>
          </Box>
        </TableCell>
        {sectionSummaryRow &&
          sectionSummaryRow.Cells.slice(1).map((cell, index) => (
            <TableCell key={index} align="right">
              {cell.Value}
            </TableCell>
          ))}
      </TableRow>
      {isExpanded &&
        section.Rows?.map((row, index) => (
          <RowRenderer key={index} row={row} />
        ))}
    </>
  );
};

export const MainBalanceSheetSections: React.FC<{ sections: Row[] }> = ({
  sections,
}) => {
  return (
    <>
      <TableRow sx={{ backgroundColor: "#c0c0c0" }}>
        <TableCell colSpan={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {sections[0].Type}
          </Typography>
        </TableCell>
      </TableRow>
      {/* not a good idea to use key as index */}
      {sections.length > 1 &&
        sections.map((section, index) => (
          <SectionGroup key={index} section={section} />
        ))}
      {sections.length === 1 &&
        sections[0].Rows?.map((row, index) => (
          <RowRenderer key={index} row={row} />
        ))}
    </>
  );
};

const BalanceSheet: React.FC<{
  date: Dayjs;
  setDate: (date: Dayjs) => void;
  data: BalanceSheetResponseType["Reports"][0];
}> = ({ data, date, setDate }) => {
  const headerRow = useMemo(
    () => data.Rows.find((row) => row.RowType === "Header"),
    [data]
  );

  return (
    <DashboardCard
      title={data.ReportName}
      subtitle={data.ReportDate}
      action={
        <DatePicker
          yearsOrder="desc"
          views={["month", "year"]}
          maxDate={dayjs().endOf("month")}
          value={date}
          onChange={(d) => d && setDate(d.endOf("month"))}
        />
      }
    >
      <TableContainer component={Paper}>
        <Table>
          {headerRow && (
            <TableHead key={headerRow.RowType}>
              <RowRenderer row={headerRow} />
            </TableHead>
          )}
          <TableBody>
            {Object.values(
              _.groupBy(
                data.Rows.filter((row) => row.RowType === "Section"),
                "Type"
              )
            ).map((section) => (
              <MainBalanceSheetSections
                key={section[0].Type}
                sections={section}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default BalanceSheet;
