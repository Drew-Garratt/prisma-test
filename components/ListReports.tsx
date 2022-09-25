import Link from "next/link";
import { useContext } from "react";
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
                <li key={report.id} className={"shadow-md border rounded-md p-4"}>
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
            })}
        </ul>
      </fieldset>
    </form>
  );
};
