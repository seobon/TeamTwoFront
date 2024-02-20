import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input.jsx';
import { useNavigate } from 'react-router-dom';
import Header1 from '../../components/Header/Header1.jsx';

const SignUp = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef();
  password.current = watch('password');

  const emailPattern = {
    value: new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$', 'ig'),
    message: '이메일을 확인해주세요.',
  };

  const passwordConfirmPattern = {
    validate: value => {
      return password === value || '비밀번호가 일치하지 않습니다';
    },
  };

  const onChangeFormLib = data => {
    console.log('회원가입 정보', data);
  };
  return (
    <>
      <Header1 title="회원가입"/>
      <form onSubmit={handleSubmit(onChangeFormLib)}>
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
