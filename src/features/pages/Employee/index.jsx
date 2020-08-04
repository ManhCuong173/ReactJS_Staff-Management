import {Col, Layout, Row, Menu} from 'antd';
import React from 'react';
import EmpLeftBody from '../../components/EmpLeftBody';
import EmpRightBody from '../../components/EmpRightBody';
import Navbar from '../../../components/Navbar';
import './style.scss';
const {Header, Content} = Layout;
function Employee () {
  return (
    <Layout className="emp__wrapper layout">
      <Header className="emp__header">
        <Menu>
          <Navbar />
        </Menu>
      </Header>
      <Content className="emp__body">
        <Row className="emp__body--layout">
          <Col flex={1}>
            <EmpLeftBody />
          </Col>
          <Col flex={2}>
            <EmpRightBody />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
export default Employee;
