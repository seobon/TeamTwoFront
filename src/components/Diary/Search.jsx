import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import SearchList from './SearchList';

function Search() {
  const [diaryId, setDiaryId] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [searchList, setSearchList] = useState([]);
  

  const diarySet = async () => {
    setDiaryId(5);
  }

  // const getSearchList = async () => {
  //   const response = await fetch('http://localhost:3001/search');
  //   setSearchList(response.data);
  // };

  const getSearchList = async () => {
    if (searchWord == "") {
      alert("검색어를 입력해주세요.")
    } else {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST}/diary/search?searchWord=${searchWord}`
        );
        // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
        console.log('Get Search List data', response.data);
      } catch (error) {
        console.error('Get Search List Error:', error); // search 정보 가져오기 오류 출력
      }
    };
  }


  useEffect(() => {
    if(diaryId != null) {
      // checkUser();
    } else {
      diarySet();
    }
  }, [diaryId]);

  // useEffect(() => {
  //   if (searchList != []) {
  //     getSearchList();

  //     return () => {
  //       getSearchList();
  //     };
  //   }
  // }, [searchList]);

  return (
    <>
      <input type="text"
        className="searchInput"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <button onClick={()=>{getSearchList()}}>검색</button>
      <div className="">
        Search List
        {/* {searchList.length > 0 ? searchList.map(List => <SearchList />) : <div>로딩</div>} */}
      </div>
    </>

  );
}

export default Search;
