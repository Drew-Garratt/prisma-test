import Link from "next/link";
import { useContext } from "react";
import { ReportCard } from "./ReportCard";
import { ReportsContext } from "./ReportsProvider";

export const ListReports = () => {
  const reportsContext = useContext(ReportsContext);

  if (reportsContext === undefined)
    throw new Error("ListReports must be used within a ReportsContext");

  const { reports, isLoading, blockReport, closeReport } = reportsContext;

  return (
    <form>
      <fieldset disabled={isLoading}>
        <ul className="flex flex-col space-y-4">
          {!reports && <li>Loading</li>}

          {reports &&
            reports.map((report) => {
              return (
                <ReportCard key={report.id} report={report}/>
              );
            })}
        </ul>
      </fieldset>
    </form>
  );
};
