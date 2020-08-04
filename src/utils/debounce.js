// bounce input changes for optimizing
export const debounce = (fn, timeout) => {
  // local variable
  let timeOut;

  return function (event) {
    if (timeOut) clearTimeout (timeOut);
    else {
      timeOut = setTimeout (fn.apply ({...event}, arguments), timeout);
    }
  };
};
