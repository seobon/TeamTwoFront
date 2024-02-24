import React, { useState } from 'react';
import Input from '../../../components/Input/Input';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';

const FindId = () => {
  const [errorFindId, setErrorFindId] = useState('');
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const onChangeFormLib = async data => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST}/mail/findUserId`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.status == 200) {
        setErrorFindId(`이메일로 아이디가 전송되었습니다. 메일함을 확인해주세요.`);
      }
    } catch (error) {
      setErrorFindId(`이메일로 아이디를 보내드릴수가 없습니다. 이메일을 확인해주세요.`);
      console.error('아이디 에러발생발생!!!!', error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onChangeFormLib)}>
        <p className="font-Heading3 text-gray-900 mb-2"> 아이디 찾기 </p>
        <p className="font-Body4 text-gray-800 mb-8"> 등록된 아이디를 입력하세요. </p>
        <div
          onClick={() => {
            setErrorFindId(true);
          }}>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="이메일"
            register={register}
            rules={{ required: '이메일를 입력해주세요.' }}
            errors={errors}
          />
        </div>
        <p className="font-Body3 text-deepRed mb-2">{errorFindId}</p>

        <button className="btn-full-fill" type="submit">
          아이디 찾기
        </button>
      </form>
    </>
  );
};

export default FindId;
