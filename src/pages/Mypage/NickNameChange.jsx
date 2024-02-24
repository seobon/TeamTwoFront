import React, { useEffect, useState } from 'react';
import Header1 from '../../components/Header/Header1';
import Input from '../../components/Input/Input';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NickNameChange = () => {
  const userid = localStorage.getItem('userid');
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOST}/user/profile/${userid}`);
        setUserInfo(response.data);
      } catch (error) {
        console.log('유저 데이터 찾기 싪패: ', error);
      }
    };
    fetchData();
  }, []);

  const onChangeFormLib = async data => {
    console.log(data.newNickName);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_HOST}/user/profile/${userid}`,
        {
          newNickName: data.newNickName,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } },
      );
      console.log('마이페이지 닉네임 변경:', response.data);
      navigate('/mypage');
    } catch (error) {
      console.error('마이페이지 닉네임 변경 에러:', error);
    }
  };
  return (
    <>
      <Header1 title="회원정보 수정" />
      <form onSubmit={handleSubmit(onChangeFormLib)}>
        <p className="font-Heading4 text-gray-90 p-2">닉네임</p>
        <div className="relative">
          <Input
            id="newNickName"
            name="newNickName"
            type="text"
            placeholder={userInfo? userInfo.nickname : '닉네임'}
            register={register}
            rules={{
              required: '변경하실 닉네임을 작성해주세요.',
            }}
            errors={errors}
          />
        </div>
        <button className="btn-full-fill" type="submit">
          닉네임 변경하기
        </button>
      </form>
    </>
  );
};

export default NickNameChange;
