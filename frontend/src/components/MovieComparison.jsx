import React, { useState } from 'react';
import api from "../services/api";
import databases from "../enums/databases";

function MovieComparison({mongo1Movies, mongo2Movies}) {
  const moviesEndpoint = "/movies";
  const [selectedDb, setSelectedDb] = useState(databases.MONGO2);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [dbContainsMovie, setDbContains] = useState('');

  // Function to handle database selection change
  const handleDbChange = (event) => {
    const newSelectedDb = event.target.value;
    setSelectedDb(newSelectedDb);
  };

  const handleMovieChange = (event) => {
    const newSelectedMovie = event.target.value;
    setSelectedMovie(newSelectedMovie);
  };

  const handleMovieComparison = async () => {
    const currentMovies = selectedDb == databases.MONGO1 ? mongo2Movies : mongo1Movies;
    let movieTitle = '';
    if (selectedMovie === '') {
      movieTitle = currentMovies[0].title;
    } else {
      movieTitle = selectedMovie;
    }
  
    try {
      await api.get(moviesEndpoint + selectedDb + '/' + selectedMovie);
      setDbContains(true);
    } catch (error) {
      setDbContains(false);
    }
  }

  return (
    <div>
      <div >
        <label> A base de dados </label>
        <select value={selectedDb} onChange={handleDbChange}>
          <option value={databases.MONGO1}>1</option>
          <option value={databases.MONGO2}>2</option>
        </select>
        <label> contém </label>
        <select value={selectedMovie} onChange={handleMovieChange}>
          {selectedDb == databases.MONGO1 ? 
            mongo2Movies.map((movie, index) => (
              <option key={'option ' + index} value={movie.title}>
                {movie.title}
              </option>
            )) :
            mongo1Movies.map((movie, index) => (
              <option key={'option ' + index} value={movie.title}>
                {movie.title}
              </option>
            ))
          }
        </select>
        <label> ? </label>
        <button onClick={handleMovieComparison}>
          Checar
        </button>
      </div>
      <div>
        { dbContainsMovie !== '' ? 
          (
          dbContainsMovie ? 
            <span>Sim.</span> : <span>Não.</span>  
          ) : ''}
      </div>
    </div>
  );
}

export default MovieComparison;