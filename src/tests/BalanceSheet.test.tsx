import "@testing-library/jest-dom";

import { mockData } from "./mockData";
import { fireEvent, render } from "@testing-library/react";
import {
  MainBalanceSheetSections,
  RowRenderer,
} from "@/components/dashboard/BalanceSheet";
import { Row } from "@/app/types";
import React from "react";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <table>
      <tbody>{children}</tbody>
    </table>
  );
};

describe("RowRenderer", () => {
  it("should render header row", () => {
    const { getByText } = render(
      <Wrapper>
        <RowRenderer row={mockData.Reports[0].Rows[0]} />
      </Wrapper>
    );
    expect(getByText("29 September 2024")).toBeVisible();
    expect(getByText("30 September 2023")).toBeVisible();
  });

  it("should render row", () => {
    const { getByText } = render(
      <Wrapper>
        <RowRenderer row={mockData.Reports[0].Rows[2].Rows?.[0] as Row} />
      </Wrapper>
    );
    expect(getByText("My Bank Account")).toBeVisible();
    expect(getByText("126.70")).toBeVisible();
    expect(getByText("99.60")).toBeVisible();
  });

  it("should render summary row", () => {
    const { getByText } = render(
      <Wrapper>
        <RowRenderer row={mockData.Reports[0].Rows[2].Rows?.[3] as Row} />
      </Wrapper>
    );
    expect(getByText("Total Bank")).toBeVisible();
    expect(getByText("104076.70")).toBeVisible();
    expect(getByText("104049.60")).toBeVisible();
  });
});

describe("MainBalanceSheetSections", () => {
  it("should render the component with the correct sections", () => {
    const { getByText } = render(
      <Wrapper>
        <MainBalanceSheetSections
          sections={mockData.Reports[0].Rows.filter(
            (row) => row.Type === "Assets"
          )}
        />
      </Wrapper>
    );
    expect(getByText("Assets")).toBeVisible();
  });

  it("should render the expanded section", () => {
    const { getByText } = render(
      <Wrapper>
        <MainBalanceSheetSections
          sections={mockData.Reports[0].Rows.filter(
            (row) => row.Type === "Assets"
          )}
        />
      </Wrapper>
    );
    expect(getByText("Bank")).toBeInTheDocument();
    expect(getByText("Total Assets")).toBeVisible();
  });
});
