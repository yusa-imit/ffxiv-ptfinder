import { ThemeIcon } from '@mantine/core';
import { AlertCircle, Help } from 'tabler-icons-react';

export default function ErrorIcon() {
  return (
    <ThemeIcon radius={9999} size="sm" color="red">
      <AlertCircle />
    </ThemeIcon>
  );
}
