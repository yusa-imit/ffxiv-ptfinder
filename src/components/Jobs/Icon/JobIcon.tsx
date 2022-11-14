import { JobSort } from '@constant/JobSort';
import { Box, UnstyledButton, UnstyledButtonProps } from '@mantine/core';
import { Article } from '@recoil/Article';
import { Job } from '@type/data/FFXIVInfo';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { Check } from 'tabler-icons-react';

interface JobIconProps extends React.HTMLAttributes<HTMLButtonElement> {
  job: Job;
  isChecked: boolean;
  isPlusIcon?: boolean;
  disableHoverStyle?: boolean;
}
export default function JobIcon({
  job,
  isChecked,
  isPlusIcon,
  disableHoverStyle,
  ...etc
}: JobIconProps) {
  return (
    <UnstyledButton
      sx={(_theme) => ({
        width: 32,
        height: 32,
        position: 'relative',
        '&:hover': {
          filter: disableHoverStyle ? '' : 'brightness(0.8)',
        },
      })}
      {...etc}
    >
      {isPlusIcon ? (
        <div></div>
      ) : (
        isChecked && (
          <Box
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 255, 0, 0.25)',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 700,
              zIndex: 1,
              borderRadius: 8,
            }}
          >
            <Check strokeWidth={3} />
          </Box>
        )
      )}
      <Image
        src={`/job_icons/${JobSort[job].role}/${JobSort[job].d_role}/${job}.png`}
        alt={job}
        width={32}
        height={32}
      />
    </UnstyledButton>
  );
}
