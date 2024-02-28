//* 보드 리스트 불러올 리액트 쿼리 api

// export const getEveryDiary = async () => {
//   return await fetch(`${process.env.REACT_APP_HOST}/diary/getEveryDiary`).then(res => res.json());
// };

export const getEveryDiaryInfinite = async ({ pageParam }) => {
  return await fetch(`${process.env.REACT_APP_HOST}/diary/getEveryDiary`).then(res => res.json());
  // return await fetch(`${process.env.REACT_APP_HOST}/diary/getEveryDiary?page=${pageParam}`).then(res => res.json());
};
