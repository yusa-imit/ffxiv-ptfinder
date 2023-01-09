const error_dic: { [key: number]: { name: string; description: string; code: number } } = {
  // API Errors
  1000: {
    name: 'API_Transaction_Error',
    code: 1000,
    description:
      'Server-side api failed to complete transaction. Contact web master or server maintainer.',
  },
  1001: {
    name: 'API_Request_Not_Acceptable',
    code: 1001,
    description: 'API request method is not acceptables. Please see http status code 405.',
  },
  1002: {
    name: 'API_Parameter_Empty',
    code: 1002,
    description: 'Cannot get api content with empty query parameters.',
  },
  1003: {
    name: 'String_Was_Empty',
    code: 1003,
    description:
      'Server got error with parameter in title which was considered as an empty string. Please use another title string',
  },
  1004: {
    name: 'Not_Allowed_Methods',
    code: 1004,
    description:
      'Your request method is not allowed in this api route. Please see the header in Allow.',
  },
  1005: {
    name: 'Return_Value_Empty',
    code: 1005,
    description: 'Server accepted api but result was empty. Consider check route, parameters',
  },
  // Authentification Error
  2000: {
    name: 'User_Not_Logged_In',
    code: 2000,
    description: 'User not logged in. Please log in before use this service.',
  },
  2001: {
    name: 'User_Not_Admin',
    code: 2001,
    description: 'User is not admin. This feature needs admin-level authority.',
  },
  2002: {
    name: 'Session_Not_Verifiable',
    code: 2002,
    description:
      'Your session could not be verified. Your authentification cookies may be tempered or modified by yourself or someone else. Please reset your site cookies and re-log in.',
  },
  // DB Errors
  // DOM Errors
} as const;
export { error_dic as ErrorDict };
