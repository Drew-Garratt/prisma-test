import { ListReports } from "@/components/ListReports";
import { ReportsContext, ReportsProvider } from "@/components/ReportsProvider";
import { NextPage } from "next/types"
import { useQuery } from "react-query";

const fetchReports = async () => {
  const res = await fetch("api/reports/list");
  return res.json();
};

const Reports: NextPage = () => {
  return (
    <ReportsProvider>
      <ListReports />
    </ReportsProvider>
  )
}

export default Reports;