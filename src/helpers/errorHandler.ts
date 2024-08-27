const errorHandler = (title: string, error?: any) => {
  const message = `[${title}] ${
    error.response.data ? error.response.data.message : error.message
  }`;
  alert(message);
};

export default errorHandler;
