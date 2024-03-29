// 글 작성 컴포넌트
import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Header1 from '../../components/Header/Header1';
import Toggle from '../../components/BTN/Toggle';
import { ReactComponent as Annoying } from '../../assets/Mood/Annoying.svg';
import { ReactComponent as Great } from '../../assets/Mood/Great.svg';
import { ReactComponent as Happy } from '../../assets/Mood/Happy.svg';
import { ReactComponent as Sad } from '../../assets/Mood/Sad.svg';
import { ReactComponent as Soso } from '../../assets/Mood/Soso.svg';
import { useNavigate } from 'react-router-dom';
import Location from '../../components/Diary/Location';
import Weather from '../../components/Diary/Weather';
import useCurrentLocation from '../../hooks/useGeolocation';

import { HiOutlinePencilSquare } from 'react-icons/hi2';

export default function Write() {
  const navigate = useNavigate();

  const editorRef = useRef(); // 에디터 컴포넌트에 접근하기 위한 ref 생성

  const [isPublic, setIsPublic] = useState(true); // 글 비공개 여부
  const { handleSubmit } = useForm();

  const [isOn, setIsOn] = useState(false);
  const [mood, setMood] = useState('');
  const [title, setTitle] = useState();

  // SB : 현 위치 가져오는 변수
  const { location, error } = useCurrentLocation();
  const [latlon, setLatlon] = useState(null);
  const [address, setAddress] = useState('');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getAddressFromCoordinates();
    getWeather();
  }, [location]);

  // SB : 현 위치 가져오는 함수
  const getAddressFromCoordinates = async () => {
    try {
      if (location) {
        const { latitude, longitude } = location;
        const locationApiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        const locationResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${locationApiKey}`,
        );

        setLatlon(`${latitude}/${longitude}`);
      }
    } catch (error) {
      console.error('Error fetching address: ', error);
    }
  };

  // SB : 현 위치 기반 날씨 정보 가져오기
  // Get weather information only once when Compent mounts
  const getWeather = async () => {
    if (location) {
      try {
        const weatherApiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${weatherApiKey}&units=metric`,
        );

        const region = weatherResponse.data.name;
        const temp = Math.round(weatherResponse.data.main.temp);
        const main = weatherResponse.data.weather[0].main;

        // console.log(region);
        // console.log(`${main}/${temp}`);

        setAddress(region);
        setWeather(`${main}/${temp}`);
      } catch (error) {
        console.error('Failed to fetch weather data: ', error);
      }
    }
  };

  const diaryWriteSubmit = () => {
    const contents = editorRef.current.getInstance().getMarkdown(); // getHTML(): 에디터의 내용을 HTML로 가져옴

    const id = localStorage.getItem('id'); // 로컬 스토리지에서 id 값을 가져옴

    if (latlon != null) {
      alert('현 위치를 가져옵니다.');
    } else {
      setLatlon('37.413294/127.269311');
      // alert('현위치를 가져올 수 없습니다. 기본 위치값를 가져옵니다.');
    }

    if (weather != null) {
      alert('현위치를 기준으로 날씨를 가져옵니다.');
    } else {
      setWeather('Clouds/7');
      // alert('알 수 없는 오류로 날씨를 가져올 수 없습니다.');
    }

    const data = {
      id: id,
      diaryTitle: title,
      diaryContent: contents,
      mood: mood,
      currentLocation: latlon,
      weather: weather,
      isPublic: isOn,
    };

    console.log(data);

    axios
      .post(`${process.env.REACT_APP_HOST}/diary/postDiary`, data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
        if (res.data) {
          alert('게시물이 등록되었습니다.');
          console.log('글 등록 성공: ', res.data);
        } else {
          alert('로그인이 필요한 서비스입니다.');
        }
      })
      .catch(error => {
        alert('알 수 없는 오류로 등록이 실패하였습니다.');
        console.log('글 등록 실패: ', error);
      });
    navigate('/calendar');
    window.location.reload();
  };

  //비공개 토글
  const toggleHandler = () => {
    setIsOn(!isOn);
  };

  return (
    <>
      <Header1 title="작성하기" />
      <form onSubmit={diaryWriteSubmit}>
        <div className="mt-[0px]">
          <div className="text-center">
            <p className="font-Heading4">오늘의 기분</p>
            <div
              className="flex justify-between items-center font-Body4 p-4 px-12"
              onChange={e => {
                setMood(e.target.value);
              }}>
              <label htmlFor="happy">
                <input id="happy" type="radio" name="mood" value="happy" className="hidden" />{' '}
                <Happy className={mood === 'happy' ? 'opacity-100' : 'opacity-50'} />
              </label>
              <label htmlFor="great">
                <input id="great" type="radio" name="mood" value="great" className="hidden" />{' '}
                <Great className={mood === 'great' ? 'opacity-100' : 'opacity-50'} />
              </label>
              <label htmlFor="soso">
                <input id="soso" type="radio" name="mood" value="soso" className="hidden" />{' '}
                <Soso className={mood === 'soso' ? 'opacity-100' : 'opacity-50'} />
              </label>
              <label htmlFor="sad">
                <input id="sad" type="radio" name="mood" value="sad" className="hidden" />{' '}
                <Sad className={mood === 'sad' ? 'opacity-100' : 'opacity-50'} />
              </label>
              <label htmlFor="annoying">
                <input id="annoying" type="radio" name="mood" value="annoying" className="hidden" />{' '}
                <Annoying className={mood === 'annoying' ? 'opacity-100' : 'opacity-50'} />
              </label>
            </div>
          </div>
          <div className="flex justify-between items-start mt-4 px-4">
            <div className="text-center">
              <span className="font-Caption">오늘의 날씨</span>
              <div className="">날씨 아이콘</div>
            </div>
            
            <div className="text-center inline-block mb-8">
              {isOn ? <span className="font-Caption">공개</span> : <span className="font-Caption">비공개</span>}
              <Toggle isOn={isOn} toggleHandler={toggleHandler} />
            </div>
          </div>
          <div className="openApi"></div>

          {/* 작성 버튼을 누르면, 작성이 완료되었다는 알림창을 띄우고 다른 컴포넌트로 이동시키기 */}
          <button type="submit" className="w-[60px] h-[30px] mt-1 ml-[335px] mb-[12px] text-[6px]">
            {/* 작성 버튼 */}
            <HiOutlinePencilSquare className="w-[25px] h-[25px] ml-4 mr-4 mb-[1px]" />
            <span className="text-[10px] mr-[4px]">작성</span>
          </button>

          <input
            className="w-full h-7 mb-2 p-2 bg-white rounded-lg border border-solid focus:outline-none focus:bg-white active:bg-white text-[11px]"
            placeholder="오늘 하루를 짧게 제목을 지어주세요."
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          <div className="">
            <Editor
              initialValue="오늘은 어떤 하루였나요?" // 에디터의 초기 값
              previewStyle="vertical" // 에디터와 미리보기 패널의 배치
              initialEditType="wysiwyg" // 워지웍 타입 선택
              hideModeSwitch={true} // 하단의 타입 선택 탭 숨김 (마크다운/워지웍)
              useCommandShortcut={false}
              plugins={[colorSyntax]}
              language="ko-KR"
              ref={editorRef}
              height="400px"
            />
          </div>
        </div>
      </form>
    </>
  );
}
