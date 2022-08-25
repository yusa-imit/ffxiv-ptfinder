import { Text, TextProps } from '@mantine/core';

export default function WithAsterisk({ children, ...etc }: TextProps) {
  return (
    <Text {...etc}>
      {children}
      <span
        style={{
          color: '#fa5252',
          fontSize: '14px',
          fontWeight: 'bold',
          wordBreak: 'break-word',
          cursor: 'default',
          WebkitTapHighlightColor: 'transparent',
          lineHeight: 1.55,
        }}
      >
        {' *'}
      </span>
    </Text>
  );
}
