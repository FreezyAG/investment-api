export const sendFailureResponse = (error) => {
  if (!error.statusCode) error.statusCode = 500;
  throw error;
};

export const sendNotFoundResponse = (message) => {
  const error = new Error(`${message}`);
  error.statusCode = 404;
  throw error;
};


export const sendSuccessResponse = (res, message, body = null) => {
  res.status(200).json({
    error: false,
    message,
    body,
  });
};
