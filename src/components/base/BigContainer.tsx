import { Container, ContainerProps } from '@mantine/core';

export default function BigContainer({ children, size = 'xl', ...etc }: ContainerProps) {
  return (
    <Container size={size} {...etc}>
      {children}
    </Container>
  );
}
