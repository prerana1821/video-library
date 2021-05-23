import { useNavigate } from "react-router";
import "./LoginAlert.css";

export const LoginAlert = ({ msg, setShowModal }) => {
  const navigate = useNavigate();

  console.log("works");

  return (
    <div className='modal login-alert'>
      <div className='modal-header'>
        <span className='pink-txt'>
          <i className='fas fa-lg fa-exclamation-triangle'></i>
        </span>
        <h3 className='pink-txt'>Ohh No!</h3>
      </div>
      <p>{msg}</p>
      <div className='actn-btns'>
        <button
          onClick={() => setShowModal(false)}
          className='btn btn-sec tri-pink'
        >
          Cancel
        </button>
        <button
          onClick={() => navigate("/login")}
          className='btn btn-main box-sh'
        >
          Login
        </button>
      </div>
    </div>
  );
};
