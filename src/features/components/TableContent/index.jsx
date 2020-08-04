import {Table} from 'antd';
import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {columns} from '../../../constant/formFields';
import {initialDataForm, selectedRowsState} from './../../../recoil/formState';
import './style.scss';

function TableContent (props) {
  // data from local storage
  const {data} = props;
  let dataSource = [];

  // render data to UI
  const renderData = () => {
    if (data.length > 0) {
      dataSource = data.map ((item, index) => {
        let dataReturn = {...item, key: ++index};
        return dataReturn;
      });
    }
    return dataSource;
  };

  // selected row initial
  const setSelectedRows = useSetRecoilState (selectedRowsState);
  const initialDataFormLC = useRecoilValue (initialDataForm);

  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log (
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   'selectedRows: ',
      //   selectedRows
      // );
      setSelectedRows (selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log (record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log (selected, selectedRows, changeRows);
    },
  };

  return (
    <div className="">
      <Table
        columns={columns}
        rowSelection={{...rowSelection}}
        dataSource={renderData ()}
        pagination={{defaultPageSize: 10, showSizeChanger: true}}
        bordered
      />
    </div>
  );
}

export default TableContent;
