import { Report } from "@prisma/client";
import { createContext, ReactNode } from "react";
import { useMutation, useQuery } from "react-query";

const fetchReports = async () => {
  const res = await fetch("api/reports/list");
  return res.json();
};

const closeReport = async ({ id }: { id: string }) => {
  const res = await fetch(`api/reports/${id}`, {
    method: "PUT",
  });
  return res.json();
};

const blockReport = async ({ id }: { id: string }) => {
  const res = await fetch(`api/reports/${id}`, {
    method: "PURGE",
  });
  return res.json();
};

export type ReportsContext = {
  isLoading: boolean;
  isError: boolean;
  reports: Report[];
  blockReport: (id: string) => void;
  closeReport: (id: string) => void;
};

export const ReportsContext = createContext<ReportsContext | undefined>(
  undefined
);

export const ReportsProvider = ({
  children,
}: {
  /** A `ReactNode` element. */
  children: ReactNode;
}) => {
  const {
    data: reportsData,
    isLoading: reportsLoading,
    isError: reportsIsError,
    refetch,
  } = useQuery(["fetchReports"], fetchReports);

  const {
    mutate: closedMutate,
    isLoading: closedLoading,
    isError: closedIsError,
  } = useMutation(["closeReport"], closeReport, {onSuccess: () => {refetch()}});

  const {
    mutate: blockedMutate,
    isLoading: blockedLoading,
    isError: blockedIsError,
  } = useMutation(["blockReport"], blockReport, {onSuccess: () => {refetch()}});

  const isLoading = reportsLoading && closedLoading && blockedLoading;
  const isError = reportsIsError && closedIsError && blockedIsError;

  return (
    <ReportsContext.Provider
      value={{
        isLoading,
        isError,
        reports: reportsData,
        blockReport: (id) => blockedMutate({ id }),
        closeReport: (id) => closedMutate({ id }),
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};
