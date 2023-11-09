import "./Search.scss";
import axios from "../../../api/axios";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import List from "../../UI/List";
import SquareList from "../../UI/SquareList";
import { toast } from "react-toastify";

const Search = () => {
  const [queryType, setQueryType] = useState("song");
  const [results, setResults] = useState(null);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `/search/${queryType}?name=${e.target[0].value}`,
      );

      if (queryType === "song") {
        setResults({
          type: "song",
          list: res.data.data,
        });
      } else if (queryType === "artist") {
        setResults({
          type: "artist",
          list: res.data.data,
        });
      } else if (queryType === "playlist") {
        setResults({
          type: "playlist",
          list: res.data.data,
        });
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const changeTagHandler = (tag) => {
    setQueryType(tag);
  };

  return (
    <div className="search">
      <div className="search__nav">
        <form onSubmit={formSubmitHandler}>
          <input type="text" placeholder="What your want to listen to?" />
          <IoSearch className="search__icon" />
        </form>
      </div>
      <ul className="search__tags">
        <li
          className={
            "search__tag " + (queryType === "song" && "search__tag--active")
          }
          onClick={() => changeTagHandler("song")}
        >
          Song
        </li>
        <li
          className={
            "search__tag " + (queryType === "artist" && "search__tag--active")
          }
          onClick={() => changeTagHandler("artist")}
        >
          Artist
        </li>
        <li
          className={
            "search__tag " + (queryType === "playlist" && "search__tag--active")
          }
          onClick={() => changeTagHandler("playlist")}
        >
          Playlist
        </li>
      </ul>
      {results?.type === "song" && <List list={results.list} search={true} />}
      {results?.type === "artist" && (
        <SquareList list={results.list} artist={true} />
      )}
      {results?.type === "playlist" && <SquareList list={results.list} />}
    </div>
  );
};

export default Search;
