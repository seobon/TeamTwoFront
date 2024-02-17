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
  const feelings = ['그냥 그래요', '기뻐요', '슬퍼요', '짜증나요', '화나요'];
  const [userFeeling, setUserFeeling] = useState(null);

  const clickFeeling = feeling => {
    setUserFeeling(feeling);
  };

  return (
    <div>
      <ul className="flex justify-center gap-2 p-2 m-1 rounded-xl border-2 border-brown bg-gray-200">
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
  );
}

export default UserFeelings;
