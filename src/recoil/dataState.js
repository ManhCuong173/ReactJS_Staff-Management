import {atom} from 'recoil';

// get data from local storage
const getSampleData = () => {
  const localStorageData = JSON.parse (localStorage.getItem ('sampleData'));
  if (localStorageData) return localStorageData.default.sampleData;
  return [];
};

// initial data
export const dataState = atom ({
  key: 'dataFromLS',
  default: getSampleData (),
});

export const backUpDataState = atom ({
  key: 'filterData',
  default: [],
});

// filter data from fields
export const filterData = (fields, dataArr) => {
  const {empName, empPosition, empBranch, empStatePosition} = fields;
  console.log (dataArr);
  console.log (fields);
  return dataArr.filter (
    data =>
      data.empName.toLowerCase ().includes (empName.toLowerCase ()) &&
      data.empPosition.toLowerCase ().includes (empPosition.toLowerCase ()) &&
      data.empBranch.toLowerCase ().includes (empBranch.toLowerCase ()) &&
      data.empStatePosition === empStatePosition
  );
};

// add new data
export const addData = (field, dataArr) => {
  const newData = [...dataArr, field];
  return newData;
};

// modify existed data
export const editData = (field, dataArr) => {
  let newData = [...dataArr];
  newData.forEach ((data, index, newData) => {
    if (data.Id === field.Id) newData[index] = field;
  });
  return newData;
};

// delete data field
export const deleteData = (field, dataArr) => {
  const index = dataArr.findIndex (item => item.Id === field.Id);
  const newData = [
    ...dataArr.slice (0, index),
    ...dataArr.slice (index + 1, dataArr.length),
  ];
  return newData;
};
