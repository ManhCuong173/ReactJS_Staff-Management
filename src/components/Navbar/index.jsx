import React from 'react';
import './style.scss';
import {PageHeader} from 'antd';
import TitleSection from '../TitleSection';

function Navbar () {
  return (
    <TitleSection
      fontSize="20px"
      padding=".3rem 1rem"
      color="#FFF"
      backgroundColor="#7dbcea"
      borderRadius="8px"
    >
      Tổng quan
    </TitleSection>
  );
}

export default Navbar;
