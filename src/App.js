import { useReducer, useState } from "react";
import Navigation from "./Components/Navigation.js";
import Main from "./Components/Main.js";
import Section from "./Components/Section.js";
import MoviesList from "./Components/MoviesList.js";
import Loader from "./Components/Loader.js";
import ErrorMessage from "./Components/ErrorMessage.js";
import WatchedSummary from "./Components/WatchedSummary.js";
import WatchedMovieList from "./Components/WatchedMovieList.js";
import MovieDetails from "./Components/MovieDetails.js";
import UseMovies from "./Components/useMovies.js";
import UseLocalStorageState from "./Components/useLocalStorageState.js";

const average = (arr) =>
  arr?.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const key = "19edbd93";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [userRating, setUserRating] = useState("");
  //const [watched, setWatched] = useState([]);

  const { movies, isLoading, error } = UseMovies(query, handleCloseMovie);
  const [watched, setWatched] = UseLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId(id);
    setUserRating("");
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(arg) {
    setWatched((prev) => [...prev, arg]);
  }

  function handleDeleteWatched(id) {
    setWatched((prev) => prev.filter((el) => el.imdbID !== id));
  }

  return (
    <>
      <Navigation movies={movies} setQuery={setQuery} query={query} />

      <Main>
        <Section>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList
              movies={movies}
              handleSelectMovie={handleSelectMovie}
              handleCloseMovie={handleCloseMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Section>

        <Section>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              handleAddWatched={handleAddWatched}
              setUserRating={setUserRating}
              apiKey={key}
              userRating={userRating}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} average={average} />
              <WatchedMovieList
                watched={watched}
                movie={movies}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Section>
      </Main>
    </>
  );
}
