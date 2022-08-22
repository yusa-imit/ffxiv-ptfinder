import { Group, GroupProps, Text, Title } from '@mantine/core';

interface HorizontalGroupWithTextProps extends GroupProps {
  text?: string;
}
export function HorizontalGroupWithText({ text, children, ...etc }: HorizontalGroupWithTextProps) {
  return (
    <Group
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'row',
        [theme.fn.smallerThan('sm')]: {
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 5,
        },
      })}
    >
      {text && (
        <>
          <Title order={6}>{text}</Title>
        </>
      )}
      {children}
    </Group>
  );
}
