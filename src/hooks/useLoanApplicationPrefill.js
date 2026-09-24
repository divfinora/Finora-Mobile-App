



import { useGetLoanApplicationPrefillQuery } from "../redux/features/customer/customerApi";

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

    personalDetails:
      prefill?.personalDetails || {},

    kycDetails:
      prefill?.kycDetails || {},

    addressDetails:
      prefill?.addressDetails || {},

    employmentDetails:
      prefill?.employmentDetails || {},

    bankDetails:
      prefill?.bankDetails || null,

    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,

    refetch,
  };
};