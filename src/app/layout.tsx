"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container, styled } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <MainWrapper className="mainwrapper">
              <PageWrapper className="page-wrapper">
                <Container
                  sx={{
                    paddingTop: "20px",
                    maxWidth: "1200px",
                  }}
                >
                  <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
                    {children}
                  </Box>
                </Container>
              </PageWrapper>
            </MainWrapper>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
