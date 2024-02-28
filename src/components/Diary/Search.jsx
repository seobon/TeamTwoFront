import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Diary from './Diary';
import Header1 from '../Header/Header1';
// import SearchList from './SearchList';

function Search() {
  const [diaryId, setDiaryId] = useState(null);
  const [searchWord, setSearchWord] = useState('');
  const [searchList, setSearchList] = useState([]);

  const diarySet = async () => {
    setDiaryId(10);
  };

  const getSearchList = async () => {
    if (searchWord === '') {
      alert('검색어를 입력해주세요.');
    } else {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOST}/diary/search?searchWord=${searchWord}`);
        // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
        console.log('Get Search List data', response.data);
        setSearchList(response.data);
        console.log('searchList', searchList);
      } catch (error) {
        console.error('Get Search List Error:', error); // search 정보 가져오기 오류 출력
      }
    }
  };

  useEffect(() => {}, [searchList]);

  useEffect(() => {
    if (diaryId != null) {
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
      <Header1 title="검색" />
      <div className="absolute flex gap-2 items-center justify-center left-[50%] translate-x-[-50%] translate-y-[-70%]">
        <input
          type="text"
          className="searchInput p-1.5 shadow-sm border-2 hover:shadow-lg rounded-lg
        "
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
        />
        <button
          onClick={() => {
            getSearchList();
          }}>
          <svg class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <div>
        <div className="h-[500px] flex flex-col gap-2 p-4 overflow-auto scrollbar-hide">
          {searchList.length < 0
            ? 'Loading...'
            : searchList?.map(diary => (
                <Link
                  to={`/diary/${diary.diaryId}`}
                  state={{
                    diaryId: diary.diaryId,
                    diaryTitle: diary.diaryTitle,
                    diaryContent: diary.diaryContent,
                    nickname: diary.nickname,
                    image: diary.image,
                    mood: diary.mood,
                  }}>
                  <Diary
                    key={diary.diaryId}
                    diaryId={diary.diaryId}
                    diaryTitle={diary.diaryTitle}
                    diaryContent={diary.diaryContent}
                    nickname={diary.nickname}
                    image={diary.image}
                    mood={diary.mood}
                  />
                </Link>
              ))}
          {/* <button ref={ref} disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>
          observer
        </button> */}
        </div>
        {/* {searchList.length > 0 ? searchList.map(List => <SearchList />) : <div>로딩</div>} */}
      </div>
    </>
  );
}

export default Search;
