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
    <form onSubmit={handleSubmit(onChangeFormLib)}>
      <Input
        id="id"
        name="id"
        type="text"
        placeholder="아이디"
        register={register}
        rules={{ required: '아이디를 입력해주세요.' }}
        errors={errors}
      />
      <button className="btn-full-fill" type="submit">
        아이디 찾기
      </button>
    </form>
  );
};

export default FindId;
