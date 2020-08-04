export const dataForm = {
  Id: '',
  empBranch: '',
  gender: '',
  phonenumber: '',
  dateIssue: '',
  address: '',
  area: '',
  note: '',
  empName: '',
  dob: '',
  empPosition: '',
  empEmail: '',
  idCard: '',
  placeIssue: '',
  subDistrict: '',
  empStatePosition: '',
};

// exclude some fields of data clone
export const excludeField = [
  'Id',
  'key',
  'empName',
  'idCard',
  'gender',
  'email',
  'phonenumber',
  'dateIssue',
  'address',
];

// form column initial
export const columns = [
  {
    title: '#',
    dataIndex: 'key',
  },
  {
    title: 'Mã nhân viên',
    dataIndex: 'Id',
  },
  {
    title: 'Tên nhân viên',
    dataIndex: 'empName',
  },
  {
    title: 'Chi nhánh',
    dataIndex: 'empBranch',
  },
  {
    title: 'Chức vụ',
    dataIndex: 'empPosition',
  },
  {
    title: 'CMND',
    dataIndex: 'idCard',
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'dob',
  },
  {
    title: 'Email',
    dataIndex: 'empEmail',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phonenumber',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'empStatePosition',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
  },
];

export const listDateFormat = ['DD/MM/YYYY', 'DD/MM/YY', 'MM/DD/YYYY'];
