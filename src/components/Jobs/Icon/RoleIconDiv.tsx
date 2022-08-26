import { JobSort } from '@constant/JobSort';
import { Box, BoxProps, Stack } from '@mantine/core';
import { Job } from '@type/data/FFXIVInfo';
import { useEffect, useState } from 'react';

interface RoleIconDivProps extends BoxProps {
  jobs: Job[];
  disableClick?: boolean;
}
export function RoleIconDiv({ jobs, disableClick, ...etc }: RoleIconDivProps) {
  const [roles, setRoles] = useState({ t: false, d: false, h: false });
  useEffect(() => {
    const newState = { t: false, d: false, h: false };
    jobs.forEach((job) => {
      switch (JobSort[job].role) {
        case 'TANK':
          newState.t = true;
          break;
        case 'HEALER':
          newState.h = true;
          break;
        case 'DPS':
          newState.d = true;
          break;
        case 'LIMITED':
          newState.d = true;
          break;
        default:
          break;
      }
    });
    setRoles(newState);
  }, [jobs.length]);
  const [name, setName] = useState('x');
  useEffect(() => {
    const newName = ['', '', ''];
    if (roles.t) newName[0] = 't';
    if (roles.h) newName[1] = 'h';
    if (roles.d) newName[2] = 'd';
    setName(newName.join('') === '' ? 'x' : newName.join(''));
  }, [...Object.values(roles)]);
  return (
    <Box
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
    </Box>
  );
}
