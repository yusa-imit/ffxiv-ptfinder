const error_dic = {
  // API Errors
  1000: {
    name: 'API_Transaction_Error',
    description:
      'Server-side api failed to complete transaction. Contact web master or server maintainer.',
  },
  1001: {
    name: 'API_Request_Not_Acceptable',
    description: 'API request method is not acceptables. Please see http status code 405.',
  },
  // Authentification Error
  2000: {
    name: 'User_Not_Logged_In',
    description: 'User not logged in. Please log in before use this service.',
  },
  2001: {
    name: 'User_Not_Admin',
    description: 'User is not admin. This feature needs admin-level authority.',
  },
  2002: {
    name: 'Session_Not_Verifiable',
    description:
      'Your session could not verified. Your authentification cookies may be tempered or modified by yourself or someone else. Please reset your site cookies and re-log in.',
  },
  // DB Errors
  // DOM Errors
} as const;
export { error_dic as ErrorDict };
