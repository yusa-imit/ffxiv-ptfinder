export interface GetArticleQueryType {
  id?: string;
  page?: string;
  number?: string;
  s?: string;
}

export interface GetArticleReturnType<T> {
  message: string;
  error?: Error;
  data?: T;
}
