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
