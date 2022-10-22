export interface GetArticleBodyType {
  data: {
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
