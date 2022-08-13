interface ViewportProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
export default function Viewport({ children, ...etc }: ViewportProps) {
  return <main style={{ width: '100%', height: '100%' }}>{children}</main>;
}
