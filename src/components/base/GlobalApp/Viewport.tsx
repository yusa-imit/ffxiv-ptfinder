interface ViewportProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}
export default function Viewport({ children, ...etc }: ViewportProps) {
  return (
    <main style={{ width: '100vw', height: '100vh', zIndex: 0 }} {...etc}>
      {children}
    </main>
  );
}
