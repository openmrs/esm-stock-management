import { openmrsFetch, restBaseUrl, usePagination } from '@openmrs/esm-framework';
import useSWR from 'swr';
import { ReportType } from './ReportType';
import { useState } from 'react';

export function useReportTypes() {
  const apiUrl = `${restBaseUrl}/stockmanagement/report?v=default`;
  const { data, error, isLoading } = useSWR<{ data: { results: ReportType } }, Error>(apiUrl, openmrsFetch);
  return {
    reportTypes: data?.data?.results ?? [],
    isLoading,
    isError: error,
  };
}
export function useGetReports() {
  const apiUrl = `${restBaseUrl}/stockmanagement/batchjob?batchJobType=Report&v=default&limit=10&totalCount=true`;
  const { data, error, isLoading } = useSWR<{ data: { results: any } }, Error>(apiUrl, openmrsFetch);
  const pageSizes = [10, 20, 30, 40, 50];
  const [currentPageSize, setPageSize] = useState(10);

  const { goTo, results: paginatedItems, currentPage } = usePagination(data?.data?.results, currentPageSize);
  return {
    reports: data?.data?.results ?? [],
    isLoading,
    isError: error,
    items: paginatedItems,
    totalItems: data?.data?.results?.length,
    currentPage,
    currentPageSize,
    paginatedItems,
    goTo,
    pageSizes,
    setPageSize,
  };
}
