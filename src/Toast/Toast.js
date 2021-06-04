import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { useData, useUserDetails } from "../Context";
import "./Toast.css";

export const Toast = ({
  userDetailsStateLoading,
  loadingError,
  statusError,
  statusSuccess,
}) => {
  const { userDetailsDispatch } = useUserDetails();
  const { dispatch } = useData();
  const { setStatus } = useAuth();
  const [toastVisibility, setToastVisibility] = useState(true);

  useEffect(() => {
    const toastVisible = setTimeout(() => {
      setToastVisibility(false);
      userDetailsDispatch({
        type: "STATUS",
        payload: { loading: "" },
      });
      dispatch({ type: "STATUS", payload: { error: "" } });
      setStatus({ loading: "", success: "", error: "" });
    }, 2000);
    return () => {
      clearTimeout(toastVisible);
    };
  }, [statusError, statusSuccess, userDetailsStateLoading, loadingError]);

  return (
    <>
      {toastVisibility && (
        <div className='toast tl-error status'>
          <div className='tl-content-error'>
            <i className='fas fa-check-circle'></i>
            <p>
              {userDetailsStateLoading ||
                loadingError ||
                statusError ||
                statusSuccess}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
