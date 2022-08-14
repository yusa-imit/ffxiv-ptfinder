import { Tooltip, TooltipProps } from '@mantine/core';

export function WidthLimitedTooltip({ label, styles, children, ...etc }: TooltipProps) {
  return (
    <Tooltip label={label} multiline styles={{ tooltip: { maxWidth: '80%' }, ...styles }} {...etc}>
      {children}
    </Tooltip>
  );
}
