import StarRating from "./StarRating.js";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader.js";
import useKey from "./useKey.js";

export default function MovieDetails({
  selectedId,
  handleCloseMovie,
  handleAddWatched,
  setUserRating,
  userRating,
  apiKey,
  watched,
}) {
  const [movieDetail, setMovieDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useKey("Escape", handleCloseMovie);

  const countRef = useRef(0);

  const isWatched = watched.find((el) => el.imdbID === selectedId);
  const watchedRating = watched.find(
    (el) => el.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetail;

  useEffect(
    function () {
      if (userRating) countRef.current += 1;
    },
    [userRating]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "UsePopCorn";
      };
    },
    [title]
  );

  function handleAdd() {
    const listMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      ratingDecision: countRef.current,
    };
    handleAddWatched(listMovie);
    handleCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        // const url = `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`;
        // console.log(url);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
        );
        const data = await res.json();
        setMovieDetail(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId, apiKey]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => handleCloseMovie()}>
              ⬅️
            </button>
            <img src={poster} alt={`Poster of the ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>Movie Already Watched ⭐{watchedRating}</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    setUserRating={setUserRating}
                  />
                  {userRating && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
