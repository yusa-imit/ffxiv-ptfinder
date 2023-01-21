import { Group, Menu, MenuProps } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { JobSort } from '@constant/JobSort';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  Tank_Value,
  Job,
  Healer_Value,
  Melee_Value,
  Range_Value,
  Caster_Value,
  Limited_Value,
} from '../../../type/data/FFXIVInfo';
import RoleIcon from '../Icon/RoleIcon';
import JobIcon from '../Icon/JobIcon';
import { Article } from '../../../recoil/Article/index';

interface JobSelectionProps extends MenuProps {
  jobs: Job[];
  disableOpen?: boolean;
  onJobIconClick?: (job: Job) => void;
}
export default function JobSelection({
  jobs,
  disableOpen,
  onJobIconClick,
  ...etc
}: JobSelectionProps) {
  const { t } = useTranslation('data');
  //const setArticle = useSetRecoilState(Article);
  const [roles, setRoles] = useState({ t: false, d: false, h: false });
  /**
  const onJobIconClickDefault = (job: Job) => {
    setArticle((prev) => {
      const newArticle = { ...prev };
      const newPartys = [...newArticle.jobs];
      const newJobs = [...newPartys[partyNumber]];
      if (newArticle.jobs[partyNumber][index].includes(job)) {
        const jobArray: Job[] = [];
        newJobs[index].forEach((v) => {
          if (v === job) return;
          jobArray.push(v);
        });
        newJobs[index] = jobArray;
      } else {
        newJobs[index] = [...newJobs[index], job];
      }
      newPartys[partyNumber] = newJobs;
      newArticle.jobs = newPartys;
      return newArticle;
    });
  };
   */
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

  if (disableOpen) {
    return <RoleIcon roles={roles} disableClick />;
  }
  return (
    <Menu {...etc}>
      <Menu.Target>
        <RoleIcon roles={roles} />
      </Menu.Target>
      <Menu.Dropdown style={{ position: 'absolute' }}>
        <Menu.Label>{t('job_sort_TANK')}</Menu.Label>
        <Group spacing="xs" position="left" px={12}>
          {Tank_Value.map((v, i) => (
            <JobIcon
              job={v}
              key={v + i}
              isChecked={jobs.includes(v)}
              onClick={() => {
                if (onJobIconClick) onJobIconClick(v);
              }}
            />
          ))}
        </Group>
        <Menu.Divider />
        <Menu.Label>{t('job_sort_HEALER')}</Menu.Label>
        <Group spacing="xs" position="left" px={12}>
          {Healer_Value.map((v, i) => (
            <JobIcon
              job={v}
              key={v + i}
              isChecked={jobs.includes(v)}
              onClick={() => {
                if (onJobIconClick) onJobIconClick(v);
              }}
            />
          ))}
        </Group>
        <Menu.Divider />
        <Menu.Label>{t('job_sort_MELEE')}</Menu.Label>
        <Group spacing="xs" position="left" px={12}>
          {Melee_Value.map((v, i) => (
            <JobIcon
              job={v}
              key={v + i}
              isChecked={jobs.includes(v)}
              onClick={() => {
                if (onJobIconClick) onJobIconClick(v);
              }}
            />
          ))}
        </Group>
        <Menu.Divider />
        <Menu.Label>{t('job_sort_RANGE')}</Menu.Label>
        <Group spacing="xs" position="left" px={12}>
          {Range_Value.map((v, i) => (
            <JobIcon
              job={v}
              key={v + i}
              isChecked={jobs.includes(v)}
              onClick={() => {
                if (onJobIconClick) onJobIconClick(v);
              }}
            />
          ))}
        </Group>
        <Menu.Divider />
        <Menu.Label>{t('job_sort_CASTER')}</Menu.Label>
        <Group spacing="xs" position="left" px={12}>
          {Caster_Value.map((v, i) => (
            <JobIcon
              job={v}
              key={v + i}
              isChecked={jobs.includes(v)}
              onClick={() => {
                if (onJobIconClick) onJobIconClick(v);
              }}
            />
          ))}
        </Group>
        <Menu.Divider />
        <Menu.Label>{t('job_sort_LIMITED')}</Menu.Label>
        <Group spacing="xs" position="left" px={12}>
          {Limited_Value.map((v, i) => (
            <JobIcon
              job={v}
              key={v + i}
              isChecked={jobs.includes(v)}
              onClick={() => {
                if (onJobIconClick) onJobIconClick(v);
              }}
            />
          ))}
        </Group>
        <Menu.Divider />
      </Menu.Dropdown>
    </Menu>
  );
}
