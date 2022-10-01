import { Stack, StackProps } from '@mantine/core';

export default function SubGroup({ children, ...etc }: StackProps) {
  return (
    <Stack spacing={5} {...etc}>
      {children}
    </Stack>
  );
}
