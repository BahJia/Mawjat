import "./SquareList.scss";
import { Link } from "react-router-dom";

const squareList = ({ list, artist, home }) => {
  // Good luck on understanding the logic 🤣

  return (
    <div className={`square-list ${home ? "square-list--home" : ""}`}>
      {list &&
        list.map((el) => (
          <Link
            key={el.id}
            to={artist ? `/artist/${el.id}` : `/playlist/${el.id}`}
            className={`square-card ${artist ? "square-card--artist" : ""} ${
              el.id === "6513505bef35c9d633139956" ? "vip" : ""
            } ${el.user?.id === "6513505bef35c9d633139956" ? "vip" : ""}`}
          >
            <img src={el.img} alt={el.name} />
            <div className="square-card__name">{el.name}</div>
            {artist ? (
              <div>Artist</div>
            ) : (
              <div>{home ? "Playlist" : `By ${el.user.name}`}</div>
            )}
          </Link>
        ))}
    </div>
  );
};

export default squareList;
