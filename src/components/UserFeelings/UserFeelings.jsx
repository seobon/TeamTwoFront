import React, { useState } from 'react';

/*
 * 1. '괜찮아요', '좋아요', '슬퍼요', '화나요' 4가지 기분 중 하나 클릭
 * 2. '맑음', '흐림', '비', '눈' 4가지 날씨 중 하나 클릭
 * 3. 선택한 기분과 날씨 2가지 정보를 userFeelings 상태에 담기
 * 4. 서버에 전송할 데이터에 userFeelings 정보 추가
 *   - userFeelings: ['괜찮아요', '맑음']
 * toastUi 정보
 */

function UserFeelings(props) {
  const [userFeelings, setUserFeelings] = useState(['괜찮아요', '맑음']);
  const click = e => {
    const feeling = e.target.value;
    setUserFeelings([feeling]);
  };

  return (
    <div className='bg-gray-200'>
      <div className='flex justify-center gap-2 p-3 rounded-xl border-2 border-brown'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='w-10 h-10 bg-gray-500 rounded-3xl cursor-pointer'
          ></div>
        ))}
      </div>
    </div>
  );
}

export default UserFeelings;
