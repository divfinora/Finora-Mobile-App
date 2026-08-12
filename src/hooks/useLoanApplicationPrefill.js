import { useGetLoanApplicationPrefillQuery } from "../api/customerApi";

export const useLoanApplicationPrefill = () => {
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetLoanApplicationPrefillQuery();

  const prefill = data?.data || {};

  return {
    prefill,

    // Sections
    personalDetails: prefill?.personalDetails || {},
    kycDetails: prefill?.kycDetails || {},
    addressDetails: prefill?.addressDetails || {},
    employmentDetails: prefill?.employmentDetails || {},
    bankDetails: prefill?.bankDetails || null,

    // States
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,

    // Manually refresh
    refetch,
  };
};