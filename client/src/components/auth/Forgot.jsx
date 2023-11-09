import "./Auth.scss";
import logo from "../../img/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../store/thunks/user";
import { Navigate } from "react-router-dom";

const Forgot = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const email = e.target[0].value;

    dispatch(forgotPassword({ email }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth__form" onSubmit={formSubmitHandler}>
            <img className="auth__form-logo" src={logo} alt="" />
            <input type="email" placeholder="Email" required />
            <button type="submit">Send token</button>
          </form>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Forgot;
