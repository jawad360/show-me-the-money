import { Box } from "@mui/material";
import BalanceSheet from "@/components/dashboard/BalanceSheet";

export const revalidate = 0;

const Dashboard = async () => {
  let res = await fetch("http://localhost:3000/api/BalanceSheet", { cache: 'no-store' });
  let data = await res.json();
    return (
      <Box>
        <BalanceSheet data={data}/>
      </Box>
  );
};

export default Dashboard;
