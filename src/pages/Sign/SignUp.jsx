import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input.jsx';
import Header1 from '../../components/Header/Header1.jsx';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef();
  password.current = watch('password');

  const navigator = useNavigate();

  const emailPattern = {
    value: new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$', 'ig'),
    message: '이메일을 확인해주세요',
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
    }
  };
  return (
    <>
      <Header1 title="회원가입" />
      <form onSubmit={handleSubmit(onChangeFormLib)}>
        <Input
          id="nickname"
          name="nickname"
          type="text"
          placeholder="닉네임"
          register={register}
          rules={{ required: '닉네임을 입력해주세요.' }}
          errors={errors}
        />
        <Input
          id="userid"
          name="userid"
          type="text"
          placeholder="아이디"
          register={register}
          rules={{ required: '아이디를 입력해주세요.' }}
          errors={errors}
        />
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
