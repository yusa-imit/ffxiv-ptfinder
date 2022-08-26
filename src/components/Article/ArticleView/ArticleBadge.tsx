import { Badge, BadgeProps } from '@mantine/core';

export default function ArticleBadge(props: BadgeProps) {
  return (
    <Badge
      variant="filled"
      size="xl"
      style={{
        wordBreak: 'break-word',
        lineBreak: 'auto',
        maxWidth: '100%',
        whiteSpace: 'normal',
        textOverflow: 'clip',
      }}
      {...props}
    >
      {props.children}
    </Badge>
  );
}
