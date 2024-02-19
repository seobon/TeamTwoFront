import React, { useEffect, useState } from 'react';
import SearchList from './SearchList';

function Search() {
  const [searchList, setSearchList] = useState([]);

  const getSearchList = async () => {
    const response = await fetch('http://localhost:3001/search');
    setSearchList(response.data);
  };

  useEffect(() => {
    getSearchList();

    return () => {
      getSearchList();
    };
  }, [searchList]);

  return (
    <div className="">
      Search List
      {searchList.length > 0 ? searchList.map(List => <SearchList />) : <div>로딩</div>}
    </div>
  );
}

export default Search;
