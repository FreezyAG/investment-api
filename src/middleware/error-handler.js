const ErrorHandler = ( error, _req, res, _next ) => {
  const status = error.statusCode || 500;
  const { message } = error;
  const { data } = error;

  if (!res.headersSent) {
    res.status(status).json({
      error: true,
      statusCode: status,
      message: status === 500 ? "Internal server error" : message,
      data,
    });
  }
};

export default ErrorHandler;
