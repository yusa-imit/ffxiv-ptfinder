import { Group, GroupProps, Text } from '@mantine/core';

interface HorizontalGroupWithTextProps extends GroupProps {
  text?: string;
}
export function HorizontalGroupWithText({ text, children, ...etc }: HorizontalGroupWithTextProps) {
  return (
    <Group>
      {text && (
        <Text size="sm" weight={600}>
          {text}
        </Text>
      )}
      {children}
    </Group>
  );
}
