import { useRecoilState } from 'recoil';
import { Nav } from '.';

export const toggleNav = () => {
  const [value, setValue] = useRecoilState(Nav);
  setValue(!value);
};
