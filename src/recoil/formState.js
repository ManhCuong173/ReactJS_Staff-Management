import {actionTypes} from '../constant/tableActions';

const {atom, selector} = require ('recoil');
const {dataForm, excludeField} = require ('../constant/formFields');

// initial form
export const initialDataForm = atom ({
  key: 'initialForm',
  default: {...dataForm},
});

// transfered form depend on action type
export const newFormState = atom ({
  key: 'newFormState',
  default: {...dataForm},
});

export const selectedRowsState = atom ({
  key: 'initialSelectedRow',
  default: [],
});

export const clonedDataForm = clonedData => {
  let newData = {...clonedData};
  for (const fieldName in newData) {
    if (newData.hasOwnProperty (fieldName)) {
      if (excludeField.indexOf (fieldName) !== -1) {
        newData[fieldName] = '';
      }
    }
  }
  return newData;
};
