import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  startNavigationProgress,
  resetNavigationProgress,
  NavigationProgress,
} from '@mantine/nprogress';

export function RouterTransition() {
  const router = useRouter();
  useEffect(() => {
    console.log('router event!!!!!!!!!!!!!!!!!!!');
    const handleStart = (url: string) => url !== router.asPath && startNavigationProgress();
    const handleComplete = () => resetNavigationProgress();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      console.log('router off!!!!!!!!!!!!!!!!!!!');
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.asPath]);

  return <NavigationProgress zIndex={9999} size={50} />;
}
