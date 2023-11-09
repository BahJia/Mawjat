import { FaWallet } from "react-icons/fa";
import "./App.scss";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { accountId, login } from "../../utils";

const App = (props) => {
  const { data } = useSelector((state) => state.user);

  return (
    <div className="app">
      <div className="app__nav">
        <div className="app__nav__history">
          <div className="app__nav__history-icon">
            <IoChevronBackOutline />
          </div>
          <div className="app__nav__history-icon">
            <IoChevronForwardOutline />
          </div>
          <div className="app__nav__history-icon">
          <img
            crossOrigin="anonymous"
            src={data.img}
            alt=""
            className="app__nav__profile--img"
          />
          </div>
        </div>
        <div className="app__nav__profile">
          <button className="connect-button" onClick={() => login()}>
            <FaWallet className="icon" />
            {accountId ? accountId().accountId : "Wallet connect"}
          </button>
        </div>
      </div>
      {/*<Home />*/}
      {/*<Artist />*/}
      {props.children}
    </div>
  );
};

export default App;
