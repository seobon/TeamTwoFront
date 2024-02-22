//* 보드 리스트 불러올 리액트 쿼리 api
import axios from 'axios';

const URL = 'http://localhost:8080';

// export async function getEveryDiary() {
export const getEveryDiary = async () => {
  return await fetch(`${URL}/diary/getEveryDiary`).then(res => res.json());
  // return axios.get(`${URL}/diary/getEveryDiary`);
};
