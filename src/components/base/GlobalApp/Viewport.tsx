import { ScrollArea } from '@mantine/core';

interface ViewportProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}
export default function Viewport({ children, ...etc }: ViewportProps) {
  return (
    <main style={{ width: '100vw', height: '100vh', zIndex: 0 }} {...etc}>
      <ScrollArea style={{ width: '100%', height: '100%' }}>{children}</ScrollArea>
    </main>
  );
}
