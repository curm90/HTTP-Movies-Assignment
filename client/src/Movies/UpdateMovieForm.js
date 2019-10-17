import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialFormValues = { title: '', director: '', metascore: '', stars: [] };

const UpdateMovieForm = props => {
  const [movieForm, setMovieForm] = useState(initialFormValues);

  useEffect(() => {
    movieToEdit();
  }, []);

  const movieToEdit = () => {
    const id = props.match.params.id;
    const movieMatch = props.movies.find(movie => `${movie.id}` === id);

    if (movieMatch) {
      setMovieForm(movieMatch);
    }
  };

  const handleInputChange = e => {
    setMovieForm({ ...movieForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${movieForm.id}`, movieForm)
      .then(res => {
        props.updateMovies(res.data);
        setMovieForm(initialFormValues);
        props.history.push(`/movies/${props.match.params.id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          onChange={handleInputChange}
          value={movieForm.title}
        />
        <input
          type='text'
          name='director'
          placeholder='Director'
          onChange={handleInputChange}
          value={movieForm.director}
        />
        <input
          type='text'
          name='metascore'
          placeholder='Metascore'
          onChange={handleInputChange}
          value={movieForm.metascore}
        />
        <input
          type='text'
          name='stars'
          placeholder='Stars'
          onChange={handleInputChange}
          value={movieForm.stars}
        />
        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
