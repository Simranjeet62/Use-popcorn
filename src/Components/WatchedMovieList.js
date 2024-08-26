import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({
  watched,
  movie,
  handleDeleteWatched,
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleDeleteWatched={handleDeleteWatched}
        />
      ))}
    </ul>
  );
}
