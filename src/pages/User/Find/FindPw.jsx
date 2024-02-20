import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../components/Input/Input';

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
  const onChangeFormLib = data => {
    console.log('이메일 정보', data);
  };
  return (
    <form onSubmit={handleSubmit(onChangeFormLib)}>
      <Input
        id="email"
        name="email"
        type="text"
        placeholder="이메일"
        register={register}
        rules={{ required: '이메일을 입력해주세요.', pattern: emailPattern  }}
        errors={errors}
      />
      <button className="btn-full-fill" type="submit">
        비밀번호 찾기
      </button>
    </form>
  );
};

export default FindPw;
