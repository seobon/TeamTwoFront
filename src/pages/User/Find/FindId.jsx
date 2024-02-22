import React from 'react';
import Input from '../../../components/Input/Input';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const FindId = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const onChangeFormLib = async data => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST}/mail/findUserId`, {
        email: data.email,
      });
      console.log('이메일 정보', data);
      alert('귀하의 아이디를 발송하였습니다.');
      navigator('/signin');
    } catch (error) {
      console.error('에러발생발생!!!!', error);
    }
  };
  return (

    <>

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
