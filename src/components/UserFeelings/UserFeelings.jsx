import React, { useState } from 'react';
import Feeling from './Feeling';

/*
 * 1. '괜찮아요', '좋아요', '슬퍼요', '화나요' 4가지 기분 중 하나 클릭
 * 2. '맑음', '흐림', '비', '눈' 4가지 날씨 중 하나 클릭
 * 3. 선택한 기분과 날씨 2가지 정보를 userFeelings 상태에 담기
 * 4. 서버에 전송할 데이터에 userFeelings 정보 추가
 *   - userFeelings: ['괜찮아요', '맑음']
 * toastUi 정보
 */

function UserFeelings(props) {
  //TODO: 선택된 기분을 props로 받아온 setData 함수에 담아서 서버에 data 전송할 수 있도록 수정
  const feelings = ['calm', 'happy', 'sad', 'annoyed'];
  const [userFeeling, setUserFeeling] = useState(null);

  const clickFeeling = feeling => {
    setUserFeeling(feeling);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1 p-1 m-1 rounded-xl border-2 border-brown bg-gray-200">
        <p>오늘 기분은 어때요?</p>
        <ul className="flex gap-2">
          {feelings.map((feeling, index) => (
            <Feeling
              key={index}
              feeling={feeling}
              isSelected={feeling === userFeeling}
              onClick={() => clickFeeling(feeling)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default UserFeelings;
