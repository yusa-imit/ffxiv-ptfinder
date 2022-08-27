import { Center, Group, Loader, Text } from '@mantine/core';

export default function LoadingScreen({ view }: { view?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '40vh',
        position: 'relative',
        display: view === 'visible' ? 'none' : 'block',
        zIndex: 9999,
      }}
    >
      <Center>
        <Group>
          <Loader variant="dots" size="lg" />
          <Text>Loading...</Text>
        </Group>
      </Center>
    </div>
  );
}
