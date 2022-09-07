import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
import { ForwardedRef, HTMLAttributes } from 'react';

export interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  icon?: React.ReactNode;
  ref?: ForwardedRef<HTMLButtonElement>;
}

export default function UserButton({ image, name, icon, ref, ...others }: UserButtonProps) {
  return (
    <UnstyledButton
      ref={ref}
      {...others}
      sx={(theme) => ({
        width: '100%',
        padding: 6,
        borderRadius: 20,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <Avatar src={image} radius="xl" size={36} />

        <div style={{ flex: 1 }}>
          <Text size="md" weight={600}>
            {name}
          </Text>
        </div>

        {icon || <IconChevronRight size={14} stroke={1.5} />}
      </Group>
    </UnstyledButton>
  );
}
