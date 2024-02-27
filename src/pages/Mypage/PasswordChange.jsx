import React, { useRef, useState } from 'react';
import Header1 from '../../components/Header/Header1';
import Input from '../../components/Input/Input';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PasswordChange = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem('userid');
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setError
  } = useForm();
  const password = useRef();
  password.current = watch('newPassword');
  
  const onChangeFormLib = async data => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_HOST}/user/profile/${userid}`,
        {
          currentPassword: data.password,
          newPassword: data.newPasswordConfirm,
        },
        { headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`} }
      );
      localStorage.removeItem('userid');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('id');
      navigate('/signin');
    } catch (error) {
      setError("password", {message:"비밀번호가 일치하지 않습니다."},{ shouldFocus: true })
    }
  };
  return (
    <>
      <Header1 title="회원정보 수정" />
      <form onSubmit={handleSubmit(onChangeFormLib)}>
        <p className="font-Heading4 text-gray-90 p-2">기존 비밀번호</p>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="기존 비밀번호"
          register={register}
          rules={{
            required: '비밀번호를 입력해주세요.',
          }}
          errors={errors}
        />
        <p className="font-Heading4 text-gray-90 p-2">새로운 비밀번호</p>
        <div className="relative">
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="변경 비밀번호"
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
            id="newPasswordConfirm"
            name="newPasswordConfirm"
            type="password"
            placeholder="변경 비밀번호 확인"
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
          비밀번호 변경하기
        </button>
      </form>
    </>
  );
};

export default PasswordChange;
