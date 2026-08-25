import {
  useSelector,
} from "react-redux";


const useUserRole = () => {

  const user = useSelector(
    (state) => state.auth.user
  );


  const role =
    user?.role?.toUpperCase() || null;


  const isVisitor =
    role === "VISITOR";


  const isCustomer =
    role === "CUSTOMER";


  return {
    user,

    role,

    isVisitor,

    isCustomer,
  };

};


export default useUserRole;