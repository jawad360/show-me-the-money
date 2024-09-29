"use client";
import { Box, CircularProgress, Typography } from "@mui/material";
import BalanceSheet from "@/components/dashboard/BalanceSheet";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Report } from "./types";

const Dashboard = () => {
  const [date, setDate] = useState<Dayjs>(dayjs().endOf("month"));
  const [data, setData] = useState<Report>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try{

        setIsLoading(true);
        const searchParams = new URLSearchParams('');
  
        if(date){
          searchParams.set('date', date.format('YYYY-MM-DD'))
        }
        const res = await fetch(`http://localhost:3000/api/BalanceSheet?${searchParams.toString()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        setIsLoading(false);
        setData(data);
      }catch(err){
        setIsLoading(false);
      }
    })();
  }, [date]);

  if (isLoading && !data) {
    return <CircularProgress title="Fetching data" />;
  }

  if (!data) {
    return (
      <Typography
        variant="h5"
        sx={{ color: (theme) => theme.palette.error.main }}
      >
        Failed to fetch data
      </Typography>
    );
  }

  return (
    <Box>
      <BalanceSheet data={data} date={date} setDate={setDate} />
    </Box>
  );
};

export default Dashboard;
