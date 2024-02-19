//* 보드 리스트 불러올 리액트 쿼리 api

const URL = ' ';

export const get = async (path: string) => {
  const response = await fetch(`${URL}/${path}`);
  return await response.json();
};
