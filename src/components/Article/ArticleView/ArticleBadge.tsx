import { Badge, BadgeProps, Tooltip } from '@mantine/core';

interface ArticleBadgeProps extends BadgeProps {
  tooltip?: string;
}
export default function ArticleBadge({ children, tooltip, ...etc }: ArticleBadgeProps) {
  return (
    <Tooltip label={tooltip} disabled={tooltip === undefined}>
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
        {...etc}
      >
        {children}
      </Badge>
    </Tooltip>
  );
}
