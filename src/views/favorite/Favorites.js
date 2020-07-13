import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from 'components/movies/MovieList';
import Container from 'components/common/Container';

import { numberWithCommas } from 'helpers/helperFunctions';

const Favorites = (props) => {
  const favorites = useSelector(state => state._misc.favorites);

  return (
    <>
      {favorites.length >= 1 ? (
        <Container>
          <div className="movie__header">
            <div className="movie__header-title">
              <h1>My Favorite Movies</h1>
              <h3>{numberWithCommas(favorites.length)} Movies</h3>
            </div>
          </div>
          <MovieList 
              category="movie"
              favorites={favorites}
              movies={favorites}
          />
        </Container>
      ) : (
        <div className="error">
          <h1>You Don't Have Favorites</h1>
          <p>Click the heart icon on the movie card to add it to favorites</p>
        </div>
      )}
    </>
  );
};

export default Favorites;
