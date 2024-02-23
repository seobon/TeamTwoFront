import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하는 상태

  useEffect(() => {
    // 로컬 스토리지를 확인해서 로그인 상태 설정하기.
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // 로그인 상태가 true라면, 캘린더 페이지로 이동
      alert('이미 로그인이 되어 있는 상태 입니다.');
      navigate('/calendar');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          // 토큰이 있으면 서버에 로그인 상태를 확인하는 요청을 보냄.
          const response = await axios.get(`${process.env.REACT_APP_HOST}/user/check`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.status === 200) {
            console.log('response: ', response);
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.log('로그인 상태 확인 에러!!', error);
      }
    };
    checkLoginStatus();
  }, []);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const passwordRef = useRef(null);
  passwordRef.current = watch('password');

  const onChangeFormLib = async data => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST}/user/login`, {
        userid: data.userid,
        password: data.password,
      });

      console.log('로그인 응답', response.data);

      if (response.status == 200) {
        // 로그인 성공시
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userid', response.data.userid);
        localStorage.setItem('id', response.data.id);
        setIsLoggedIn(true);
        console.log('토큰 저장 성공이요!!', response.data.accessToken, response.data.refreshToken);
      } else {
        throw new Error('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 에러!!', error);
    }
  };

  const navigateSignUp = () => {
    navigate('/signup');
  };
  const navigateUserIdPW = () => {
    navigate('/useridpw');
  };
  return isLoggedIn ? (
    <div>{location.pathname === '/signin' ? navigate('/calendar') : null}</div>
  ) : (
    // <div>
    //   <p>로그인 되었습니다.</p>
    // </div>
    <>
      <div className="text-center">
        <p className="font-Heading3"> 계정을 만들어주세요!</p>
        <p className="font-Body4">
          실수로 앱을 삭제하거나 기기를 바꿔도
          <br /> 모든 기록이 계정에 안전하게 저장돼요.
        </p>
      </div>

      <div className="text-center">
        <span className="font-Caption text-gray-500"> 계정을 잃어버리셨나요?</span>
        <span className="font-Caption text-gray-800" onClick={navigateUserIdPW}>
          <b> 아이디, 비밀번호 찾기</b>
          <svg className="h-3.5 w-3.5 text-gray-800 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
      <form onSubmit={handleSubmit(onChangeFormLib)}>
        <Input
          id="userid"
          name="userid"
          type="text"
          placeholder="아이디"
          register={register}
          rules={{ required: '아이디를 입력해주세요.' }}
          errors={errors}
        />
        <div className="relative">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            register={register}
            rules={{
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 8,
                message: '비밀번호 길이를 8자리 이상 입력해주세요',
              },
            }}
            errors={errors}
          />
        </div>

        <button className="btn-full-fill" type="submit">
          로그인
        </button>
      </form>
      <div className="rounded-full border border-gray-300 my-8 mx-4"></div>
      <button className="btn-full-line" type="button" onClick={navigateSignUp}>
        회원가입
      </button>
    </>
  );
};

export default SignIn;
