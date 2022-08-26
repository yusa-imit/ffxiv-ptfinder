import { Role } from '@type/data/FFXIVInfo';
import { Box, Image, Stack, UnstyledButton, UnstyledButtonProps } from '@mantine/core';
import { url } from 'inspector';
import { ForwardedRef, forwardRef, MouseEventHandler, useEffect, useState } from 'react';
import { JobSort } from '@constant/JobSort';

export interface RoleIconProps extends React.ComponentPropsWithoutRef<'button'> {
  roles: { t: boolean; h: boolean; d: boolean };
  disableClick?: boolean;
}

const RoleIcon = forwardRef<HTMLButtonElement, RoleIconProps>(
  ({ roles, disableClick, ...etc }: RoleIconProps, ref) => {
    const [name, setName] = useState('x');
    useEffect(() => {
      const newName = ['', '', ''];
      if (roles.t) newName[0] = 't';
      if (roles.h) newName[1] = 'h';
      if (roles.d) newName[2] = 'd';
      setName(newName.join('') === '' ? 'x' : newName.join(''));
    }, [...Object.values(roles)]);
    return (
      <UnstyledButton
        ref={ref}
        sx={(_theme) => ({
          width: 36,
          height: 36,
          borderRadius: 6,
          overflow: 'hidden',
          //backgroundColor: theme.primaryColor,
          '&:hover': {
            filter: disableClick ? '' : 'brightness(0.8)',
          },
        })}
        {...etc}
      >
        <Stack
          spacing={0}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {name.split('').map((v, i) => (
            <Box
              key={v + i}
              sx={(theme) => ({
                flex: '1 1 0px',
                backgroundColor:
                  v === 't'
                    ? theme.colors.blue[8]
                    : v === 'h'
                    ? theme.colors.green[6]
                    : v === 'd'
                    ? theme.colors.red[8]
                    : theme.colors.gray[4],
              })}
            ></Box>
          ))}
        </Stack>
      </UnstyledButton>
    );
  }
);

export default RoleIcon;
