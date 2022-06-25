import { useViewportSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { MantineBreakPoints } from '../type/MantineBreakPoints';

export default function useBreakPoints(): MantineBreakPoints {
  const [bp, setBp] = useState<MantineBreakPoints>('xs');
  const window = useViewportSize();
  useEffect(() => {
    if (window.width < 576) {
      setBp('xs');
    } else if (window.width < 768) {
      setBp('sm');
    } else if (window.width < 992) {
      setBp('md');
    } else if (window.width < 1200) {
      setBp('lg');
    } else {
      setBp('xl');
    }
  }, [window.width]);
  return bp;
}
