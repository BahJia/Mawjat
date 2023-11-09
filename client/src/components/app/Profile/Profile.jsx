import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePassword,
  updateUser,
  becomeArtist,
  logoutUser,
} from "../../../store/thunks/user";
import { useRef } from "react";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../utils";

const Profile = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const formInfoRef = useRef();
  const formPassRef = useRef();

  const navigate = useNavigate();

  const formInfoHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(formInfoRef.current);

    dispatch(updateUser(formData));
  };

  const formPassHandler = (e) => {
    e.preventDefault();

    const data = {
      currentPassword: e.target[0].value,
      password: e.target[1].value,
      passwordConfirm: e.target[2].value,
    };

    dispatch(updatePassword(data));
  };

  const becomeArtistHandler = () => {
    dispatch(becomeArtist());
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    logout()
  };

  return (
    <>
      {user.name ? (
        <div className="profile">
          <div className="profile__header">
            <div className="profile__photo">
              <img src={user.img} alt="Avatar" />
            </div>
            <div className="profile__info">
              <span>Profile</span>
              <h1 className="profile__name">{user.name}</h1>
              <span>{user.followedArtists.length} Following</span>
            </div>
          </div>
          <div className="profile__body">
            <div className="profile__form">
              <h2>Update your information</h2>
              <form ref={formInfoRef} onSubmit={formInfoHandler}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  minLength="3"
                  maxLength="24"
                  placeholder={user.name}
                />
                <label htmlFor="email">Email</label>
                <input type="text" name="email" placeholder={user.email} />
                <label htmlFor="photo">Photo</label>
                <input type="file" name="photo" accept="image/*" />
                <button type="submit">Update</button>
              </form>
              <h2>Update your password</h2>
              <form ref={formPassRef} onSubmit={formPassHandler}>
                <label htmlFor="oldPassword">Old password</label>
                <input
                  type="password"
                  name="oldPassword"
                  minLength="8"
                  maxLength="16"
                />
                <label htmlFor="newPassword">New password</label>
                <input
                  type="password"
                  name="newPassword"
                  minLength="8"
                  maxLength="16"
                />
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  minLength="8"
                  maxLength="16"
                />
                <button type="submit">Update</button>
              </form>
              {user.role === "user" && (
                <p
                  onClick={becomeArtistHandler}
                  style={{ color: "#22c55e", cursor: "pointer" }}
                >
                  🎤 Become an Artist
                </p>
              )}
              <p
                onClick={logoutHandler}
                style={{ color: "#ef4444", cursor: "pointer" }}
              >
                ✈️ Log out
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>Really?? You are not logged in man!!</div>
      )}
    </>
  );
};

export default Profile;
