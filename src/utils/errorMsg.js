const getErrMsg = (error) =>
  error?.response?.data?.message ||
  (typeof error?.response?.data === "string" ? error.response.data : null) ||
  error?.message ||
  "Something went wrong";

export default getErrMsg;