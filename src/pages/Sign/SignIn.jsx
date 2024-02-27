import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_HOST}/user/check`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.status === 200) {
            setIsLoggedIn(true);
          }
        } catch (error) {
          navigate('/signin');
        }
      }
      if (isLoggedIn) {
        navigate('/calendar');
      }
    };

    checkLoginStatus();
  }, [isLoggedIn, navigate]);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const passwordRef = useRef(null);
  passwordRef.current = watch('password');

  const onChangeFormLib = async data => {
    setErrMsg('');
    reset();
    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST}/user/login`, {
        userid: data.userid,
        password: data.password,
      });
      if (response.status == 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userid', response.data.userid);
        localStorage.setItem('id', response.data.id);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
      setErrMsg('가입되어있지 않거나 로그인 정보를 확인할수없습니다.');
    }
  };

  const navigateSignUp = () => {
    navigate('/signup');
  };
  const navigateUserIdPW = () => {
    navigate('/useridpw');
  };
  return isLoggedIn ? (
    <>
      <div>{location.pathname === '/signin' ? navigate('/calendar') : null}</div>
    </>
  ) : (
    <div className="">
      <div className="text-center mt-5 ">
        <p className="font-Heading3 mt-2"> 계정을 만들어주세요!</p>
        <p className="font-Body4">
          실수로 앱을 삭제하거나 기기를 바꿔도
          <br /> 모든 기록이 계정에 안전하게 저장돼요.
        </p>
      </div>
      <div className='flex justify-center m-16'>
        <svg
          className="h-32 w-32 text-deepGreen"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round">
          {' '}
          <path stroke="none" d="M0 0h24v24H0z" />{' '}
          <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />{' '}
          <line x1="13" y1="8" x2="15" y2="8" /> <line x1="13" y1="12" x2="15" y2="12" />
        </svg>
      </div>
      <div className="text-center mb-4">
        <span className="font-Caption text-gray-500"> 계정을 잃어버리셨나요?</span>
        <span className="font-Caption text-gray-800" onClick={navigateUserIdPW}>
          <b> 아이디, 비밀번호 찾기</b>
          <svg className="h-3.5 w-3.5 text-gray-800 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
      <form onSubmit={handleSubmit(onChangeFormLib)} onChange={()=>{setErrMsg("")}}>
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

        <p className="font-Body2 w-full text-deepRed font-Caption">{errMsg}</p>

        <button className="btn-full-fill" type="submit">
          로그인
        </button>
      </form>
      <div className="rounded-full border border-gray-300 my-8 mx-4"></div>
      <button className="btn-full-line" type="button" onClick={navigateSignUp}>
        회원가입
      </button>
    </div>
  );
};

export default SignIn;
