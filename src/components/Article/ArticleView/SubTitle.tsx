import { Text, TextProps } from '@mantine/core';

export default function SubTitle(props: TextProps) {
  return (
    <Text
      {...props}
      sx={(theme) => ({
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'light' ? theme.colors.gray[7] : theme.colors.gray[2],
      })}
    >
      {props.children}
    </Text>
  );
}
