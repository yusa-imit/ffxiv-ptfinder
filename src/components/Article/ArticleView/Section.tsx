import { createStyles, Paper, PaperProps, Stack, Text } from '@mantine/core';

interface SectionProps extends PaperProps {
  title?: string;
}

const style = createStyles((theme) => ({
  main: {
    padding: theme.spacing.md,
  },
  innerStack: {
    marginLeft: theme.spacing.md,
  },
  title: {
    fontWeight: 700,
    fontSize: theme.fontSizes.lg,
    color: theme.colorScheme === 'light' ? theme.colors.gray[7] : theme.colors.gray[2],
    marginLeft: -1 * theme.spacing.md,
  },
}));

export default function Section({ title, children, ...etc }: SectionProps) {
  const { classes } = style();
  return (
    <Paper className={classes.main} {...etc}>
      <Stack spacing="md">
        <Text className={classes.title}>{title}</Text>
        {children}
      </Stack>
    </Paper>
  );
}
