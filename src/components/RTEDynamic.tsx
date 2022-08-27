import dynamic from 'next/dynamic';
import { useContext, useEffect } from 'react';
import { RTELoadingContext } from './Article/RTELoadingContext';

export default dynamic(() => import('@mantine/rte'), {
  ssr: false,
});
