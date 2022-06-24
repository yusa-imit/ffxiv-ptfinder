import { useSetRecoilState, useRecoilState } from 'recoil';
import { nav } from './Nav';

export const toggleNav = () => {
  const [value, setValue] = useRecoilState(nav);
  setValue(!value);
};
