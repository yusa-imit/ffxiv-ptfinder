import { Tooltip, UnstyledButton } from '@mantine/core';
import { HTMLAttributes } from 'react';
import { Minus, Plus } from 'tabler-icons-react';

interface AddDeleteIconProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string;
  type: 'add' | 'delete';
}

export default function AddDeleteIcon({ label, type, ...etc }: AddDeleteIconProps) {
  return (
    <Tooltip
      label={label}
      disabled={!label}
      styles={{ tooltip: { maxWidth: '80%' } }}
      events={{ hover: true, focus: true, touch: true }}
    >
      <UnstyledButton
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors[theme.primaryColor][6],
          color: theme.white,
          width: 36,
          height: 36,
          borderRadius: 6,
          '&:hover': {
            filter: 'brightness(0.8)',
          },
          '&:active': {
            filter: 'brightness(0.65)',
          },
        })}
        {...etc}
      >
        {type === 'add' ? <Plus size={30} strokeWidth={2} /> : <Minus size={30} strokeWidth={2} />}
      </UnstyledButton>
    </Tooltip>
  );
}
