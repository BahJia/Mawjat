import "./../UI/Modal.scss";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/thunks/admin";
import List from "../UI/List";
import ListNFT from "../UI/List copy";

const AdminReward = () => {
  const { songs } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongs());

  }, []);

  return (
    <>
      <div className="playlist__songs" style={{ marginTop : '100px'}}>
      <ListNFT list={songs} />
      </div>
    </>
  );
};

export default AdminReward;
