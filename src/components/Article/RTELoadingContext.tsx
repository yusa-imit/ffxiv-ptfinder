import { createContext, Dispatch, SetStateAction } from 'react';

export const RTELoadingContext = createContext<Dispatch<SetStateAction<boolean>> | undefined>(
  undefined
);
