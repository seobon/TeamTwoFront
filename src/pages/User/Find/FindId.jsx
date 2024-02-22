import React from 'react';
import Input from '../../../components/Input/Input';
import { useForm } from 'react-hook-form';

const FindId = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const onChangeFormLib = data => {
    console.log('아이디 정보', data);
  };
  return (
    <>
      {' '}
      <form onSubmit={handleSubmit(onChangeFormLib)}>
        <p className="font-Heading3 text-gray-900 mb-2"> 아이디 찾기 </p>
        <p className="font-Body4 text-gray-800 mb-8"> 등록된 이메일을 입력하세요. </p>
        <Input
          id="email"
          name="email"
          type="text"
          placeholder="이메일"
          register={register}
          rules={{ required: '이메일를 입력해주세요.' }}
          errors={errors}
        />
        <p className='font-Heading4 text-gray-600 mb-2'>아이디</p>
        <p className='font-Body1  text-gray-800 mb-8'>아이디</p>
        <button className="btn-full-fill" type="submit">
          아이디 찾기
        </button>
      </form>
    </>
  );
};

export default FindId;
