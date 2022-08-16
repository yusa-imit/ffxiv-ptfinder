import { Group, Menu } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import ForwaredRole from './ForwardedRole';
import JobIcon from '../JobIcon/JobIcon';
import { Tank_Value, Job } from '../../../type/data/FFXIVInfo';

export default function JobSelection() {
  const { t } = useTranslation('job_selection');
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
  return (
    <Menu trigger="hover" openDelay={100} closeDelay={400}>
      <Menu.Target>
        <ForwaredRole roles={[]} onClick={() => setOpen(true)} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t('job_tank_label')}</Menu.Label>
        <Group>
          {Tank_Value.map((v, i) => (
            <JobIcon job={v} key={i + v} />
          ))}
        </Group>
        <Menu.Divider />
        <Menu.Label>{t('job_healer_label')}</Menu.Label>
        <Menu.Divider />
        <Menu.Label>{t('job_melee_label')}</Menu.Label>
        <Menu.Divider />
        <Menu.Label>{t('job_range_label')}</Menu.Label>
        <Menu.Divider />
        <Menu.Label>{t('job_caster_label')}</Menu.Label>
        <Menu.Divider />
        <Menu.Label>{t('job_limited_label')}</Menu.Label>
        <Menu.Divider />
      </Menu.Dropdown>
    </Menu>
  );
}
