export const handleErrorMessage = async (error) => {
  let message = '';
  if (error.message === 'Network Error') {
    message = error.message;
  } else {
    try {
      message = await error.response.data.message;
    } catch {
      message = 'Request Error';
    }
  }
  return message;
};

export const sortArrayByNumber = ({ array, attr, order = 'asc' }) => {
  if (order === 'asc') {
    return array.sort((a, b) => {
      if (a[attr] < b[attr]) {
        return -1;
      }
      if (a[attr] > b[attr]) {
        return 1;
      }
      return 0;
    });
  }
  if (order === 'desc') {
    return array.sort((a, b) => {
      if (a[attr] > b[attr]) {
        return -1;
      }
      if (a[attr] < b[attr]) {
        return 1;
      }
      return 0;
    });
  }
  return array;
};

export const concatString = ({ string, maxSize, appendCaracters = '...' }) => {
  const returnString = string.length > maxSize
    ? string.substring(0, maxSize - 1) + appendCaracters
    : string;

  return returnString;
};

export const sortArrayByString = ({ array, attr, order = 'asc' }) => {
  if (order === 'asc') {
    return array.sort((a, b) => {
      if (String(a[attr]).toLowerCase() < String(b[attr]).toLowerCase()) {
        return -1;
      }
      if (String(a[attr]).toLowerCase() > String(b[attr]).toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  if (order === 'desc') {
    return array.sort((a, b) => {
      if (String(a[attr]).toLowerCase() > String(b[attr]).toLowerCase()) {
        return -1;
      }
      if (String(a[attr]).toLowerCase() < String(b[attr]).toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  return array;
};
