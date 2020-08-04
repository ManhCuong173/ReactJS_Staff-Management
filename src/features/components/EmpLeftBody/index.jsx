import React from 'react';
import TitleSection from '../../../components/TitleSection';
import {List, Typography} from 'antd';
import './style.scss';

const category = ['Quản lý nhân viên'];

function EmpLeftBody () {
  return (
    <div className="emp__content--left-side">
      <div className="emp__content--inner">
        <TitleSection
          fontSize="12px"
          padding=".5rem .5rem"
          color="#FFFF"
          backgroundColor="#7dbcea"
          borderRadius="5px"
          fontWeight="bold"
        >
          Quản lý đối tác
        </TitleSection>
        <List
          className="emp__content--list"
          dataSource={category}
          renderItem={item => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default EmpLeftBody;
