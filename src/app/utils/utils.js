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

export const sortArray = ({ array, attr, order = 'asc' }) => {
  if (order === 'asc') {
    return array.sort((a, b) => {
      if (a[attr].toLowerCase() < b[attr].toLowerCase()) {
        return -1;
      }
      if (a[attr].toLowerCase() > b[attr].toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  if (order === 'desc') {
    return array.sort((a, b) => {
      if (a[attr].toLowerCase() > b[attr].toLowerCase()) {
        return -1;
      }
      if (a[attr].toLowerCase() < b[attr].toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  return array;
};
