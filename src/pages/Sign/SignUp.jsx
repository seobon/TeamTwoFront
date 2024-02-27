import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input.jsx';
import Header1 from '../../components/Header/Header1.jsx';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const checkBtnStyle = 'btn-full w-44 ml-4';
  const [nickName, setNickName] = useState('닉네임 중복확인');
  const [userid, setUserId] = useState('아이디 중복확인');
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const password = useRef();
  password.current = watch('password');

  const navigator = useNavigate();

  const emailPattern = {
    value: new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$', 'ig'),
    message: '이메일을 확인해주세요',
  };

  const checkNickname = async () => {
    const nickName = getValues('nickname');
    if (nickName.length === 0) {
      setError('nickname', { message: '닉네임을 입력해주세요.' });
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_HOST}/user/checknickname`, {
          nickname: nickName,
        });
        if (response.status == 200) {
          console.log('닉네임확인', nickName);
          setNickName('닉네임 사용가능');
        }
      } catch (error) {
        console.error(error);
        setError('nickname', { message: '이미 사용중인 닉네임입니다.' });
      }
    }
  };
  const checkUserId = async () => {
    const userId = getValues('userid');
    if (userId.length === 0) {
      setError('userid', { message: '아이디를 입력해주세요.' });
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_HOST}/user/checkid`, {
          userId: userId,
        });
        if (response.status == 200) {
          console.log('아이디확인', userId);
          setUserId('아이디 사용가능');
        }
      } catch (error) {
        console.error(error);
        setError('userid', { message: '이미 사용중인 아이디입니다.' });
      }
    }
  };
  const onChangeFormLib = async data => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST}/user/signup`, {
        nickname: data.nickname,
        userid: data.userid,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });
      console.log('회원가입 응답:', response.data);
      navigator('/signin');
    } catch (error) {
      setError("nickname", { message: '이미 사용중인 닉네임입니다.' });
    }
  };
  return (
    <>
      <Header1 title="회원가입" />
      <form onSubmit={handleSubmit(onChangeFormLib)}>
        <div
          className="flex justify-between"
          onChange={() => {
            setNickName('닉네임 중복확인');
            clearErrors("nickname")

          }}>
          <Input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임"
            register={register}
            rules={{ required: '닉네임을 입력해주세요.' }}
            errors={errors}
          />

          <button
            className={nickName == '닉네임 중복확인' ? checkBtnStyle : `${checkBtnStyle} opacity-50`}
            type="button"
            onClick={checkNickname}
            disabled={nickName == '닉네임 사용가능' && true}>
            {nickName}
          </button>
        </div>

        <div
          className="flex justify-between"
          onChange={() => {
            setUserId('아이디 중복확인');
            clearErrors("userid")
          }}>
          <Input
            id="userid"
            name="userid"
            type="text"
            placeholder="아이디"
            register={register}
            rules={{ required: '아이디를 입력해주세요.' }}
            errors={errors}
          />
          <button
            className={userid == '아이디 중복확인' ? checkBtnStyle : `${checkBtnStyle} opacity-50`}
            type="button"
            onClick={checkUserId}
            disabled={userid == '아이디 사용가능' && true}>
            {userid}
          </button>
        </div>

        <Input
          id="email"
          name="email"
          type="text"
          placeholder="이메일"
          register={register}
          rules={{ required: '이메일을 입력해주세요.', pattern: emailPattern }}
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
        <div className="relative">
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            register={register}
            rules={{
              required: '비밀번호를 확인해주세요.',
              validate: value => {
                return value === password.current || '비밀번호가 일치하지 않습니다.';
              },
            }}
            errors={errors}
          />
        </div>

        <button className="btn-full-fill" type="submit">
          가입하기
        </button>
      </form>
    </>
  );
};

export default SignUp;
