import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from 'components/hoc/Loader'; 
import PeopleList from 'components/people/PeopleList';
import Container from 'components/common/Container';
import PaginationBar from 'components/common/PaginationBar';
import { fetchPeople } from 'actions/peopleActions';
import { isEmpty, numberWithCommas } from 'helpers/helperFunctions';

const People = (props) => {
  const people = useSelector(state => state._people.people);
  const dispatch = useDispatch();
  const query = '/person/popular?';

  useEffect(() => {
    if (isEmpty(people)) {
      dispatch(fetchPeople(query));
    } 
  }, []);

  const handlePageChange = (page) => {
    if (people.page !== page) {
      dispatch(fetchPeople(query, page));
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Popular People</h1>
          <h3>{numberWithCommas(people.total_results)} People</h3>
        </div>
      </div>
      <PeopleList people={people.results} templateCount={10} />
      <PaginationBar 
          activePage={people.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={people.total_pages}
          totalPage={people.total_pages}
      />
    </Container>  
  );
};

export default Loader('people')(People);
