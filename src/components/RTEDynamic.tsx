import dynamic from 'next/dynamic';
import { useContext, useEffect } from 'react';
import { RTELoadingContext } from './Article/RTELoadingContext';

export default dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => {
    const setLoading = useContext(RTELoadingContext);
    useEffect(() => {
      if (setLoading) {
        console.log('loading-start');
        setLoading(true);
        return () => {
          console.log('loading-end');
          setLoading(false);
        };
      }
      return () => {};
    }, [setLoading]);
    return null;
  },
});
