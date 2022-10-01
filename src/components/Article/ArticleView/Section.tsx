import { createStyles, Paper, PaperProps, Stack, Text } from '@mantine/core';

interface SectionProps extends PaperProps {
  title?: string;
}

const style = createStyles((theme) => ({
  main: {
    padding: theme.spacing.md,
  },
  title: {
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'light' ? theme.colors.gray[7] : theme.colors.gray[2],
  },
}));

export default function Section({ title, children, ...etc }: SectionProps) {
  const { classes } = style();
  return (
    <Paper shadow="md" className={classes.main} {...etc} withBorder>
      <Stack spacing="md">
        <Text className={classes.title}>{title}</Text>
        {children}
      </Stack>
    </Paper>
  );
}
