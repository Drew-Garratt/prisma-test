import { Report } from "@prisma/client";
import Link from "next/link";
import { useContext } from "react";
import { ReportsContext } from "./ReportsProvider";

export const ReportCard = ({ report }: { report: Report }) => {
  const reportsContext = useContext(ReportsContext);

  if (reportsContext === undefined)
    throw new Error("ListReports must be used within a ReportsContext");

  const { blockReport, closeReport } = reportsContext;

  return (
    <li className={"shadow-md border rounded-md p-4"}>
      <ul>
        <li>Id: {report.id}</li>

        <li>Status: {report.state}</li>

        <li>Type: {report.payload.reportType}</li>

        <li>Message: {report.payload.message}</li>

        <li>
          <Link href={`/reports/${report.id}`}>Details</Link>
        </li>
      </ul>
      <div className="flex space-x-2">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            blockReport(report.id);
          }}
        >
          Block
        </button>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            closeReport(report.id);
          }}
        >
          Resolve
        </button>
      </div>
    </li>
  );
};
