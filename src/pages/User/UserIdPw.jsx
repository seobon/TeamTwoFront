import React, {useState } from 'react';
import Header1 from '../../components/Header/Header1';
import TabsBar from '../../components/TabsBar/TabsBar';
import FindId from './Find/FindId';
import FindPw from './Find/FindPw';

const UserIdPw = () => {
  const TabData = [
    { buttonName: '아이디 찾기', content: <FindId nav="/signin"/>},
    { buttonName: '비밀번호 찾기', content: <FindPw nav="/signin"/> },
  ];
  const [activeTab, setActiveTab] = useState(0);


  return (
    <>
      <Header1 title="계정정보 찾기" />
      <TabsBar TabData={TabData} setActiveTab={setActiveTab} activeTab={activeTab} />
      {TabData[activeTab].content}
    </>
  );
};

export default UserIdPw;
