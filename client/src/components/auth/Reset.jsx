import "./Auth.scss";
import logo from "../../img/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../store/thunks/user";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Reset = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const password = e.target[0].value;
    const passwordConfirm = e.target[1].value;
    if (password !== passwordConfirm) toast.warn("Passwords do not match");
    else dispatch(resetPassword({ id, password, passwordConfirm }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth__form" onSubmit={formSubmitHandler}>
            <img className="auth__form-logo" src={logo} alt="" />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button type="submit">Update password</button>
          </form>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Reset;
