import StatusCode from '../enums/StatusCode';
import ErrorMessage from '../enums/ErrorMessage';

const getStatusCode = (message: string) => {
  switch (message) {
    case ErrorMessage.INVALID_INPUT:
      return StatusCode.UNAUTHORIZED;

    case ErrorMessage.EMPTY_FIELDS:
      return StatusCode.UNAUTHORIZED;

    case ErrorMessage.CLUB_NOT_FOUND:
      return StatusCode.NOT_FOUND;

    default:
      break;
  }
};

export default getStatusCode;
