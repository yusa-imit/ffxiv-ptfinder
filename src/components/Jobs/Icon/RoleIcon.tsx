import { Role } from '@type/data/FFXIVInfo';
import { Image, UnstyledButton, UnstyledButtonProps } from '@mantine/core';
import { url } from 'inspector';
import { ForwardedRef, MouseEventHandler } from 'react';

export interface RoleIconProps extends UnstyledButtonProps {
  roles: Role[];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ref?: ForwardedRef<HTMLButtonElement>;
}
export default function RoleIcon({ roles, onClick, ref, ...etc }: RoleIconProps) {
  return (
    <UnstyledButton
      ref={ref}
      onClick={onClick}
      sx={(theme) => ({
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 34,
        height: 34,
        overflow: 'hidden',
        borderRadius: 6,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.fn.lighten('#5865F2', 0.05)
              : theme.fn.darken('#5865F2', 0.05),
        },
        zIndex: 1,
      })}
      {...etc}
    >
      <Image
        src="/job_icons/role-sprite.png"
        sx={(theme) => ({
          transform: 'scale(3.9) translateX(-6.2px) translateY(-22.6px)',
          zIndex: 0,
        })}
      />
      <Image
        src="/job_icons/role-sprite.png"
        sx={(theme) => ({
          position: 'absolute',
          transform: 'scale(4.2) translateX(-6.2px) translateY(20px)',
          zIndex: 0,
        })}
      ></Image>
    </UnstyledButton>
  );
}

const transform = {
  th: 'scale(4) translateX(-2px) translateY(-13px)',
  td: 'scale(4) translateX(11.5px) translateY(-22.5px)',
  dh: 'scale(4) translateX(3px) translateY(-22.5px)',
  tdh: 'scale(3.9) translateX(-6.2px) translateY(-22.6px)',
};
