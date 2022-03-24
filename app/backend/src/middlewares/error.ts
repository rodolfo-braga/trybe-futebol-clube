import { ErrorRequestHandler } from 'express';
import getStatusCode from '../utils/getStatusCode';
import ErrorMessage from '../enums/ErrorMessage';

import StatusCode from '../enums/StatusCode';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status: number = getStatusCode(err.message) || StatusCode.INTERNAL_SERVER_ERROR;
  const message: string = err.message || ErrorMessage.INTERNAL_SERVER_ERROR;

  res.status(status).json({ message });
};

export default errorHandler;
