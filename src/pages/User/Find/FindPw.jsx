import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../components/Input/Input';
import axios from 'axios';

const FindPw = () => {
  const [errorFindPw, setErrorFindPw] = useState('');

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
      const response = await axios.post(`${process.env.REACT_APP_HOST}/mail/resetPassword`, data, {
        headers: [
          { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
          { 'Content-Type': 'application/json' },
        ],
      });
      console.log(response);
      if (response.status == 200) {
        setErrorFindPw("이메일로 임시비밀번호가 전송되었습니다. 메일함을 확인해주세요.");
      }
    } catch (error) {
      setErrorFindPw("이메일로 임시비밀번호가 전송할수없습니다. 이메일을 확인해주세요.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onChangeFormLib)}>
      <p className="font-Heading3 text-gray-900 mb-2"> 비밀번호 찾기 </p>
      <p className="font-Body4 text-gray-800 mb-8"> 등록된 이메일을 입력하세요. </p>
      <Input
        id="email"
        name="email"
        type="text"
        placeholder="이메일"
        register={register}
        rules={{ required: '이메일을 입력해주세요.', pattern: emailPattern }}
        errors={errors}
      />
      <p className="font-Body3 text-deepRed mb-2">{errorFindPw}</p>

      <button className="btn-full-fill" type="submit">
        비밀번호 찾기
      </button>
    </form>
  );
};

export default FindPw;
