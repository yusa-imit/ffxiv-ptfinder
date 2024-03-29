interface PhaseViewPortProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
export default function PhaseViewPort({ children, ...etc }: PhaseViewPortProps) {
  return (
    <div
      style={{
        minHeight: '60vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}
