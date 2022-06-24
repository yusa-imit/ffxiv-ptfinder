import { useRecoilState } from 'recoil';
import { nav } from './Nav';

const useNav: () => [boolean, () => void] = () => {
  const [value, setValue] = useRecoilState(nav);
  const toggle = () => {
    setValue(!value);
  };
  return [value, toggle];
};

export default useNav;
