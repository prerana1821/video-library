import { useUserDetails } from "../Context";
import "./Toast.css";

export const Toast = () => {
  const { userDetailsState } = useUserDetails();

  return (
    <>
      <div className='toast tl-error status'>
        <div className='tl-content-error'>
          <i className='fas fa-check-circle'></i>
          <p>{userDetailsState?.loading}</p>
        </div>
      </div>
    </>
  );
};
