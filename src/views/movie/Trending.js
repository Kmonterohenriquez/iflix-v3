import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from 'components/hoc/Loader';
import MovieList from 'components/movies/MovieList';
import Container from 'components/common/Container';
import PaginationBar from 'components/common/PaginationBar';
import { fetchTrendingMovies } from 'actions/movieActions';
import { isEmpty, numberWithCommas } from 'helpers/helperFunctions';

const TrendingMovies = (props) => {
  const { trendingMovies, isLoading, favorites } = useSelector(state => ({
    trendingMovies: state._movies.trendingMovies,
    isLoading: state._misc.isLoading,
    favorites: state._misc.favorites
  }));
  const dispatch = useDispatch();
  const query = '/trending/all/day';

  useEffect(() => {
    if (isEmpty(trendingMovies)) {
      dispatch(fetchTrendingMovies(query));
    }
  }, []);

  const handlePageChange = (page) => {
    if (trendingMovies.page !== page && !isLoading) {
      dispatch(fetchTrendingMovies(query, page));
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Trending Movies</h1>
          <h3>{numberWithCommas(trendingMovies.total_results)} Movies</h3>
        </div>
      </div>
      <MovieList 
          movies={trendingMovies.results} 
          favorites={favorites}
          templateCount={10} 
      />
      <PaginationBar 
          activePage={trendingMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={trendingMovies.total_pages}
          totalPage={trendingMovies.total_pages}
      />
    </Container>
  );
};

export default Loader('trendingMovies')(TrendingMovies);
