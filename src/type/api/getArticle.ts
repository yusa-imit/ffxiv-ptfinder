export interface GetArticleBodyType {
  data: {
    type: 0 | 1;
    id?: string;
    bulk?: {
      number?: number;
      page?: number;
    };
  };
}

export interface GetArticleReturnType<T> {
  message: string;
  error?: Error;
  data?: T;
}
