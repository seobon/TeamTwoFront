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

/*
 * 지금 이 코드는 UserFeeling 컴포넌트야.
 * tailwindcss를 이용하여 각 기분을 나타내는 Feeling 컴포넌트를 만들었어.
 * Feeling 컴포넌트가 클릭되면 클릭된 Feeling 컴포넌트만 색상이 변하도록 하고싶어.
 * 다른 Feeling 컴포넌트가 클릭되면 이전에 클릭된 컴포넌트는 원래 색상으로 돌아갔으면 좋겠어.
 * 이걸 어떻게 구현할 수 있을까?
 */

function UserFeelings(props) {
  // userFeelings 상태에 기본값으로 5가지 기분을 담아둠
  const feelings = ['그냥 그래요', '기뻐요', '슬퍼요', '짜증나요', '화나요'];
  const [userFeeling, setUserFeeling] = useState();
  const [clicked, setClicked] = useState(false);

  // 클릭 시 선택한 기분을 userFeelings 상태에 담기
  const clickFeeling = e => {
    const feeling = e.target.value;
    console.log('feeling', feeling);
    setUserFeeling(feeling);
  };

  const onClickHandler = () => {
    setClicked(!clicked);
    console.log('clicked', clicked);
    // clickFeeling();
  };

  return (
    <div className="bg-gray-200">
      <ul className="flex justify-center gap-2 p-3 rounded-xl border-2 border-brown">
        {feelings.map((feeling, index) => (
          <Feeling key={index} clickFeeling={clickFeeling} feeling={feeling} clicked={clicked} />
        ))}
      </ul>
    </div>
  );
}

export default UserFeelings;

/*
 * 여기서부터 아래에 적은 코드는 Feeling 컴포넌트야.
 */
