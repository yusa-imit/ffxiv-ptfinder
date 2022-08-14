import { createStyles, Group, GroupProps, Text, ThemeIcon, Tooltip } from '@mantine/core';
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
  },
}));

export function PhaseStack({ title, titleHelp, ...etc }: StackLeftGroupProps) {
  const { classes } = useStyle();
  return (
    <Group className={classes.groupAsStack}>
      {title && !titleHelp && (
        <Text size="md" weight={700}>
          {title}
        </Text>
      )}
      {titleHelp && (
        <Group style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text size="md" weight={700}>
            {title}
          </Text>
          <Tooltip
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            label={titleHelp}
            multiline
            styles={{ tooltip: { maxWidth: '80%' } }}
          >
            <ThemeIcon radius={9999} size="sm">
              <Help />
            </ThemeIcon>
          </Tooltip>
        </Group>
      )}
      {etc.children}
    </Group>
  );
}
