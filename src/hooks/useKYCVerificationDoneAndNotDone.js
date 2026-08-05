import {
  useCustomerKYCVerificationDoneAndNotDoneQuery,
} from "../redux/features/customer/customerApi";

const useKYCVerificationDoneAndNotDone = () => {

  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useCustomerKYCVerificationDoneAndNotDoneQuery();

  return {

    verification: data?.data,

    data,

    isLoading,

    isFetching,

    isSuccess,

    isError,

    error,

    refetch,

  };

};

export default useKYCVerificationDoneAndNotDone;