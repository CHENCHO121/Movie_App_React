import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_URL } from "./context";

const SingleMovie = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`);
    }, 500);

    return () => clearTimeout(timeOut);
  }, [id]);

  if (isLoading) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }
  return (
    <>
      <div className="movie-section">
        <div className="movie-card">
          <figure>
            <img src={movie.Poster} alt={movie.Title} />
          </figure>
          <div className="card-content">
            <p className="title">{movie.Title}</p>
            <p className="card-text">{movie.Released}</p>
            <p className="card-text">{movie.Genre}</p>
            <p className="card-text">{movie.imdbRating}</p>
            <p className="card-text">{movie.Country}</p>
            <NavLink to='/' className="back-btn">Go Back</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMovie;
