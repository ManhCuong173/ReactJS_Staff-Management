import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tabs,
  Tooltip,
  DatePicker,
  Typography,
  InputNumber,
  Button,
} from 'antd';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {actionLabels, actionTypes} from './../../../constant/tableActions';
import moment from 'moment';
import './style.scss';
import {newFormState, initialDataForm} from '../../../recoil/formState';
import {useRecoilValue, useRecoilState} from 'recoil';
import {listDateFormat} from '../../../constant/formFields';
import {dataState, addData, editData} from '../../../recoil/dataState';
import {convertDateString} from '../../../utils/convertDateString';

const {TabPane} = Tabs;
const {Item} = Form;
const {Option} = Select;
const {Text} = Typography;

const StyledModal = styled (Modal)`
.ant-modal-header {
  background-color: #7dbcea!important;
  }
  .ant-modal-title {
    color: #FFF!important;
  },
.ant-modal-close-x {
  color: #FFF!important;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-footer button {
  padding: 1rem;
  background: #7dbcea;
  outline: none;
    border: none;
    line-height: 5px;
    border-radius: 7px;
  }
  `;

const formLayout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

const validateMessage = {
  required: '${label} is required',
  types: {
    email: '${label} is invalid',
    number: '${label} is invalid!',
  },
};

const TableModalWrapper = props => {
  const {actionType, isShowModal, closeModal} = props;
  const [formState, setFormState] = useRecoilState (newFormState);
  const [form] = Form.useForm ();
  const [dataStorageState, setDataStorageState] = useRecoilState (dataState);

  useEffect (
    () => {
      form.setFieldsValue (formState);
    },
    [formState]
  );

  const onFormFinish = values => {
    let {Id, idCard, dob, dateIssue} = values;
    values.dob = convertDateString (dob);
    values.dateIssue = convertDateString (dateIssue);
    if (actionType === actionTypes.ADD || actionType === actionTypes.COPY) {
      let existingValue = dataStorageState.find (
        data => data.Id === Id || data.idCard == idCard
      );
      if (existingValue) {
        Modal.error ({
          title: 'Lỗi',
          content: 'ID or CMND is existed',
        });
        return;
      } else if (idCard.toString ().length > 9) {
        Modal.error ({
          title: 'Lỗi',
          content: 'CMND more than 9 digits',
        });
        return;
      }
      const newData = addData (values, dataStorageState);
      setDataStorageState (newData);
    } else {
      const newData = editData (values, dataStorageState);
      setDataStorageState (newData);
    }
    handleCancel ();
  };

  const handleOk = e => {
    closeModal ();
  };

  const handleCancel = e => {
    closeModal ();
  };

  const handleRenew = () => {
    form.setFieldsValue (initialDataForm);
  };

  return (
    <React.Fragment>
      <StyledModal
        destroyOnClose={true}
        title={actionLabels[actionType]}
        visible={isShowModal}
        onOk={() => handleOk ()}
        onCancel={() => handleCancel ()}
        className="action_modal"
        width="50%"
        footer={null}
      >
        <Tabs defaultActiveKey="1" type="card" color="#1a1a1a">
          <TabPane tab="Thông tin chung" key="1">
            <Form
              {...formLayout}
              form={form}
              onFinish={onFormFinish}
              name="emp__form"
              validateMessages={validateMessage}
            >
              <Row gutter={5}>
                <Col span={12}>
                  <Item
                    name="Id"
                    label="Mã nhân viên"
                    rules={[{required: true}]}
                    initialValue={formState[`Id`]}
                    labelAlign="left"
                  >
                    <Input
                      disabled={actionType === actionTypes.EDIT ? true : false}
                    />
                  </Item>
                  <Item
                    label="Chi nhánh"
                    name="empBranch"
                    labelAlign="left"
                    initialValue={
                      formState[`empBranch`] ? formState[`empBranch`] : 'HCM'
                    }
                  >
                    <Select style={{width: '100%'}}>
                      <Option value="HCM">Chi nhánh Hồ Chí Minh</Option>
                      <Option value="HN">Chi nhánh Hà Nội</Option>
                      <Option value="DN">Chi nhánh Đà Nẵng</Option>
                    </Select>
                  </Item>
                  <Item
                    label="Giới tính"
                    name="gender"
                    labelAlign="left"
                    initialValue={
                      formState[`gender`] ? formState[`gender`] : 'Nam'
                    }
                  >
                    <Select style={{width: '100%'}}>
                      <Option value="Nam">Nam</Option>
                      <Option value="Nữ">Nữ</Option>
                    </Select>
                  </Item>
                  <Item
                    label="Số điện thoại"
                    name="phonenumber"
                    rules={[{type: 'number'}]}
                    initialValue={+formState[`phonenumber`]}
                    labelAlign="left"
                  >
                    <InputNumber style={{width: '100%'}} />
                  </Item>
                  <Item
                    label="Ngày cấp"
                    name="dateIssue"
                    rules={[{required: true}]}
                    initialValue={
                      formState[`dateIssue`] &&
                        moment (formState[`dateIssue`], listDateFormat[2])
                    }
                    labelAlign="left"
                  >
                    <DatePicker
                      style={{width: '100%'}}
                      format={listDateFormat[2]}
                    />
                  </Item>
                  <Item
                    name="address"
                    label="Địa chỉ"
                    labelAlign="left"
                    initialValue={formState[`address`]}
                  >
                    <Input />
                  </Item>
                  <Item
                    label="Khu vực"
                    name="area"
                    labelAlign="left"
                    initialValue={formState[`area`] ? formState[`area`] : '1'}
                  >
                    <Select style={{width: '100%'}}>
                      <Option value="1">Khu vực 1</Option>
                      <Option value="2">Khu vực 2</Option>
                      <Option value="3">Khu vực 3</Option>
                    </Select>
                  </Item>
                  <Item
                    label="Ghi chú"
                    name="note"
                    labelAlign="left"
                    initialValue={formState[`note`] ? formState[`note`] : ''}
                  >
                    <Input.TextArea rows={2} />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    name="empName"
                    label="Tên nhân viên"
                    rules={[{required: true}]}
                    initialValue={formState[`empName`]}
                    labelAlign="left"
                  >
                    <Input />
                  </Item>
                  <Item
                    label="Ngày sinh"
                    name="dob"
                    labelAlign="left"
                    initialValue={
                      formState[`dob`] &&
                        moment (formState[`dob`], listDateFormat[2])
                    }
                  >
                    <DatePicker
                      style={{width: '100%'}}
                      format={listDateFormat[2]}
                    />
                  </Item>
                  <Item
                    label="Chức vụ"
                    name="empPosition"
                    labelAlign="left"
                    initialValue={
                      formState[`empPosition`]
                        ? formState[`empPosition`]
                        : 'Thu ngân'
                    }
                  >
                    <Select style={{width: '100%'}}>
                      <Option value="Thu ngân">Nhân viên thu ngân</Option>
                      <Option value="Thư ký">Nhân viên thư ký</Option>
                      <Option value="Kế toán">Nhân viên kế toán</Option>
                    </Select>
                  </Item>
                  <Item
                    name="empEmail"
                    label="Email"
                    rules={[{type: 'email'}]}
                    labelAlign="left"
                    initialValue={
                      formState[`empEmail`] ? formState[`empEmail`] : ''
                    }
                  >
                    <Input type="email" />
                  </Item>
                  <Item
                    label="CMND"
                    name="idCard"
                    rules={[{required: true}, {type: 'number', min: 9}]}
                    labelAlign="left"
                    initialValue={+formState[`idCard`]}
                  >
                    <InputNumber style={{width: '100%'}} />
                  </Item>
                  <Item
                    name="placeIssue"
                    label="Nơi cấp"
                    rules={[{required: true}]}
                    labelAlign="left"
                    initialValue={
                      formState[`placeIssue`] ? formState[`placeIssue`] : ''
                    }
                  >
                    <Input />
                  </Item>
                  <Item
                    label="Phường xã"
                    name="subDistrict"
                    labelAlign="left"
                    initialValue={
                      formState[`subDistrict`]
                        ? formState[`subDistrict`]
                        : 'sd1'
                    }
                  >
                    <Select style={{width: '100%'}}>
                      <Option value="sd1">Phường 1</Option>
                      <Option value="sd2">Phường 2</Option>
                      <Option value="sd3">Phường 3</Option>
                    </Select>
                  </Item>
                  <Item
                    label="Trạng thái"
                    name="empStatePosition"
                    labelAlign="left"
                    initialValue={
                      formState[`empStatePosition`]
                        ? formState[`empStatePosition`]
                        : 'Toàn thời gian'
                    }
                  >
                    <Select style={{width: '100%'}}>
                      <Option value="Thời vụ">Nhân viên thời vụ</Option>
                      <Option value="Toàn thời gian">
                        Nhân viên toàn thời gian
                      </Option>
                    </Select>
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} className="modal-footer">
                  <Button
                    type="primary"
                    color="primary"
                    style={{margin: '0 5px'}}
                    htmlType="submit"
                  >
                    Lưu
                  </Button>
                  <Button
                    type="primary"
                    color="primary"
                    style={{margin: '0 5px'}}
                    htmlType="reset"
                    onClick={() => handleRenew ()}
                  >
                    Làm mới
                  </Button>
                  <Button
                    type="primary"
                    color="primary"
                    style={{margin: '0 5px'}}
                    onClick={() => handleCancel ()}
                  >
                    Đóng
                  </Button>
                </Col>
              </Row>
            </Form>
          </TabPane>
        </Tabs>
      </StyledModal>
    </React.Fragment>
  );
};

const TableModal = React.memo (TableModalWrapper);

export default TableModal;
