import "./Admin.scss";
import "./../UI/Modal.scss";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSong,
  getSongs,
  updateSong,
  uploadSong,
} from "../../store/thunks/admin";
import List from "../UI/List";
import { IoCloseCircle, IoFlame } from "react-icons/io5";
import Loading from "../UI/Loading";
import { Link } from "react-router-dom";
import { accountId, get_music_nft, mint_music_nft } from "../../utils";

const Admin = () => {
  const [song, setSong] = useState({});
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const { songs } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const formRef = useRef();
  const editFormRef = useRef();

  useEffect(() => {
    dispatch(getSongs());
    get_music_nft("Money trees").then((res) => {
      console.log(res);
    });
  }, []);

  const openModalHandler = () => setModal(true);

  const closeModalHandler = () => setModal(false);

  const openEditModalHandler = (id) => {
    const song = songs.find((song) => song.id === id);
    setSong(song);
    setEditModal(true);
  };

  const closeEditModalHandler = () => setEditModal(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    formData.append('owner_id', accountId().accountId);

    dispatch(uploadSong({ data: formData }));
    setModal(false);
  };

  const editFormSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(editFormRef.current);
    formData.append('owner_id', accountId().accountId);

    dispatch(
      updateSong({
        data: formData,
        id: song.id,
      })
    );
    setEditModal(false);
    console.log(formData.get("name"));
  };

  const deleteSongHandler = (id) => {
    dispatch(deleteSong(id));
    setEditModal(false);
  };

  return (
    <>
      {songs ? (
        <div className="admin">
          <div className="admin__header">
            <div className="admin__card">
              <span>{songs.length}</span> songs
            </div>
            <div className="admin__card">
              <span>{songs.reduce((acc, song) => acc + song.plays, 0)}</span>
              plays
            </div>
            <div className="admin__card" onClick={openModalHandler}>
              <span>+</span> upload new
            </div>
          </div>
          <div className="admin__list">
            <div
              className="nav-link"
              style={{ cursor: "pointer", marginBottom: "10px" }}
            >
              <IoFlame className="icon" />
              Claim reward
            </div>
            <List list={songs} admin={true} handler={openEditModalHandler} />
          </div>
        </div>
      ) : (
        <Loading />
      )}

      {modal && (
        <div className="modal modal--admin">
          <div className="modal__header">
            <h2>Mint a new song</h2>
            <div className="modal__close">
              <IoCloseCircle onClick={closeModalHandler} />
            </div>
          </div>
          <form
            ref={formRef}
            className="modal__form"
            onSubmit={formSubmitHandler}
          >
            <label htmlFor="img">Cover</label>
            <input type="file" name="img" id="img" placeholder="Img" />
            <label htmlFor="song">Song</label>
            <input type="file" name="song" id="song" />
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Song name" />
            <label htmlFor="token_id">Music NFT id</label>
            <input
              type="text"
              name="token_id"
              id="token_id"
              placeholder={song.name}
            />
            <label htmlFor="total_fractions">Total fractions</label>
            <input
              type="number"
              max="1000"
              name="total_fractions"
              id="total_fractions"
              placeholder={song.name}
            />
            <button>Upload</button>
          </form>
        </div>
      )}
      {song && editModal && (
        <div className="modal modal--admin">
          <div className="modal__header">
            <h2>Upload a new song</h2>
            <div className="modal__close">
              <IoCloseCircle onClick={closeEditModalHandler} />
            </div>
          </div>
          <form
            ref={editFormRef}
            className="modal__form"
            onSubmit={editFormSubmitHandler}
          >
            <img width={100} src={song.img} alt="Song cover" />
            <input type="file" name="img" id="img" placeholder="Img" />
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder={song.name} />
            {/* <label htmlFor="token_id">Music NFT id</label>
            <input
              type="text"
              name="token_id"
              id="token_id"
              placeholder={song.name}
            /> */}
            {/* <label htmlFor="total_fractions">Total fractions</label>
            <input
              type="number"
              max="1000"
              name="total_fractions"
              id="total_fractions"
              placeholder={song.name}
            /> */}
            <button>Update</button>
            <button
              style={{ background: "blue" }}
              onClick={(e) => {
                e.preventDefault();
                mint_music_nft(
                  song.token_id,
                  "",
                  song.total_fractions
                );              }}
            >
              Mint NFT
            </button>

            <button
              style={{ background: "#EF4444" }}
              onClick={(e) => {
                e.preventDefault();
                deleteSongHandler(song.id);
              }}
            >
              Delete
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Admin;
