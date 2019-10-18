import React, { useState } from 'react';
import axios from 'axios';

const initialFormValues = {
  title: '',
  director: '',
  metascore: '',
  stars: ['', '', '']
};

const AddMovieForm = props => {
  const [newMovie, setNewMovie] = useState(initialFormValues);

  const handleInputChange = e => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleStarsInputChange = e => {
    const stars = newMovie.stars.map((star, index) => {
      if (index.toString() === e.target.name) {
        return e.target.value;
      }
      return star;
    });
    setNewMovie({ ...newMovie, stars });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/api/movies/`, newMovie)
      .then(res => {
        if (
          !newMovie.title ||
          !newMovie.director ||
          !newMovie.metascore ||
          newMovie.stars.length < 3
        )
          return;
        props.setMovies(res.data);
        setNewMovie(initialFormValues);
        props.history.push('/');
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
          value={newMovie.title}
        />
        <input
          type='text'
          name='director'
          placeholder='Director'
          onChange={handleInputChange}
          value={newMovie.director}
        />
        <input
          type='text'
          name='metascore'
          placeholder='MetaScore'
          onChange={handleInputChange}
          value={newMovie.metascore}
        />
        <input
          type='text'
          name='0'
          placeholder='Star'
          onChange={handleStarsInputChange}
          value={newMovie.stars[0]}
        />
        <input
          type='text'
          name='1'
          placeholder='Star'
          onChange={handleStarsInputChange}
          value={newMovie.stars[1]}
        />
        <input
          type='text'
          name='2'
          placeholder='Star'
          onChange={handleStarsInputChange}
          value={newMovie.stars[2]}
        />
        <button>Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
