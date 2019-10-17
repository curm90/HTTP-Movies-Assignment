import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

export default class MovieList extends Component {
  render() {
    return (
      <div className='movie-list'>
        {this.props.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
