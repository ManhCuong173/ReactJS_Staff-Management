import {Button, Col, Form, Input, Modal, Row, Select} from 'antd';
import React, {useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
  dataState,
  filterData,
  recoverData,
  deleteData,
} from '../../../recoil/dataState';
import {
  selectedRowsState,
  clonedDataForm,
  initialDataForm,
  newFormState,
} from '../../../recoil/formState';
import {backUpDataState} from '../../../recoil/dataState';
import {actionTypes} from './../../../constant/tableActions';
import TableModal from './../TableModal/index';
import './style.scss';

// antd components
const {Item} = Form;
const {Option} = Select;

const validateMessages = {
  required: '${label} được yêu cầu điền đầy đủ',
};

function TableAction (props) {
  const [sampleDataState, setSampleDataState] = useRecoilState (dataState);
  const initialForm = useRecoilValue (initialDataForm);
  const setNewFormStateValue = useSetRecoilState (newFormState);
  //action type
  const [actionTypeState, setActionTypeState] = useState (actionTypes.ADD);
  const [backUpData, setBackUpData] = useRecoilState (backUpDataState);
  const [searchLabel, setSearchLabel] = useState ('Tìm kiếm');
  // show modal state
  const [visible, setVisible] = useState (false);
  //selected rows
  const selectedRowsValue = useRecoilValue (selectedRowsState);
  // set form action state
  const closeModal = () => {
    setVisible (!visible);
  };

  const showModal = actionType => {
    if (actionType === actionTypes.EDIT || actionType === actionTypes.COPY) {
      if (selectedRowsValue.length !== 1) {
        Modal.error ({
          title: 'Lỗi',
          content: 'Bạn cần lựa chọn 1 dòng dữ liệu',
        });
        return;
      }
    }
    if (actionType === actionTypes.ADD) setNewFormStateValue (initialForm);
    else if (actionType === actionTypes.EDIT) {
      setNewFormStateValue (selectedRowsValue[0]);
    } else {
      const newData = clonedDataForm (selectedRowsValue[0]);
      setNewFormStateValue (newData);
    }

    setActionTypeState (actionType);
    setVisible (!visible);
  };

  const handleSubmit = values => {
    let filteredData = [];

    if (searchLabel == 'Tìm kiếm') {
      let isAllowSearch = true;
      for (let searchField in values) {
        if (!searchField) {
          isAllowSearch = false;
        }
      }
      if (!isAllowSearch) return;
      filteredData = filterData (values, sampleDataState);
      setSearchLabel ('Phục hồi dữ liệu gốc');
      setBackUpData (sampleDataState);
      setSampleDataState (filteredData);
      return;
    }

    setSampleDataState (backUpData);
    setSearchLabel ('Tìm kiếm');
  };

  const deleteDataAction = () => {
    if (selectedRowsValue.length !== 1) {
      Modal.error ({
        title: 'Lỗi',
        content: 'Bạn có thể lựa chọn một hoặc nhiều dòng dữ liệu để xoá',
      });
      return;
    }
    const newData = deleteData (selectedRowsValue[0], sampleDataState);
    setSampleDataState (newData);
  };

  return (
    <div className="action__wrapper">
      <div className="modal">
        <TableModal
          actionType={actionTypeState}
          isShowModal={visible}
          closeModal={closeModal}
        />
      </div>
      <Form
        name="search"
        initialValues={{remember: true}}
        className="search__form"
        validateMessages={validateMessages}
        onFinish={handleSubmit}
      >
        <div className="search__wrapper">
          <Row gutter={5}>
            <Col span={6}>
              <Item name="empName" label="Nhân viên" rules={[{required: true}]}>
                <Input
                  name="empName"
                  disabled={
                    searchLabel == 'Phục hồi dữ liệu gốc' ? true : false
                  }
                />
              </Item>
              <Item
                name="empPosition"
                label="Chức vụ"
                rules={[{required: true}]}
              >
                <Input
                  name="empPosition"
                  disabled={
                    searchLabel == 'Phục hồi dữ liệu gốc' ? true : false
                  }
                />
              </Item>
            </Col>
            <Col span={6}>
              <Item
                name="empBranch"
                label="Chi nhánh"
                rules={[{required: true}]}
              >
                <Input
                  name="empBranch"
                  disabled={
                    searchLabel == 'Phục hồi dữ liệu gốc' ? true : false
                  }
                />
              </Item>
              <Item
                label="Trạng thái"
                name="empStatePosition"
                initialValue="Toàn thời gian"
              >
                <Select size="large" style={{width: '100%'}}>
                  <Option value="Toàn thời gian">
                    Nhân viên toàn thời gian
                  </Option>
                  <Option value="Thời vụ">Nhân viên thời vụ</Option>
                </Select>
              </Item>
            </Col>
          </Row>
        </div>
        <div className="action__buttons">
          <Button
            htmlType="submit"
            shape="round"
            type="primary"
            size="middle"
            style={props.buttonStyle}
          >
            {searchLabel}
          </Button>
          <Button
            shape="round"
            type="primary"
            size="middle"
            style={props.buttonStyle}
            onClick={() => showModal (actionTypes.ADD)}
          >
            Thêm
          </Button>
          <Button
            shape="round"
            type="primary"
            size="middle"
            style={props.buttonStyle}
            onClick={() => showModal (actionTypes.COPY)}
          >
            Sao chép
          </Button>
          <Button
            shape="round"
            type="primary"
            size="middle"
            style={props.buttonStyle}
            onClick={() => showModal (actionTypes.EDIT)}
          >
            Chỉnh sửa
          </Button>
          <Button
            shape="round"
            type="primary"
            size="middle"
            style={props.buttonStyle}
            onClick={() => deleteDataAction ()}
          >
            Xoá
          </Button>
          <Button
            shape="round"
            type="primary"
            size="middle"
            style={props.buttonStyle}
          >
            Xuất File
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default React.memo (TableAction);
