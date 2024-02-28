import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import axios from 'axios';

const PopupNegative = ({ closeDeletetPopup, showDeletePopup }) => {
  const navigate = useNavigate();
  const userid = localStorage.getItem('userid');

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const onChangeForm = async data => {
    try {
      const response = await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_HOST}/user/profile/${userid}/delete`,
        data: { userid: userid,
          currentPassword : data.currentPassword
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      localStorage.removeItem('userid');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('id');
      navigate('/signin');
    } catch (error) {
      setError("currentPassword",{message:"비밀번호가 일치하지 않습니다."})
    }
  };

  return (
    <form onSubmit={handleSubmit(onChangeForm)}>
      <div className=" bg-black bg-opacity-40 w-full h-full z-50 absolute top-0 left-0 ">
        <div className="w-[370px] rounded-3xl bg-white text-center p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <div className="mb-8">
            <p className="font-Heading3 text-gray-900 mb-2">계정 탈퇴하기</p>
            <p className="font-Body4  text-deepRed mb-2"> *탈퇴 시 모든 데이터가 삭제되며, 되돌릴수 없습니다.</p>
          </div>

          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            placeholder="비밀번호"
            register={register}
            rules={{
              required: '비밀번호를 입력해주세요.',
            }}
            errors={errors}
          />

          <div className="flex">
            <button
              className="w-full font-Heading3 bg-gray-200 text-gray-600 p-3.5 rounded-lg mr-4"
              onClick={() => {
                showDeletePopup(!closeDeletetPopup);
              }}>
              취소
            </button>
            <button className="w-full font-Heading3 bg-red text-white p-3.5 rounded-lg" type="submit">
              탈퇴
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default PopupNegative;
