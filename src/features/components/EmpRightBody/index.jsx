import React, {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import TitleSection from '../../../components/TitleSection';
import TableContent from './../TableContent/index';
import TableAction from '../TableActions';
import './style.scss';
import {dataState} from '../../../recoil/dataState';

function EmpRightBody () {
  // load data from local storage
  const loadDb = useRecoilValue (dataState);
  const [sampleData, setSampleData] = useState (loadDb);
  // get sample data from local storage
  useEffect (
    () => {
      setSampleData (loadDb);
    },
    [loadDb]
  );
  return (
    <div className="emp__content--right-side">
      <div className="emp__content--inner">
        <TitleSection
          fontSize="12px"
          padding=".5rem .5rem"
          color="#FFFF"
          backgroundColor="#7dbcea"
          borderRadius="8px"
        >
          Quản lý nhân viên
        </TitleSection>
        <TableAction
          buttonStyle={{
            backgroundColor: '#7dbcea',
            borderColor: '#7dbcea',
            borderRadius: '5px',
          }}
        />
        <TableContent data={sampleData} />
      </div>
    </div>
  );
}

export default EmpRightBody;
