import { JobSort } from '@constant/JobSort';
import { UnstyledButton, UnstyledButtonProps } from '@mantine/core';
import { Job } from '@type/data/FFXIVInfo';
import Image from 'next/image';

interface JobIconProps extends UnstyledButtonProps {
  job: Job;
}
export default function JobIcon({ job, ...etc }: JobIconProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.fn.lighten('#5865F2', 0.05)
              : theme.fn.darken('#5865F2', 0.05),
        },
      })}
      {...etc}
    >
      <Image src={`/JobIcon/${JobSort[job].role}/${JobSort[job].d_role}/${job}.png`} />
    </UnstyledButton>
  );
}
