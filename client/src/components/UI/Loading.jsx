import "./Loading.scss";
import loadingSvg from "./../../img/loading.svg";
import { Link } from "react-router-dom";

const Loading = ({ main }) => {
  return (
    <div className="loading">
      <img src={loadingSvg} alt="Loading spinner" />
      {main && (
        <p>
          If it takes too long,&nbsp;
          <Link to="login">please log in here</Link>
        </p>
      )}
    </div>
  );
};

export default Loading;
