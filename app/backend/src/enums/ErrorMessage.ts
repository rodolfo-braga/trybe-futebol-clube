enum ErrorMessage {
  INVALID_INPUT = 'Incorrect email or password',
  EMPTY_FIELDS = 'All fields must be filled',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  TOKEN_NOT_FOUND = 'Token not found',
  INVALID_TOKEN = 'Expired or invalid token',
  EQUAL_TEAMS = 'It is not possible to create a match with two equal teams',
  TEAM_NOT_FOUND = 'There is no team with such id!',
}

export default ErrorMessage;
