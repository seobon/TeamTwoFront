import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../components/Input/Input';
import axios from 'axios';

const FindPw = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const emailPattern = {
    value: new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$', 'ig'),
    message: '이메일 형식을 확인해주세요.',
  };
  const onChangeFormLib = async data => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST}/mail/resetPassword`, {
        email: data.email,
      });
      console.log('이메일 정보', data);
      alert('임시 비밀번호 발성하였습니다.');
      navigator('/signin');
    } catch (error) {
      console.error('에러발생발생!!!!', error);
    }
  };
  return (
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
      <button className="btn-full-fill" type="submit">
        비밀번호 찾기
      </button>
    </form>
  );
};

export default FindPw;
