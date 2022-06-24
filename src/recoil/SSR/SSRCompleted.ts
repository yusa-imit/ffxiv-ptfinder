import { atom, useSetRecoilState } from 'recoil';

export const SSRCompleted = atom({ key: 'SSR', default: false });
export const useSSRCompletedState = () => {
  const setSSRCompleted = useSetRecoilState(SSRCompleted);
  return () => setSSRCompleted(true);
};
