import {
  Box,
  createStyles,
  Group,
  GroupProps,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from '@mantine/core';
import { Help } from 'tabler-icons-react';

interface StackLeftGroupProps extends GroupProps {
  title?: string;
  titleHelp?: string;
}

const useStyle = createStyles((theme) => ({
  groupAsStack: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
}));

export function PhaseStack({ title, titleHelp, ...etc }: StackLeftGroupProps) {
  const { classes } = useStyle();
  return (
    <Group className={classes.groupAsStack}>
      {title && !titleHelp && (
        <>
          <Title order={3}>{title}</Title>
        </>
      )}
      {titleHelp && (
        <Tooltip
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          label={titleHelp}
          multiline
          styles={{ tooltip: { maxWidth: '80%' } }}
          events={{ hover: true, focus: true, touch: true }}
        >
          <Group style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Title order={3}>{title}</Title>

            <ThemeIcon radius={9999} size="sm">
              <Help />
            </ThemeIcon>
          </Group>
        </Tooltip>
      )}
      <Stack
        sx={(theme) => ({
          paddingLeft: theme.spacing.md,
          width: '100%',
        })}
      >
        {etc.children}
      </Stack>
    </Group>
  );
}
