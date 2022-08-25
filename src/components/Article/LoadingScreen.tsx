import { Loader } from '@mantine/core';

export default function LoadingScreen({ view }: { view?: string }) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        display: view === 'visible' ? 'none' : 'block',
        backgroundColor: 'red',
        zIndex: 9999,
      }}
    >
      <Loader />
    </div>
  );
}
