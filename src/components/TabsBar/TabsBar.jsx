import React from 'react';
import Tab from './Tab';

const TabsBar = ({ TabData, setActiveTab, activeTab }) => {
  return (
    <div className="flex mb-8">
      {TabData.map((tap, index) => (
        <Tab
          key={index}
          index = {index}
          onClick={() => setActiveTab(index)}
          activeTab = {activeTab}
          TabData = {TabData[index].index}
          BtnText={TabData[index].buttonName}
        />
      ))}
    </div>
  );
};

export default TabsBar;
