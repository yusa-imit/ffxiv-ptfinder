import { useRecoilState } from 'recoil';
import { Nav } from '.';

const useNav: () => [boolean, () => void] = () => {
  const [value, setValue] = useRecoilState(Nav);
  const toggle = () => {
    setValue(!value);
  };
  return [value, toggle];
};

export default useNav;
